export type CipherId =
  | "caesar"
  | "atbash"
  | "affine"
  | "polybius"
  | "alberti"
  | "vigenere"
  | "autokey"
  | "playfair"
  | "hill"
  | "adfgvx"
  | "scytale"
  | "railfence"
  | "columnar"
  | "enigma"
  | "otp";

export interface CipherOption {
  id: CipherId;
  label: string;
  implemented: boolean;
  // Short, unique blurb used for per-cipher route metadata and intro copy.
  description: string;
}

// Single source of truth for the cipher <select>: add a cipher here (and flip
// `implemented` once it has an algorithm + params UI wired in) to surface it.
export const CIPHERS: CipherOption[] = [
  {
    id: "caesar",
    label: "Caesar Cipher",
    implemented: true,
    description:
      "Shift every character by a fixed rotation offset, the oldest and simplest substitution cipher.",
  },
  {
    id: "atbash",
    label: "Atbash Cipher",
    implemented: true,
    description:
      "Mirror the alphabet so each letter maps to its reverse counterpart, with no key required.",
  },
  {
    id: "affine",
    label: "Affine Cipher",
    implemented: true,
    description:
      "Combine multiplication and shift keys (a, b) in a single linear substitution cipher.",
  },
  {
    id: "polybius",
    label: "Polybius Square Cipher",
    implemented: true,
    description:
      "Encode each letter as a row and column coordinate on a 5x5 grid.",
  },
  {
    id: "alberti",
    label: "Alberti Cipher",
    implemented: true,
    description:
      "Rotate between substitution alphabets on a periodic schedule, an early polyalphabetic cipher.",
  },
  {
    id: "vigenere",
    label: "Vigenère Cipher",
    implemented: true,
    description:
      "Shift each letter by an amount taken from a repeating keyword, defeating simple frequency analysis.",
  },
  {
    id: "autokey",
    label: "Autokey Cipher",
    implemented: true,
    description:
      "Extend the keyword with the plaintext itself so the key never repeats.",
  },
  {
    id: "playfair",
    label: "Playfair Cipher",
    implemented: true,
    description:
      "Encrypt letter pairs using a 5x5 key square, the classic manual digraph cipher.",
  },
  {
    id: "hill",
    label: "Hill Cipher",
    implemented: true,
    description:
      "Encrypt blocks of letters using matrix multiplication modulo the alphabet size.",
  },
  {
    id: "adfgvx",
    label: "ADFGVX Cipher",
    implemented: true,
    description:
      "Combine a Polybius-style grid with columnar transposition, used by the German army in WWI.",
  },
  {
    id: "scytale",
    label: "Scytale Cipher",
    implemented: true,
    description:
      "Transpose characters by wrapping the message around a rod of a given diameter, an ancient Spartan cipher.",
  },
  {
    id: "railfence",
    label: "Rail Fence Cipher",
    implemented: true,
    description:
      "Write the message in a zigzag across a set number of rails, then read it off row by row.",
  },
  {
    id: "columnar",
    label: "Columnar Transposition Cipher",
    implemented: true,
    description:
      "Write the message into columns under a keyword, then read the columns off in keyword order.",
  },
  {
    id: "enigma",
    label: "Enigma Machine",
    implemented: true,
    description:
      "Simulate the WWII rotor cipher machine, with configurable rotor positions and plugboard swaps.",
  },
  {
    id: "otp",
    label: "One-Time Pad (Vernam)",
    implemented: true,
    description:
      "Combine the message with a random key of equal length for theoretically unbreakable encryption.",
  },
];

export const DEFAULT_CIPHER: CipherId = "caesar";
