const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CODE_A_UPPER = "A".charCodeAt(0);
const CODE_A_LOWER = "a".charCodeAt(0);

// Historical Enigma I rotor wirings (right-to-left signal path) and their
// turnover notches, plus the standard reflector B. Wired left-to-right in
// this array as [left, middle, right].
const ROTORS = [
  { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" }, // Rotor I
  { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" }, // Rotor II
  { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" }, // Rotor III
];
const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

export const DEFAULT_ENIGMA_ROTOR_POSITIONS = "AAA";
export const DEFAULT_ENIGMA_PLUGBOARD = "";
export const MAX_ENIGMA_PLUGBOARD_LENGTH = 40;

// The three starting positions (left, middle, right rotor) are the only part
// of the key that must always be present, so anything else is stripped and
// the result is padded/truncated to exactly three letters.
export function sanitizeEnigmaRotorPositions(positions: string): string {
  return positions
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .padEnd(3, "A")
    .slice(0, 3);
}

export function sanitizeEnigmaPlugboard(plugboard: string): string {
  return plugboard
    .replace(/[^a-zA-Z\s]/g, "")
    .toUpperCase()
    .slice(0, MAX_ENIGMA_PLUGBOARD_LENGTH);
}

// Parses space-separated letter pairs (e.g. "AB CD") into a symmetric swap
// map. A pair that repeats a letter already wired elsewhere is skipped, so
// each plug socket only ever connects to one other.
function buildPlugboardMap(plugboard: string): number[] {
  const map = Array.from({ length: 26 }, (_, i) => i);
  const used = new Set<number>();

  for (const pair of sanitizeEnigmaPlugboard(plugboard).split(/\s+/)) {
    if (pair.length !== 2) continue;
    const a = pair.charCodeAt(0) - CODE_A_UPPER;
    const b = pair.charCodeAt(1) - CODE_A_UPPER;
    if (a === b || used.has(a) || used.has(b)) continue;
    map[a] = b;
    map[b] = a;
    used.add(a);
    used.add(b);
  }
  return map;
}

function isUpper(code: number): boolean {
  return code >= CODE_A_UPPER && code <= CODE_A_UPPER + 25;
}

function isLower(code: number): boolean {
  return code >= CODE_A_LOWER && code <= CODE_A_LOWER + 25;
}

// The historical double-step anomaly: the right rotor always advances on a
// keypress; the middle rotor advances (and drags the left rotor with it)
// both when the right rotor has just passed its notch and, one step later,
// when the middle rotor passes its own.
function stepRotors(positions: number[]): void {
  const middleAtNotch = ALPHABET[positions[1]] === ROTORS[1].notch;
  const rightAtNotch = ALPHABET[positions[2]] === ROTORS[2].notch;

  if (middleAtNotch) {
    positions[0] = (positions[0] + 1) % 26;
    positions[1] = (positions[1] + 1) % 26;
  } else if (rightAtNotch) {
    positions[1] = (positions[1] + 1) % 26;
  }
  positions[2] = (positions[2] + 1) % 26;
}

// One letter through the signal path: plugboard, right-to-left through the
// three rotors, the reflector, then left-to-right back out through the
// rotors and the plugboard again.
function encryptLetter(letterIndex: number, positions: number[], plugboardMap: number[]): number {
  let index = plugboardMap[letterIndex];

  for (let r = 2; r >= 0; r--) {
    index = (index + positions[r]) % 26;
    index = ROTORS[r].wiring.charCodeAt(index) - CODE_A_UPPER;
    index = (index - positions[r] + 26) % 26;
  }

  index = REFLECTOR_B.charCodeAt(index) - CODE_A_UPPER;

  for (let r = 0; r < 3; r++) {
    index = (index + positions[r]) % 26;
    index = ROTORS[r].wiring.indexOf(ALPHABET[index]);
    index = (index - positions[r] + 26) % 26;
  }

  return plugboardMap[index];
}

// The reflector makes Enigma reciprocal: running the same rotor/plugboard
// settings over the ciphertext recovers the plaintext, so encrypt and
// decrypt share one implementation. Non-letters don't advance the rotors,
// matching how a real Enigma only steps on an actual keypress.
function transformEnigma(text: string, rotorPositions: string, plugboard: string): string {
  const positions = sanitizeEnigmaRotorPositions(rotorPositions)
    .split("")
    .map((char) => char.charCodeAt(0) - CODE_A_UPPER);
  const plugboardMap = buildPlugboardMap(plugboard);

  return Array.from(text)
    .map((character) => {
      const code = character.charCodeAt(0);
      const base = isUpper(code) ? CODE_A_UPPER : isLower(code) ? CODE_A_LOWER : null;
      if (base === null) return character;

      stepRotors(positions);
      const output = encryptLetter(code - base, positions, plugboardMap);
      return String.fromCharCode(base + output);
    })
    .join("");
}

export function encryptEnigma(text: string, rotorPositions: string, plugboard: string): string {
  return transformEnigma(text, rotorPositions, plugboard);
}

export function decryptEnigma(text: string, rotorPositions: string, plugboard: string): string {
  return transformEnigma(text, rotorPositions, plugboard);
}
