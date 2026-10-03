"use client";
import useClassical from "@/hooks/useClassical";
import { sanitizeVigenereKey } from "@/helpers/ciphers/vigenere";

const VigenereParams = () => {
  const { vigenereKey, handleVigenereKeyChange } = useClassical();

  const cleanKey = sanitizeVigenereKey(vigenereKey);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="vigenereKey"
        className="text-xs font-medium text-white uppercase tracking-wider"
      >
        Keyword
      </label>
      <input
        id="vigenereKey"
        type="text"
        value={vigenereKey}
        onChange={handleVigenereKeyChange}
        placeholder="e.g. LEMON"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="vigenereKeyHint"
        className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
      />
      <p
        id="vigenereKeyHint"
        className="text-xs text-white text-center"
      >
        {cleanKey
          ? `Using key: ${cleanKey}`
          : "Only letters count; type at least one to encode"}
      </p>
    </div>
  );
};

export default VigenereParams;
