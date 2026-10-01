const CODE_A_UPPER = "A".charCodeAt(0);
const CODE_Z_UPPER = "Z".charCodeAt(0);
const CODE_A_LOWER = "a".charCodeAt(0);
const CODE_Z_LOWER = "z".charCodeAt(0);
const FIXED_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHABET_LENGTH = 26;

export const DEFAULT_ALBERTI_KEY = "ALBERTI";
export const MAX_ALBERTI_KEY_LENGTH = 50;
export const DEFAULT_ALBERTI_PERIOD = 4;
export const MIN_ALBERTI_PERIOD = 1;
export const MAX_ALBERTI_PERIOD = 20;

export function sanitizeAlbertiKey(key: string): string {
  return key.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

// The moving "inner disk": a keyed reordering of A-Z. The fixed "outer
// disk" is just the alphabet in order.
export function buildAlbertiDisk(key: string): string {
  const seen = new Set<string>();
  let disk = "";
  for (const char of sanitizeAlbertiKey(key) + FIXED_ALPHABET) {
    if (!seen.has(char)) {
      seen.add(char);
      disk += char;
    }
  }
  return disk;
}

function isUpper(code: number): boolean {
  return code >= CODE_A_UPPER && code <= CODE_Z_UPPER;
}

function isLower(code: number): boolean {
  return code >= CODE_A_LOWER && code <= CODE_Z_LOWER;
}

export function normalizeAlbertiPeriod(period: number): number {
  if (isNaN(period) || !isFinite(period)) return DEFAULT_ALBERTI_PERIOD;
  const intVal = Math.trunc(period);
  return Math.max(MIN_ALBERTI_PERIOD, Math.min(intVal, MAX_ALBERTI_PERIOD));
}

// Every `period` letters, Alberti's index letter advances one notch,
// rotating the inner disk against the fixed outer one — the mechanical
// move that makes this the first known polyalphabetic cipher. direction: 1
// to encrypt (outer -> disk), -1 to decrypt (disk -> outer).
function transformAlberti(text: string, key: string, period: number, direction: 1 | -1): string {
  const disk = buildAlbertiDisk(key);
  const safePeriod = normalizeAlbertiPeriod(period);
  let letterCount = 0;

  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      const base = isUpper(code) ? CODE_A_UPPER : isLower(code) ? CODE_A_LOWER : null;
      if (base === null) return character;

      const offset = Math.floor(letterCount / safePeriod) % ALPHABET_LENGTH;
      letterCount++;

      if (direction === 1) {
        const outerIndex = code - base;
        const diskChar = disk[(outerIndex + offset) % ALPHABET_LENGTH];
        return base === CODE_A_UPPER ? diskChar : diskChar.toLowerCase();
      }

      const diskIndex = disk.indexOf(character.toUpperCase());
      const outerIndex = ((diskIndex - offset) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH;
      const outerChar = FIXED_ALPHABET[outerIndex];
      return base === CODE_A_UPPER ? outerChar : outerChar.toLowerCase();
    })
    .join("");
}

export function encryptAlberti(text: string, key: string, period: number): string {
  return transformAlberti(text, key, period, 1);
}

export function decryptAlberti(text: string, key: string, period: number): string {
  return transformAlberti(text, key, period, -1);
}
