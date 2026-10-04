// Playfair's grid traditionally merges I/J into a single cell so the
// alphabet fits a 5x5 square.
const ALPHABET_NO_J = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const GRID_SIZE = 5;
const FILLER = "X";

export const DEFAULT_PLAYFAIR_KEY = "PLAYFAIR";
export const MAX_PLAYFAIR_KEY_LENGTH = 50;

export function sanitizePlayfairKey(key: string): string {
  return key
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .replace(/J/g, "I");
}

function buildKeySquare(key: string): string[] {
  const seen = new Set<string>();
  const square: string[] = [];
  for (const char of sanitizePlayfairKey(key) + ALPHABET_NO_J) {
    if (!seen.has(char)) {
      seen.add(char);
      square.push(char);
    }
  }
  return square;
}

function locate(square: string[], char: string) {
  const index = square.indexOf(char);
  return { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
}

// Playfair only defines a mapping for letter pairs: text is reduced to
// A-Z (J folded into I), split into digraphs, and a repeated letter or a
// trailing odd letter is padded with an X. This means decrypting never
// restores the original spacing, casing, punctuation, or X padding.
function toDigraphs(text: string): string[] {
  const letters = sanitizePlayfairKey(text).split("");
  const pairs: string[] = [];
  let i = 0;
  while (i < letters.length) {
    const a = letters[i];
    const b = letters[i + 1];
    if (!b) {
      pairs.push(a + FILLER);
      i += 1;
    } else if (a === b) {
      pairs.push(a + FILLER);
      i += 1;
    } else {
      pairs.push(a + b);
      i += 2;
    }
  }
  return pairs;
}

// direction: 1 to encrypt (shift toward the next cell), -1 to decrypt.
function shiftDigraph(square: string[], pair: string, direction: 1 | -1): string {
  const posA = locate(square, pair[0]);
  const posB = locate(square, pair[1]);

  if (posA.row === posB.row) {
    const colA = (posA.col + direction + GRID_SIZE) % GRID_SIZE;
    const colB = (posB.col + direction + GRID_SIZE) % GRID_SIZE;
    return square[posA.row * GRID_SIZE + colA] + square[posB.row * GRID_SIZE + colB];
  }
  if (posA.col === posB.col) {
    const rowA = (posA.row + direction + GRID_SIZE) % GRID_SIZE;
    const rowB = (posB.row + direction + GRID_SIZE) % GRID_SIZE;
    return square[rowA * GRID_SIZE + posA.col] + square[rowB * GRID_SIZE + posB.col];
  }
  // Rectangle case: swap columns, keep each letter's own row.
  return square[posA.row * GRID_SIZE + posB.col] + square[posB.row * GRID_SIZE + posA.col];
}

export function encryptPlayfair(text: string, key: string): string {
  const square = buildKeySquare(key);
  return toDigraphs(text)
    .map((pair) => shiftDigraph(square, pair, 1))
    .join("");
}

export function decryptPlayfair(text: string, key: string): string {
  const square = buildKeySquare(key);
  const letters = sanitizePlayfairKey(text);
  const pairs: string[] = [];
  for (let i = 0; i < letters.length; i += 2) {
    pairs.push(letters.slice(i, i + 2).padEnd(2, FILLER));
  }
  return pairs.map((pair) => shiftDigraph(square, pair, -1)).join("");
}
