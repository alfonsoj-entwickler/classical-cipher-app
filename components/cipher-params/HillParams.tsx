"use client";
import useClassical from "@/hooks/useClassical";
import {
  isInvertibleHillKey,
  hillDeterminant,
  HillMatrix,
} from "@/helpers/ciphers/hill";

const CELLS: { key: keyof HillMatrix; row: number; col: number }[] = [
  { key: "a", row: 0, col: 0 },
  { key: "b", row: 0, col: 1 },
  { key: "c", row: 1, col: 0 },
  { key: "d", row: 1, col: 1 },
];

const HillParams = () => {
  const { hillMatrix, handleHillMatrixChange } = useClassical();

  const valid = isInvertibleHillKey(hillMatrix);
  const determinant = hillDeterminant(hillMatrix);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <span className="text-xs font-medium text-white uppercase tracking-wider">
        2x2 key matrix
      </span>
      <div
        role="group"
        aria-label="Hill cipher 2 by 2 key matrix"
        className="grid grid-cols-2 gap-2 w-fit"
      >
        {CELLS.map(({ key, row, col }) => (
          <input
            key={key}
            id={`hillMatrix${key}`}
            type="number"
            min={0}
            max={25}
            value={hillMatrix[key]}
            onChange={handleHillMatrixChange(key)}
            aria-label={`Key matrix row ${row + 1}, column ${col + 1}`}
            className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-16 text-center"
          />
        ))}
      </div>
      <p
        className={`text-xs text-center max-w-xs ${valid ? "text-white" : "text-amber-500"}`}
      >
        {valid
          ? `det = ${determinant} mod 26 — invertible, this key can decrypt`
          : `det = ${determinant} mod 26 — not coprime with 26, falling back to the default key`}
      </p>
    </div>
  );
};

export default HillParams;
