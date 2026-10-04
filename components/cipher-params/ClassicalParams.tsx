"use client";
import useClassical from "@/hooks/useClassical";
import { MAX_CAESAR_ROTATION } from "@/helpers/ciphers/caesar";

const ClassicalParams = () => {
  const { rotation, handlePlusRotation, handleMinusRotation }: any =
    useClassical();

  return (
    <div
      role="group"
      aria-label="Caesar shift rotation offset controls"
      className="w-full flex justify-center items-center gap-4"
    >
      <button
        type="button"
        title="reduce rotation offset"
        aria-label="Decrease rotation shift offset"
        className={`cursor-pointer p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-opacity hover:opacity-80 ${
          rotation === 0 ? "opacity-30 cursor-not-allowed" : ""
        }`}
        onClick={() => handleMinusRotation()}
        disabled={rotation === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <p
        className="w-20 flex flex-col text-2xl md:text-3xl text-center font-semibold select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">Current shift: {rotation}</span>
        <span aria-hidden="true">{rotation}</span>
        <span
          aria-hidden="true"
          className="text-xs uppercase font-light tracking-wider text-white"
        >
          Rotation
        </span>
      </p>
      <button
        type="button"
        title="increase rotation offset"
        aria-label="Increase rotation shift offset"
        className={`cursor-pointer p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-opacity hover:opacity-80 ${
          rotation === MAX_CAESAR_ROTATION
            ? "opacity-30 cursor-not-allowed"
            : ""
        }`}
        onClick={() => handlePlusRotation()}
        disabled={rotation === MAX_CAESAR_ROTATION}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ClassicalParams;
