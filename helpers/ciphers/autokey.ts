const CODE_A_UPPER = "A".charCodeAt(0);
const CODE_Z_UPPER = "Z".charCodeAt(0);
const CODE_A_LOWER = "a".charCodeAt(0);
const CODE_Z_LOWER = "z".charCodeAt(0);
const ALPHABET_LENGTH = 26;

export const MAX_AUTOKEY_SEED_LENGTH = 50;
export const DEFAULT_AUTOKEY_SEED = "KEY";

// Unlike Vigenère, the keystream isn't the seed repeated: after the seed
// runs out, the plaintext itself keeps extending the keystream, so
// K[i] = seed[i] for i < seed.length, else plaintext[i - seed.length].
export function sanitizeAutokeySeed(seed: string): string {
  return seed.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function isUpper(code: number): boolean {
  return code >= CODE_A_UPPER && code <= CODE_Z_UPPER;
}

function isLower(code: number): boolean {
  return code >= CODE_A_LOWER && code <= CODE_Z_LOWER;
}

export function encryptAutokey(text: string, seed: string): string {
  const seedValues = sanitizeAutokeySeed(seed)
    .split("")
    .map((char) => char.charCodeAt(0) - CODE_A_UPPER);
  if (!seedValues.length) return text;

  const plainValues: number[] = [];
  let letterIndex = 0;

  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      const base = isUpper(code) ? CODE_A_UPPER : isLower(code) ? CODE_A_LOWER : null;
      if (base === null) return character;

      const x = code - base;
      const k = letterIndex < seedValues.length
        ? seedValues[letterIndex]
        : plainValues[letterIndex - seedValues.length];
      const y = (x + k) % ALPHABET_LENGTH;

      plainValues.push(x);
      letterIndex++;

      return String.fromCharCode(base + y);
    })
    .join("");
}

export function decryptAutokey(text: string, seed: string): string {
  const seedValues = sanitizeAutokeySeed(seed)
    .split("")
    .map((char) => char.charCodeAt(0) - CODE_A_UPPER);
  if (!seedValues.length) return text;

  const plainValues: number[] = [];
  let letterIndex = 0;

  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      const base = isUpper(code) ? CODE_A_UPPER : isLower(code) ? CODE_A_LOWER : null;
      if (base === null) return character;

      const y = code - base;
      const k = letterIndex < seedValues.length
        ? seedValues[letterIndex]
        : plainValues[letterIndex - seedValues.length];
      const x = ((y - k) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH;

      plainValues.push(x);
      letterIndex++;

      return String.fromCharCode(base + x);
    })
    .join("");
}
