// The Polybius square merges I/J into a single cell so the alphabet fits a
// 5x5 grid addressed by row/column digits 1-5.
const ALPHABET_NO_J = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const GRID_SIZE = 5;

export const DEFAULT_POLYBIUS_KEY = "";
export const MAX_POLYBIUS_KEY_LENGTH = 50;

export function sanitizePolybiusKey(key: string): string {
  return key
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .replace(/J/g, "I");
}

export function buildPolybiusSquare(key: string): string[] {
  const seen = new Set<string>();
  const square: string[] = [];
  for (const char of sanitizePolybiusKey(key) + ALPHABET_NO_J) {
    if (!seen.has(char)) {
      seen.add(char);
      square.push(char);
    }
  }
  return square;
}

function locate(square: string[], char: string) {
  const index = square.indexOf(char);
  return { row: Math.floor(index / GRID_SIZE) + 1, col: (index % GRID_SIZE) + 1 };
}

// Only letters have a grid position: text is reduced to A-Z (J folded into
// I) before encoding, so spaces, casing, and punctuation don't survive a
// round trip, same limitation as Playfair.
export function encryptPolybius(text: string, key: string): string {
  const square = buildPolybiusSquare(key);
  return sanitizePolybiusKey(text)
    .split("")
    .map((char) => {
      const { row, col } = locate(square, char);
      return `${row}${col}`;
    })
    .join("");
}

export function decryptPolybius(text: string, key: string): string {
  const square = buildPolybiusSquare(key);
  const digits = text.replace(/[^1-5]/g, "");

  const letters: string[] = [];
  for (let i = 0; i + 1 < digits.length; i += 2) {
    const row = Number(digits[i]) - 1;
    const col = Number(digits[i + 1]) - 1;
    letters.push(square[row * GRID_SIZE + col]);
  }
  return letters.join("");
}
