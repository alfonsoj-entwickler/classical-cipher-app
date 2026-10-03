export const DEFAULT_RAILFENCE_RAILS = 3;
export const MIN_RAILFENCE_RAILS = 2;
export const MAX_RAILFENCE_RAILS = 20;

export function normalizeRailFenceRails(rails: number): number {
  if (isNaN(rails) || !isFinite(rails)) return DEFAULT_RAILFENCE_RAILS;
  const intVal = Math.trunc(rails);
  return Math.max(MIN_RAILFENCE_RAILS, Math.min(intVal, MAX_RAILFENCE_RAILS));
}

// Builds the zigzag rail index for every position in a text of the given
// length: down to the last rail, back up to the first, repeating. Both
// encrypt and decrypt derive the same pattern so they can add/remove
// characters at matching positions.
function railPattern(length: number, rails: number): number[] {
  const pattern: number[] = [];
  let rail = 0;
  let direction = 1;
  for (let i = 0; i < length; i++) {
    pattern.push(rail);
    if (rail === 0) direction = 1;
    else if (rail === rails - 1) direction = -1;
    rail += direction;
  }
  return pattern;
}

// A pure rearrangement — writes the text in a zigzag across `rails` rows,
// then reads each row left to right. Every character (including spaces and
// casing) survives a round trip unchanged.
export function encryptRailFence(text: string, rails: number): string {
  const railCount = normalizeRailFenceRails(rails);
  if (!text.length || railCount === 1) return text;

  const pattern = railPattern(text.length, railCount);
  const fence: string[][] = Array.from({ length: railCount }, () => []);
  pattern.forEach((rail, index) => fence[rail].push(text[index]));

  return fence.map((row) => row.join("")).join("");
}

export function decryptRailFence(text: string, rails: number): string {
  const railCount = normalizeRailFenceRails(rails);
  if (!text.length || railCount === 1) return text;

  const pattern = railPattern(text.length, railCount);
  const railLengths = new Array(railCount).fill(0);
  pattern.forEach((rail) => railLengths[rail]++);

  const railChars: string[][] = [];
  let cursor = 0;
  for (let r = 0; r < railCount; r++) {
    railChars.push(text.slice(cursor, cursor + railLengths[r]).split(""));
    cursor += railLengths[r];
  }

  const railCursors = new Array(railCount).fill(0);
  return pattern
    .map((rail) => {
      const char = railChars[rail][railCursors[rail]];
      railCursors[rail]++;
      return char;
    })
    .join("");
}
