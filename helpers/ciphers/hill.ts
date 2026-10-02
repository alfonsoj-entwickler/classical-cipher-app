const CODE_A_UPPER = "A".charCodeAt(0);
const ALPHABET_LENGTH = 26;

export interface HillMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
}

// det([[3,3],[2,5]]) = 15-6 = 9, gcd(9,26)=1, so this 2x2 matrix is
// invertible mod 26 and works as a safe default key.
export const DEFAULT_HILL_MATRIX: HillMatrix = { a: 3, b: 3, c: 2, d: 5 };
export const MAX_HILL_VALUE = ALPHABET_LENGTH - 1;

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function normalizeHillValue(value: number): number {
  if (isNaN(value) || !isFinite(value)) return 0;
  return mod(Math.trunc(value), ALPHABET_LENGTH);
}

export function hillDeterminant(key: HillMatrix): number {
  return mod(key.a * key.d - key.b * key.c, ALPHABET_LENGTH);
}

// A Hill matrix only has an inverse (and so can only be decrypted) when its
// determinant is coprime with 26.
export function isInvertibleHillKey(key: HillMatrix): boolean {
  return gcd(hillDeterminant(key), ALPHABET_LENGTH) === 1;
}

function modInverse(value: number, modulus: number): number {
  for (let x = 1; x < modulus; x++) {
    if ((value * x) % modulus === 1) return x;
  }
  return 1;
}

function sanitizeHillText(text: string): string {
  return text.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function safeKey(key: HillMatrix): HillMatrix {
  return isInvertibleHillKey(key) ? key : DEFAULT_HILL_MATRIX;
}

// Hill only defines a transform for 2-letter blocks: text is reduced to
// A-Z, and an odd trailing letter is padded with X, same limitation as
// Playfair — spacing, casing, and punctuation don't survive a round trip.
export function encryptHill(text: string, key: HillMatrix): string {
  const { a, b, c, d } = safeKey(key);
  let letters = sanitizeHillText(text);
  if (letters.length % 2 !== 0) letters += "X";

  let result = "";
  for (let i = 0; i < letters.length; i += 2) {
    const x1 = letters.charCodeAt(i) - CODE_A_UPPER;
    const x2 = letters.charCodeAt(i + 1) - CODE_A_UPPER;
    const y1 = mod(a * x1 + b * x2, ALPHABET_LENGTH);
    const y2 = mod(c * x1 + d * x2, ALPHABET_LENGTH);
    result += String.fromCharCode(CODE_A_UPPER + y1) + String.fromCharCode(CODE_A_UPPER + y2);
  }
  return result;
}

export function decryptHill(text: string, key: HillMatrix): string {
  const { a, b, c, d } = safeKey(key);
  const det = hillDeterminant({ a, b, c, d });
  const detInverse = modInverse(det, ALPHABET_LENGTH);

  const ia = mod(detInverse * d, ALPHABET_LENGTH);
  const ib = mod(detInverse * -b, ALPHABET_LENGTH);
  const ic = mod(detInverse * -c, ALPHABET_LENGTH);
  const id = mod(detInverse * a, ALPHABET_LENGTH);

  const letters = sanitizeHillText(text);
  const pairCount = Math.floor(letters.length / 2);

  let result = "";
  for (let i = 0; i < pairCount * 2; i += 2) {
    const y1 = letters.charCodeAt(i) - CODE_A_UPPER;
    const y2 = letters.charCodeAt(i + 1) - CODE_A_UPPER;
    const x1 = mod(ia * y1 + ib * y2, ALPHABET_LENGTH);
    const x2 = mod(ic * y1 + id * y2, ALPHABET_LENGTH);
    result += String.fromCharCode(CODE_A_UPPER + x1) + String.fromCharCode(CODE_A_UPPER + x2);
  }
  return result;
}
