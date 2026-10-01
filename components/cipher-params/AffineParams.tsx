"use client";
import useClassical from "@/hooks/useClassical";
import { VALID_A_VALUES } from "@/helpers/ciphers/affine";

const AffineParams = () => {
  const {
    affineA,
    affineB,
    handleAffineAChange,
    handleAffinePlusB,
    handleAffineMinusB,
  } = useClassical();

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="Affine cipher coefficients"
        className="flex items-end justify-center gap-5"
      >
        <div className="flex flex-col items-center gap-1">
          <label
            htmlFor="affineA"
            className="text-xs font-medium text-white uppercase tracking-wider"
          >
            a
          </label>
          <select
            id="affineA"
            value={affineA}
            onChange={handleAffineAChange}
            aria-describedby="affineAHint"
            className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 appearance-none cursor-pointer w-20 text-center"
          >
            {VALID_A_VALUES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-medium text-white uppercase tracking-wider">
            b
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              title="decrease b"
              aria-label="Decrease additive shift b"
              className={`cursor-pointer p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-opacity hover:opacity-80 ${
                affineB === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => handleAffineMinusB()}
              disabled={affineB === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <span
              className="w-8 text-center font-mono text-emerald-400"
              aria-live="polite"
              aria-atomic="true"
            >
              {affineB}
            </span>
            <button
              type="button"
              title="increase b"
              aria-label="Increase additive shift b"
              className={`cursor-pointer p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-opacity hover:opacity-80 ${
                affineB === 25 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => handleAffinePlusB()}
              disabled={affineB === 25}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p id="affineAHint" className="text-xs text-white text-center">
        {`E(x) = (${affineA}x + ${affineB}) mod 26 — only letters shift, a must stay coprime with 26`}
      </p>
    </div>
  );
};

export default AffineParams;
