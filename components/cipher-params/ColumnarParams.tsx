"use client";
import useClassical from "@/hooks/useClassical";
import { sanitizeColumnarKey } from "@/helpers/ciphers/columnar";

const ColumnarParams = () => {
  const { columnarKey, handleColumnarKeyChange } = useClassical();

  const cleanKey = sanitizeColumnarKey(columnarKey);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label
        htmlFor="columnarKey"
        className="text-xs font-medium text-white uppercase tracking-wider"
      >
        Keyword
      </label>
      <input
        id="columnarKey"
        type="text"
        value={columnarKey}
        onChange={handleColumnarKeyChange}
        placeholder="e.g. CIPHER"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="columnarKeyHint"
        className="bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 w-56 sm:w-64 text-center uppercase tracking-widest"
      />
      <p
        id="columnarKeyHint"
        className="text-xs text-white text-center"
      >
        {cleanKey
          ? `Column order from: ${cleanKey}`
          : "Only letters count; type at least one to encode"}
      </p>
    </div>
  );
};

export default ColumnarParams;
