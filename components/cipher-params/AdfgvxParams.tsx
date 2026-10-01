"use client";
import useClassical from "@/hooks/useClassical";
import {
  sanitizeAdfgvxGridKey,
  sanitizeAdfgvxTranspositionKey,
} from "@/helpers/ciphers/adfgvx";

const AdfgvxParams = () => {
  const {
    adfgvxGridKey,
    adfgvxTranspositionKey,
    handleAdfgvxGridKeyChange,
    handleAdfgvxTranspositionKeyChange,
  } = useClassical();

  const cleanTransKey = sanitizeAdfgvxTranspositionKey(adfgvxTranspositionKey);
  const cleanGridKey = sanitizeAdfgvxGridKey(adfgvxGridKey);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <label
          htmlFor="adfgvxGridKey"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Grid keyword (optional)
        </label>
        <input
          id="adfgvxGridKey"
          type="text"
          value={adfgvxGridKey}
          onChange={handleAdfgvxGridKeyChange}
          placeholder="plain A-Z0-9 grid"
          autoComplete="off"
          spellCheck={false}
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <label
          htmlFor="adfgvxTranspositionKey"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Transposition keyword
        </label>
        <input
          id="adfgvxTranspositionKey"
          type="text"
          value={adfgvxTranspositionKey}
          onChange={handleAdfgvxTranspositionKeyChange}
          placeholder="e.g. GERMAN"
          autoComplete="off"
          spellCheck={false}
          aria-describedby="adfgvxHint"
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
        />
      </div>

      <p
        id="adfgvxHint"
        className="text-xs text-white text-center max-w-xs"
      >
        {cleanTransKey
          ? `Columns reordered by: ${cleanTransKey}`
          : "Type a transposition keyword — without one, no column shuffling happens"}
        {" — letters/digits become ADFGVX pairs on a "}
        {cleanGridKey ? `${cleanGridKey}-keyed` : "plain"} grid, then those
        pairs are shuffled by column.
      </p>
    </div>
  );
};

export default AdfgvxParams;
