// ADFGVX (WWI German Army field cipher) combines a Polybius-style
// fractionation over a 36-symbol grid (A-Z + 0-9) addressed by the six
// letters A, D, F, G, V, X, with a columnar transposition on top.
const LABELS = ["A", "D", "F", "G", "V", "X"];
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const GRID_SIZE = 6;

export const DEFAULT_ADFGVX_GRID_KEY = "";
export const DEFAULT_ADFGVX_TRANSPOSITION_KEY = "GERMAN";
export const MAX_ADFGVX_KEY_LENGTH = 50;

export function sanitizeAdfgvxGridKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

export function sanitizeAdfgvxTranspositionKey(key: string): string {
  return key.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function buildGrid(gridKey: string): string[] {
  const seen = new Set<string>();
  const grid: string[] = [];
  for (const char of sanitizeAdfgvxGridKey(gridKey) + SYMBOLS) {
    if (!seen.has(char)) {
      seen.add(char);
      grid.push(char);
    }
  }
  return grid;
}

// Step 1: substitute each letter/digit with its ADFGVX row+column label pair.
function substitute(text: string, gridKey: string): string {
  const grid = buildGrid(gridKey);
  return text
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .split("")
    .map((char) => {
      const index = grid.indexOf(char);
      return LABELS[Math.floor(index / GRID_SIZE)] + LABELS[index % GRID_SIZE];
    })
    .join("");
}

function unsubstitute(fractionated: string, gridKey: string): string {
  const grid = buildGrid(gridKey);
  let result = "";
  for (let i = 0; i + 1 < fractionated.length; i += 2) {
    const row = LABELS.indexOf(fractionated[i]);
    const col = LABELS.indexOf(fractionated[i + 1]);
    result += grid[row * GRID_SIZE + col];
  }
  return result;
}

// Columns are read/written in alphabetical order of the transposition
// keyword's letters; ties (repeated letters) keep their original left-to-
// right order.
function columnOrder(key: string): number[] {
  return key
    .split("")
    .map((char, index) => ({ char, index }))
    .sort((a, b) => (a.char === b.char ? a.index - b.index : a.char < b.char ? -1 : 1))
    .map((entry) => entry.index);
}

// Irregular columnar transposition: no padding filler is added. Columns
// before the text length's remainder get one extra row, so decrypting has
// to reconstruct that same uneven column split from the ciphertext length.
function transposeEncrypt(text: string, transpositionKey: string): string {
  const key = sanitizeAdfgvxTranspositionKey(transpositionKey);
  const columns = key.length;
  if (!columns) return text;

  const rows = Math.ceil(text.length / columns);
  const longColumns = text.length % columns === 0 ? columns : text.length % columns;
  const order = columnOrder(key);

  let result = "";
  for (const columnIndex of order) {
    const columnLength = columnIndex < longColumns ? rows : rows - 1;
    for (let row = 0; row < columnLength; row++) {
      result += text[row * columns + columnIndex];
    }
  }
  return result;
}

function transposeDecrypt(cipher: string, transpositionKey: string): string {
  const key = sanitizeAdfgvxTranspositionKey(transpositionKey);
  const columns = key.length;
  if (!columns) return cipher;

  const rows = Math.ceil(cipher.length / columns);
  const longColumns = cipher.length % columns === 0 ? columns : cipher.length % columns;
  const order = columnOrder(key);
  const columnLengths = Array.from({ length: columns }, (_, i) => (i < longColumns ? rows : rows - 1));

  const columnLetters: string[][] = new Array(columns);
  let cursor = 0;
  for (const columnIndex of order) {
    const length = columnLengths[columnIndex];
    columnLetters[columnIndex] = cipher.slice(cursor, cursor + length).split("");
    cursor += length;
  }

  let result = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const char = columnLetters[col][row];
      if (char !== undefined) result += char;
    }
  }
  return result;
}

export function encryptAdfgvx(text: string, gridKey: string, transpositionKey: string): string {
  return transposeEncrypt(substitute(text, gridKey), transpositionKey);
}

export function decryptAdfgvx(text: string, gridKey: string, transpositionKey: string): string {
  return unsubstitute(transposeDecrypt(text, transpositionKey), gridKey);
}
