export const DEFAULT_SCYTALE_DIAMETER = 4;
export const MIN_SCYTALE_DIAMETER = 1;
export const MAX_SCYTALE_DIAMETER = 20;

export function normalizeScytaleDiameter(diameter: number): number {
  if (isNaN(diameter) || !isFinite(diameter)) return DEFAULT_SCYTALE_DIAMETER;
  const intVal = Math.trunc(diameter);
  return Math.max(MIN_SCYTALE_DIAMETER, Math.min(intVal, MAX_SCYTALE_DIAMETER));
}

// The scytale wraps the message around a rod `diameter` letters wide: write
// it down each wrap (column-major) into a rows=diameter grid, then read the
// unwound strip straight across (row-major). Unlike the letter-substitution
// ciphers, this is a pure rearrangement, so every character (including
// spaces, casing, and punctuation) survives a round trip unchanged.
export function encryptScytale(text: string, diameter: number): string {
  const rows = normalizeScytaleDiameter(diameter);
  const length = text.length;
  if (!length) return text;
  const cols = Math.ceil(length / rows);

  const grid: (string | undefined)[][] = Array.from({ length: rows }, () => new Array(cols));
  let index = 0;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (index < length) {
        grid[r][c] = text[index];
        index++;
      }
    }
  }

  let result = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== undefined) result += grid[r][c];
    }
  }
  return result;
}

export function decryptScytale(text: string, diameter: number): string {
  const rows = normalizeScytaleDiameter(diameter);
  const length = text.length;
  if (!length) return text;
  const cols = Math.ceil(length / rows);
  const lastColumnFilled = length - rows * (cols - 1);

  const grid: (string | undefined)[][] = Array.from({ length: rows }, () => new Array(cols));
  let cursor = 0;
  for (let r = 0; r < rows; r++) {
    const rowLength = r < lastColumnFilled ? cols : cols - 1;
    for (let c = 0; c < rowLength; c++) {
      grid[r][c] = text[cursor];
      cursor++;
    }
  }

  let result = "";
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (grid[r][c] !== undefined) result += grid[r][c];
    }
  }
  return result;
}
