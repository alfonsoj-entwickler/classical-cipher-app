"use client";
import useClassical from "@/hooks/useClassical";
import {
  MIN_SCYTALE_DIAMETER,
  MAX_SCYTALE_DIAMETER,
} from "@/helpers/ciphers/scytale";

const ScytaleParams = () => {
  const { scytaleDiameter, handleScytaleDiameterChange } = useClassical();

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="scytaleDiameter"
        className="text-xs font-medium text-white uppercase tracking-wider"
      >
        Rod diameter (letters per wrap)
      </label>
      <input
        id="scytaleDiameter"
        type="number"
        min={MIN_SCYTALE_DIAMETER}
        max={MAX_SCYTALE_DIAMETER}
        value={scytaleDiameter}
        onChange={handleScytaleDiameterChange}
        className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-20 text-center"
      />
      <p className="text-xs text-white text-center max-w-xs">
        A pure rearrangement — no letters are substituted, so spacing, casing,
        and punctuation survive a round trip exactly.
      </p>
    </div>
  );
};

export default ScytaleParams;
