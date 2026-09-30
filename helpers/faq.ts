// Single source of truth for the homepage FAQ: rendered as visible HTML and
// mirrored into FAQPage JSON-LD, which requires the two to match exactly.
export const FAQ_ITEMS = [
  {
    question: "What is a classical cipher?",
    answer:
      "A classical cipher is a pre-computer method of encrypting text, such as shifting letters (Caesar), substituting them with a keyword (Vigenère), or rearranging them (Rail Fence). They're taught for their historical and educational value.",
  },
  {
    question: "Are these ciphers safe for real secrets today?",
    answer:
      "No. Every cipher here except the One-Time Pad can be broken with modern computers, often instantly. Use them for puzzles, learning cryptography, or historical curiosity — not for protecting sensitive information.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All encryption and decryption runs in your browser with JavaScript — nothing you type is ever sent over the network.",
  },
  {
    question: "Which cipher should I use to decode a message I received?",
    answer:
      "Pick the cipher named or implied by the puzzle, then paste the message into the ciphertext panel. If you don't know which cipher was used, Caesar and Vigenère are the most common starting points.",
  },
  {
    question: "Can I customize the key or rotation offset?",
    answer:
      "Yes. Selecting a cipher reveals its parameters — a rotation offset for Caesar, a keyword for Vigenère or Playfair, a matrix for Hill, and so on — and the output updates live as you change them.",
  },
] as const;
