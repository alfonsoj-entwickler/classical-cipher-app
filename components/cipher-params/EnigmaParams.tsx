"use client";
import useClassical from "@/hooks/useClassical";
import {
  sanitizeEnigmaRotorPositions,
  sanitizeEnigmaPlugboard,
} from "@/helpers/ciphers/enigma";

const EnigmaParams = () => {
  const {
    enigmaRotorPositions,
    handleEnigmaRotorPositionsChange,
    enigmaPlugboard,
    handleEnigmaPlugboardChange,
  } = useClassical();

  const cleanPositions = sanitizeEnigmaRotorPositions(enigmaRotorPositions);
  const cleanPlugboard = sanitizeEnigmaPlugboard(enigmaPlugboard);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col items-center gap-2">
        <label
          htmlFor="enigmaRotorPositions"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Rotor start (left, middle, right)
        </label>
        <input
          id="enigmaRotorPositions"
          type="text"
          value={enigmaRotorPositions}
          onChange={handleEnigmaRotorPositionsChange}
          placeholder="e.g. AAA"
          autoComplete="off"
          spellCheck={false}
          aria-describedby="enigmaRotorPositionsHint"
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-32 text-center uppercase tracking-widest"
        />
        <p
          id="enigmaRotorPositionsHint"
          className="text-xs text-white text-center max-w-xs"
        >
          {`Using: ${cleanPositions}`} — rotors I, II, III with reflector B,
          missing letters default to A.
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <label
          htmlFor="enigmaPlugboard"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Plugboard pairs
        </label>
        <input
          id="enigmaPlugboard"
          type="text"
          value={enigmaPlugboard}
          onChange={handleEnigmaPlugboardChange}
          placeholder="e.g. AB CD EF"
          autoComplete="off"
          spellCheck={false}
          aria-describedby="enigmaPlugboardHint"
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
        />
        <p
          id="enigmaPlugboardHint"
          className="text-xs text-white text-center max-w-xs"
        >
          {cleanPlugboard
            ? `Swapping: ${cleanPlugboard}`
            : "Optional space-separated letter pairs, e.g. AB CD"}
        </p>
      </div>
    </div>
  );
};

export default EnigmaParams;
