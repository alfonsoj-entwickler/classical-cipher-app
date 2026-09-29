"use client";
import useClassical from "@/hooks/useClassical";
import { CIPHERS, CipherId } from "@/helpers/ciphers/types";
import CaesarParams from "@/components/cipher-params/CaesarParams";
import VigenereParams from "@/components/cipher-params/VigenereParams";
import PlayfairParams from "@/components/cipher-params/PlayfairParams";
import AffineParams from "@/components/cipher-params/AffineParams";
import PolybiusParams from "@/components/cipher-params/PolybiusParams";
import AlbertiParams from "@/components/cipher-params/AlbertiParams";
import AutokeyParams from "@/components/cipher-params/AutokeyParams";
import HillParams from "@/components/cipher-params/HillParams";
import AdfgvxParams from "@/components/cipher-params/AdfgvxParams";
import ScytaleParams from "@/components/cipher-params/ScytaleParams";
import RailFenceParams from "@/components/cipher-params/RailFenceParams";
import ColumnarParams from "@/components/cipher-params/ColumnarParams";
import EnigmaParams from "@/components/cipher-params/EnigmaParams";
import OtpParams from "@/components/cipher-params/OtpParams";

// Params UI shown below the select for each implemented cipher. A cipher with
// no entry here (or `implemented: false` in CIPHERS) shows no params yet.
const CIPHER_PARAMS: Partial<Record<CipherId, () => JSX.Element>> = {
  caesar: CaesarParams,
  vigenere: VigenereParams,
  playfair: PlayfairParams,
  affine: AffineParams,
  polybius: PolybiusParams,
  alberti: AlbertiParams,
  autokey: AutokeyParams,
  hill: HillParams,
  adfgvx: AdfgvxParams,
  scytale: ScytaleParams,
  railfence: RailFenceParams,
  columnar: ColumnarParams,
  enigma: EnigmaParams,
  otp: OtpParams,
};

const InputCipher = () => {
  const { cipherType, handleCipherTypeChange } = useClassical();

  const ParamsComponent = CIPHER_PARAMS[cipherType as CipherId];

  return (
    <div className="w-full h-full flex flex-col items-center gap-6">
      <div className="flex flex-col space-y-3 w-full items-center">
        <label
          htmlFor="cipherSelect"
          className="text-xs font-medium text-white uppercase tracking-wider sr-only sm:not-sr-only"
        >
          Select Cipher:
        </label>
        <div className="relative">
          <select
            id="cipherSelect"
            value={cipherType}
            onChange={handleCipherTypeChange}
            className="bg-slate-900 border border-solid border-emerald-400 text-white font-mono text-sm rounded-lg p-3 pr-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 appearance-none cursor-pointer w-56 sm:w-64"
          >
            {CIPHERS.map(({ id, label, implemented }) => (
              <option key={id} value={id} disabled={!implemented}>
                {implemented ? label : `${label} (coming soon)`}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-5 h-5 text-emerald-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      {ParamsComponent && <ParamsComponent />}
    </div>
  );
};

export default InputCipher;
