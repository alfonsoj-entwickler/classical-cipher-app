const CODE_A_UPPER = "A".charCodeAt(0);
const CODE_Z_UPPER = "Z".charCodeAt(0);
const CODE_A_LOWER = "a".charCodeAt(0);
const CODE_Z_LOWER = "z".charCodeAt(0);

// Atbash mirrors each letter within its own alphabet (A<->Z, B<->Y, ...);
// non-letters pass through unchanged. It has no key, and mapping a letter
// twice returns the original, so the same transform both encrypts and decrypts.
export function transformAtbash(text: string): string {
  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      if (code >= CODE_A_UPPER && code <= CODE_Z_UPPER) {
        return String.fromCharCode(CODE_Z_UPPER - (code - CODE_A_UPPER));
      }
      if (code >= CODE_A_LOWER && code <= CODE_Z_LOWER) {
        return String.fromCharCode(CODE_Z_LOWER - (code - CODE_A_LOWER));
      }
      return character;
    })
    .join("");
}

export const encryptAtbash = transformAtbash;
export const decryptAtbash = transformAtbash;
