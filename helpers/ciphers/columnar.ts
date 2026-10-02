export const DEFAULT_COLUMNAR_KEY = "CIPHER";
export const MAX_COLUMNAR_KEY_LENGTH = 50;

// The transposition keyword only needs letters to derive a column order, so
// non-letter characters are stripped before use.
export function sanitizeColumnarKey(key: string): string {
  return key.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

// Columns are read/written in alphabetical order of the keyword's letters;
// ties (repeated letters) keep their original left-to-right order.
function columnOrder(key: string): number[] {
  return key
    .split("")
    .map((char, index) => ({ char, index }))
    .sort((a, b) => (a.char === b.char ? a.index - b.index : a.char < b.char ? -1 : 1))
    .map((entry) => entry.index);
}

// Irregular columnar transposition: the text is written row by row under the
// keyword's columns, then read out column by column in alphabetical order.
// No padding filler is added, so every character (including spaces and
// casing) survives a round trip unchanged; the first `text.length % columns`
// columns simply carry one extra row.
export function encryptColumnar(text: string, key: string): string {
  const cleanKey = sanitizeColumnarKey(key);
  const columns = cleanKey.length;
  if (!columns || !text.length) return text;

  const rows = Math.ceil(text.length / columns);
  const longColumns = text.length % columns === 0 ? columns : text.length % columns;
  const order = columnOrder(cleanKey);

  let result = "";
  for (const columnIndex of order) {
    const columnLength = columnIndex < longColumns ? rows : rows - 1;
    for (let row = 0; row < columnLength; row++) {
      result += text[row * columns + columnIndex];
    }
  }
  return result;
}

export function decryptColumnar(text: string, key: string): string {
  const cleanKey = sanitizeColumnarKey(key);
  const columns = cleanKey.length;
  if (!columns || !text.length) return text;

  const rows = Math.ceil(text.length / columns);
  const longColumns = text.length % columns === 0 ? columns : text.length % columns;
  const order = columnOrder(cleanKey);
  const columnLengths = Array.from({ length: columns }, (_, i) => (i < longColumns ? rows : rows - 1));

  const columnChars: string[][] = new Array(columns);
  let cursor = 0;
  for (const columnIndex of order) {
    const length = columnLengths[columnIndex];
    columnChars[columnIndex] = text.slice(cursor, cursor + length).split("");
    cursor += length;
  }

  let result = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const char = columnChars[col][row];
      if (char !== undefined) result += char;
    }
  }
  return result;
}
