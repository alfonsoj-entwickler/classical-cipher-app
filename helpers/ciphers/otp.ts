// ASCII printable characters start at code 32
const PRINTABLE_CHARACTERS = 32;
// The extended ASCII codes (character code 128-255)
const EXTENDED_CHARACTERS = 255;
// Size of the printable range [32, 255], inclusive on both ends.
const RANGE_SIZE = EXTENDED_CHARACTERS - PRINTABLE_CHARACTERS + 1;
// ASCII space character
const ASCII_SPACE = 32;

// Shifts a character code by `shift` within [32, 255], wrapping around. The
// code is normalized to [0, RANGE_SIZE) before the modulo so the result can
// never fall below 32 into the ASCII control-character range.
function shiftPrintableCode(code: number, shift: number): number {
  const normalized = code - PRINTABLE_CHARACTERS;
  const shifted = ((normalized + shift) % RANGE_SIZE + RANGE_SIZE) % RANGE_SIZE;
  return shifted + PRINTABLE_CHARACTERS;
}

export const MAX_OTP_KEY_LENGTH = 600;
export const DEFAULT_OTP_KEY = "";

// A one-time pad is only as strong as the randomness and length of its key,
// so no character class is stripped — every printable byte the user types is
// a valid pad symbol. Reusing a pad shorter than the message (it cycles, as
// below) breaks the "one-time" guarantee, which is a tradeoff called out in
// the params UI rather than enforced here.
export function sanitizeOtpKey(key: string): string {
  return key.slice(0, MAX_OTP_KEY_LENGTH);
}

// direction: 1 to encrypt (add the pad), -1 to decrypt (subtract it). Mirrors
// the Caesar cipher's extended-ASCII modular arithmetic, but the shift comes
// from the cycling pad instead of a single fixed rotation.
function transformOtp(text: string, key: string, direction: 1 | -1): string {
  const pad = sanitizeOtpKey(key);
  if (!pad.length) return text;

  let padIndex = 0;
  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      if (code === ASCII_SPACE) return character;

      const shift = pad.charCodeAt(padIndex % pad.length) - PRINTABLE_CHARACTERS;
      padIndex++;

      return String.fromCharCode(
        shiftPrintableCode(code, direction === 1 ? shift : -shift),
      );
    })
    .join("");
}

export function encryptOtp(text: string, key: string): string {
  return transformOtp(text, key, 1);
}

export function decryptOtp(text: string, key: string): string {
  return transformOtp(text, key, -1);
}
