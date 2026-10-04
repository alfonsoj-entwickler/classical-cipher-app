"use client";
import useClassical from "@/hooks/useClassical";
import { sanitizePlayfairKey } from "@/helpers/ciphers/playfair";

const PlayfairParams = () => {
  const { playfairKey, handlePlayfairKeyChange } = useClassical();

  const cleanKey = sanitizePlayfairKey(playfairKey);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="playfairKey"
        className="text-xs font-medium text-white uppercase tracking-wider"
      >
        Keyword
      </label>
      <input
        id="playfairKey"
        type="text"
        value={playfairKey}
        onChange={handlePlayfairKeyChange}
        placeholder="e.g. PLAYFAIR"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="playfairKeyHint"
        className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
      />
      <p
        id="playfairKeyHint"
        className="text-xs text-white text-center"
      >
        {cleanKey
          ? `5x5 grid built from: ${cleanKey}`
          : "Only letters count; type at least one to build the grid"}
        {
          " — spaces, casing, and punctuation are dropped, J merges into I, and repeated pairs get an X filler, so decrypting won't restore your exact original text."
        }
      </p>
    </div>
  );
};

export default PlayfairParams;
