const CODE_A_UPPER = "A".charCodeAt(0);
const CODE_Z_UPPER = "Z".charCodeAt(0);
const CODE_A_LOWER = "a".charCodeAt(0);
const CODE_Z_LOWER = "z".charCodeAt(0);
const ALPHABET_LENGTH = 26;

// The multiplicative coefficient `a` must be coprime with 26, otherwise
// E(x) = a*x + b collapses multiple letters onto the same output and can't
// be inverted. These are the only valid choices.
export const VALID_A_VALUES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
export const DEFAULT_A = 5;
export const DEFAULT_B = 8;
export const MAX_B = ALPHABET_LENGTH - 1;

function isUpper(code: number): boolean {
  return code >= CODE_A_UPPER && code <= CODE_Z_UPPER;
}

function isLower(code: number): boolean {
  return code >= CODE_A_LOWER && code <= CODE_Z_LOWER;
}

export function isValidAffineA(a: number): boolean {
  return VALID_A_VALUES.includes(a);
}

export function normalizeAffineA(a: number): number {
  return isValidAffineA(a) ? a : DEFAULT_A;
}

export function normalizeAffineB(b: number): number {
  if (isNaN(b) || !isFinite(b)) return 0;
  const intVal = Math.trunc(b);
  return ((intVal % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
}

function modInverse(a: number, modulus: number): number {
  for (let x = 1; x < modulus; x++) {
    if ((a * x) % modulus === 1) return x;
  }
  return 1;
}

export function encryptAffine(text: string, a: number, b: number): string {
  const safeA = normalizeAffineA(a);
  const safeB = normalizeAffineB(b);

  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      const base = isUpper(code) ? CODE_A_UPPER : isLower(code) ? CODE_A_LOWER : null;
      if (base === null) return character;

      const x = code - base;
      const y = ((safeA * x + safeB) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH;
      return String.fromCharCode(base + y);
    })
    .join("");
}

export function decryptAffine(text: string, a: number, b: number): string {
  const safeA = normalizeAffineA(a);
  const safeB = normalizeAffineB(b);
  const aInverse = modInverse(safeA, ALPHABET_LENGTH);

  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      const base = isUpper(code) ? CODE_A_UPPER : isLower(code) ? CODE_A_LOWER : null;
      if (base === null) return character;

      const y = code - base;
      const x = ((aInverse * (y - safeB)) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH;
      return String.fromCharCode(base + x);
    })
    .join("");
}
