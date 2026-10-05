// ASCII printable characters start at code 32
const PRINTABLE_CHARACTERS = 32;
// The extended ASCII codes (character code 128-255)
const EXTENDED_CHARACTERS = 255;
// Size of the printable range [32, 255], inclusive on both ends.
const RANGE_SIZE = EXTENDED_CHARACTERS - PRINTABLE_CHARACTERS + 1;
// ASCII space character
const ASCII_SPACE = 32;

export const MAX_CAESAR_ROTATION = RANGE_SIZE - 1;

export function normalizeCaesarShift(rotation: number): number {
  if (isNaN(rotation) || !isFinite(rotation)) return 0;
  const intVal = Math.trunc(rotation);
  return Math.max(0, Math.min(intVal, MAX_CAESAR_ROTATION));
}

// Shifts a character code by `shift` within [32, 255], wrapping around. The
// code is normalized to [0, RANGE_SIZE) before the modulo so the result can
// never fall below 32 into the ASCII control-character range.
function shiftPrintableCode(code: number, shift: number): number {
  const normalized = code - PRINTABLE_CHARACTERS;
  const shifted = ((normalized + shift) % RANGE_SIZE + RANGE_SIZE) % RANGE_SIZE;
  return shifted + PRINTABLE_CHARACTERS;
}

export function encryptCaesar(text: string, rotation: number): string {
  const safeShift = normalizeCaesarShift(rotation);
  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      if (code === ASCII_SPACE) return character;
      return String.fromCharCode(shiftPrintableCode(code, safeShift));
    })
    .join("");
}

export function decryptCaesar(text: string, rotation: number): string {
  const safeShift = normalizeCaesarShift(rotation);
  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      if (code === ASCII_SPACE) return character;
      return String.fromCharCode(shiftPrintableCode(code, -safeShift));
    })
    .join("");
}
