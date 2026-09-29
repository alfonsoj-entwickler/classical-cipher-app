"use client";
import useClassical from "@/hooks/useClassical";
import { Tooltip } from "react-tooltip";
import { MAX_TEXT } from "@/helpers";

const CipherTextArea = () => {
  const {
    plaintext,
    handleEncryption,
    handleDeleteTextArea,
    handleCopyPlainText,
    handlePasteCipherText,
  } = useClassical();
  return (
    <div className="flex flex-col w-full md:w-2/3 lg:w-2/5 h-full min-h-[18rem]">
      <div className="h-16 flex justify-between items-center gap-4 px-4 bg-gray-400/80 rounded-t-lg">
        <span className="text-xs text-slate-900 font-mono" aria-hidden="true">
          {plaintext.length}/{MAX_TEXT}
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Paste text into plaintext input"
            className="p-1 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400 transition-opacity hover:opacity-80"
            onClick={() => handlePasteCipherText()}
            data-tooltip-id="tooltip-paste-plain"
            data-tooltip-content="Paste"
            data-tooltip-place="top"
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Copy plaintext to clipboard"
            className="p-1 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400 transition-opacity hover:opacity-80"
            onClick={() => handleCopyPlainText()}
            data-tooltip-id="tooltip-copy-plain"
            data-tooltip-content="Copy"
            data-tooltip-place="top"
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
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Clear all encryption and decryption text"
            className="p-1 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400 transition-opacity hover:opacity-80"
            onClick={() => handleDeleteTextArea()}
            data-tooltip-id="tooltip-remove-plain"
            data-tooltip-content="Remove"
            data-tooltip-place="top"
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
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
          <Tooltip id="tooltip-paste-plain" />
          <Tooltip id="tooltip-copy-plain" />
          <Tooltip id="tooltip-remove-plain" />
        </div>
      </div>
      <label htmlFor="plaintext-textarea" className="sr-only">
        Plaintext input for encryption
      </label>
      <textarea
        id="plaintext-textarea"
        name="encryption"
        className="w-full h-full m-0 py-3 px-4 md:text-xl bg-black/80 text-green-500 rounded-b-lg outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        placeholder="Add your plaintext"
        onChange={(e) => handleEncryption(e)}
        value={plaintext}
        maxLength={MAX_TEXT}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        data-gramm="false"
      />
    </div>
  );
};

export default CipherTextArea;
