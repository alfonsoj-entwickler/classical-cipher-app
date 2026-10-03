"use client";
import useClassical from "@/hooks/useClassical";
import {
  MIN_RAILFENCE_RAILS,
  MAX_RAILFENCE_RAILS,
} from "@/helpers/ciphers/railfence";

const RailFenceParams = () => {
  const { railFenceRails, handleRailFenceRailsChange } = useClassical();

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="railFenceRails"
        className="text-xs font-medium text-white uppercase tracking-wider"
      >
        Number of rails
      </label>
      <input
        id="railFenceRails"
        type="number"
        min={MIN_RAILFENCE_RAILS}
        max={MAX_RAILFENCE_RAILS}
        value={railFenceRails}
        onChange={handleRailFenceRailsChange}
        className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-20 text-center"
      />
      <p className="text-xs text-white text-center max-w-xs">
        A pure rearrangement — no letters are substituted, so spacing, casing,
        and punctuation survive a round trip exactly.
      </p>
    </div>
  );
};

export default RailFenceParams;
