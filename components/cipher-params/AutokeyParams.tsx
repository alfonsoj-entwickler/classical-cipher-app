"use client";
import useClassical from "@/hooks/useClassical";
import { sanitizeAutokeySeed } from "@/helpers/ciphers/autokey";

const AutokeyParams = () => {
  const { autokeySeed, handleAutokeySeedChange } = useClassical();

  const cleanSeed = sanitizeAutokeySeed(autokeySeed);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="autokeySeed"
        className="text-xs font-medium text-white uppercase tracking-wider"
      >
        Seed keyword
      </label>
      <input
        id="autokeySeed"
        type="text"
        value={autokeySeed}
        onChange={handleAutokeySeedChange}
        placeholder="e.g. KEY"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="autokeySeedHint"
        className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
      />
      <p
        id="autokeySeedHint"
        className="text-xs text-white text-center max-w-xs"
      >
        {cleanSeed
          ? `Starts with: ${cleanSeed}`
          : "Only letters count; type at least one to encode"}
        {
          " — after that the plaintext itself extends the key, unlike Vigenère's repeating keyword."
        }
      </p>
    </div>
  );
};

export default AutokeyParams;
