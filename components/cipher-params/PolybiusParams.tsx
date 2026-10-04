"use client";
import useClassical from "@/hooks/useClassical";
import { buildPolybiusSquare } from "@/helpers/ciphers/polybius";

const PolybiusParams = () => {
  const { polybiusKey, handlePolybiusKeyChange } = useClassical();

  const square = buildPolybiusSquare(polybiusKey);
  const rows = [0, 1, 2, 3, 4].map((row) => square.slice(row * 5, row * 5 + 5));

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <label
          htmlFor="polybiusKey"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Keyword (optional)
        </label>
        <input
          id="polybiusKey"
          type="text"
          value={polybiusKey}
          onChange={handlePolybiusKeyChange}
          placeholder="plain A-Z grid"
          autoComplete="off"
          spellCheck={false}
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
        />
      </div>

      <table className="border-collapse font-mono text-sm text-white">
        <caption className="sr-only">
          Polybius square: each cell shows the letter at its row and column
          coordinate.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-7 h-7" aria-hidden="true" />
            {[1, 2, 3, 4, 5].map((col) => (
              <th
                key={col}
                scope="col"
                className="border border-slate-700 w-7 h-7 text-center font-normal text-emerald-400"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rowLetters, rowIndex) => (
            <tr key={rowIndex}>
              <th
                scope="row"
                className="border border-slate-700 w-7 h-7 text-center font-normal text-emerald-400"
              >
                {rowIndex + 1}
              </th>
              {rowLetters.map((letter, colIndex) => (
                <td
                  key={letter}
                  className="border border-slate-700 w-7 h-7 text-center"
                  aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${letter}`}
                >
                  {letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-white text-center">
        Each letter becomes its row+column digits (A = 11); J merges into I, and
        spaces/casing/punctuation are dropped.
      </p>
    </div>
  );
};

export default PolybiusParams;
