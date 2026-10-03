const CODE_A_UPPER = "A".charCodeAt(0);
const CODE_Z_UPPER = "Z".charCodeAt(0);
const CODE_A_LOWER = "a".charCodeAt(0);
const CODE_Z_LOWER = "z".charCodeAt(0);
const ALPHABET_LENGTH = 26;

export const MAX_VIGENERE_KEY_LENGTH = 50;
export const DEFAULT_VIGENERE_KEY = "LEMON";

// Vigenère only has a defined shift for A-Z, so the key is reduced to its
// letters before use; anything else (numbers, accents, punctuation) is dropped.
export function sanitizeVigenereKey(key: string): string {
  return key.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function isUpper(code: number): boolean {
  return code >= CODE_A_UPPER && code <= CODE_Z_UPPER;
}

function isLower(code: number): boolean {
  return code >= CODE_A_LOWER && code <= CODE_Z_LOWER;
}

// direction: 1 to encrypt (shift forward by the key letter), -1 to decrypt.
function transformVigenere(text: string, key: string, direction: 1 | -1): string {
  const cleanKey = sanitizeVigenereKey(key);
  if (!cleanKey) return text;

  let keyIndex = 0;
  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      if (!isUpper(code) && !isLower(code)) return character;

      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - CODE_A_UPPER;
      keyIndex++;

      const base = isUpper(code) ? CODE_A_UPPER : CODE_A_LOWER;
      const shifted = ((code - base + direction * shift) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH;
      return String.fromCharCode(base + shifted);
    })
    .join("");
}

export function encryptVigenere(text: string, key: string): string {
  return transformVigenere(text, key, 1);
}

export function decryptVigenere(text: string, key: string): string {
  return transformVigenere(text, key, -1);
}
