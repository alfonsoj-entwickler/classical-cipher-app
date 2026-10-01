"use client";
import useClassical from "@/hooks/useClassical";
import {
  sanitizeAlbertiKey,
  MIN_ALBERTI_PERIOD,
  MAX_ALBERTI_PERIOD,
} from "@/helpers/ciphers/alberti";

const AlbertiParams = () => {
  const {
    albertiKey,
    albertiPeriod,
    handleAlbertiKeyChange,
    handleAlbertiPeriodChange,
  } = useClassical();

  const cleanKey = sanitizeAlbertiKey(albertiKey);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <label
          htmlFor="albertiKey"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Inner disk keyword
        </label>
        <input
          id="albertiKey"
          type="text"
          value={albertiKey}
          onChange={handleAlbertiKeyChange}
          placeholder="e.g. ALBERTI"
          autoComplete="off"
          spellCheck={false}
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <label
          htmlFor="albertiPeriod"
          className="text-xs font-medium text-white uppercase tracking-wider"
        >
          Rotate every N letters
        </label>
        <input
          id="albertiPeriod"
          type="number"
          min={MIN_ALBERTI_PERIOD}
          max={MAX_ALBERTI_PERIOD}
          value={albertiPeriod}
          onChange={handleAlbertiPeriodChange}
          className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-20 text-center"
        />
      </div>

      <p className="text-xs text-white text-center max-w-xs">
        {cleanKey
          ? `Disk order: ${cleanKey}...`
          : "Only letters count; type at least one to shuffle the disk"}
        {
          " — the disk turns one notch every N letters, so each substitution alphabet only lasts N letters."
        }
      </p>
    </div>
  );
};

export default AlbertiParams;
