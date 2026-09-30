"use client";

import { useState, createContext, ChangeEvent, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { MAX_TEXT } from "@/helpers";
import {
  encryptCaesar,
  decryptCaesar,
  MAX_CAESAR_ROTATION,
} from "@/helpers/ciphers/caesar";
import { encryptAtbash, decryptAtbash } from "@/helpers/ciphers/atbash";
import {
  encryptVigenere,
  decryptVigenere,
  DEFAULT_VIGENERE_KEY,
  MAX_VIGENERE_KEY_LENGTH,
} from "@/helpers/ciphers/vigenere";
import {
  encryptPlayfair,
  decryptPlayfair,
  DEFAULT_PLAYFAIR_KEY,
  MAX_PLAYFAIR_KEY_LENGTH,
} from "@/helpers/ciphers/playfair";
import {
  encryptAffine,
  decryptAffine,
  DEFAULT_A,
  DEFAULT_B,
} from "@/helpers/ciphers/affine";
import {
  encryptPolybius,
  decryptPolybius,
  DEFAULT_POLYBIUS_KEY,
  MAX_POLYBIUS_KEY_LENGTH,
} from "@/helpers/ciphers/polybius";
import {
  encryptAlberti,
  decryptAlberti,
  DEFAULT_ALBERTI_KEY,
  MAX_ALBERTI_KEY_LENGTH,
  DEFAULT_ALBERTI_PERIOD,
  MIN_ALBERTI_PERIOD,
  MAX_ALBERTI_PERIOD,
} from "@/helpers/ciphers/alberti";
import {
  encryptAutokey,
  decryptAutokey,
  DEFAULT_AUTOKEY_SEED,
  MAX_AUTOKEY_SEED_LENGTH,
} from "@/helpers/ciphers/autokey";
import {
  encryptHill,
  decryptHill,
  DEFAULT_HILL_MATRIX,
  HillMatrix,
} from "@/helpers/ciphers/hill";
import {
  encryptAdfgvx,
  decryptAdfgvx,
  DEFAULT_ADFGVX_GRID_KEY,
  DEFAULT_ADFGVX_TRANSPOSITION_KEY,
  MAX_ADFGVX_KEY_LENGTH,
} from "@/helpers/ciphers/adfgvx";
import {
  encryptScytale,
  decryptScytale,
  DEFAULT_SCYTALE_DIAMETER,
  MIN_SCYTALE_DIAMETER,
  MAX_SCYTALE_DIAMETER,
} from "@/helpers/ciphers/scytale";
import {
  encryptRailFence,
  decryptRailFence,
  DEFAULT_RAILFENCE_RAILS,
  MIN_RAILFENCE_RAILS,
  MAX_RAILFENCE_RAILS,
} from "@/helpers/ciphers/railfence";
import {
  encryptColumnar,
  decryptColumnar,
  DEFAULT_COLUMNAR_KEY,
  MAX_COLUMNAR_KEY_LENGTH,
} from "@/helpers/ciphers/columnar";
import {
  encryptEnigma,
  decryptEnigma,
  DEFAULT_ENIGMA_ROTOR_POSITIONS,
  DEFAULT_ENIGMA_PLUGBOARD,
  MAX_ENIGMA_PLUGBOARD_LENGTH,
} from "@/helpers/ciphers/enigma";
import {
  encryptOtp,
  decryptOtp,
  DEFAULT_OTP_KEY,
  MAX_OTP_KEY_LENGTH,
} from "@/helpers/ciphers/otp";
import { CIPHERS, CipherId, DEFAULT_CIPHER } from "@/helpers/ciphers/types";

export interface ClassicalContextValue {
  rotation: number;
  plaintext: string;
  ciphertext: string;
  cipherType: CipherId;
  handleCipherTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectCipher: (nextCipher: CipherId) => void;
  vigenereKey: string;
  handleVigenereKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  playfairKey: string;
  handlePlayfairKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  affineA: number;
  affineB: number;
  handleAffineAChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleAffinePlusB: () => void;
  handleAffineMinusB: () => void;
  polybiusKey: string;
  handlePolybiusKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  albertiKey: string;
  albertiPeriod: number;
  handleAlbertiKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAlbertiPeriodChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autokeySeed: string;
  handleAutokeySeedChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hillMatrix: HillMatrix;
  handleHillMatrixChange: (
    cell: keyof HillMatrix,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  adfgvxGridKey: string;
  adfgvxTranspositionKey: string;
  handleAdfgvxGridKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAdfgvxTranspositionKeyChange: (
    e: ChangeEvent<HTMLInputElement>,
  ) => void;
  scytaleDiameter: number;
  handleScytaleDiameterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  railFenceRails: number;
  handleRailFenceRailsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  columnarKey: string;
  handleColumnarKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  enigmaRotorPositions: string;
  handleEnigmaRotorPositionsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  enigmaPlugboard: string;
  handleEnigmaPlugboardChange: (e: ChangeEvent<HTMLInputElement>) => void;
  otpKey: string;
  handleOtpKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePlusRotation: () => void;
  handleMinusRotation: () => void;
  handleEncryption: (e: ChangeEvent<HTMLTextAreaElement> | string) => void;
  handleDecryption: (e: ChangeEvent<HTMLTextAreaElement> | string) => void;
  handleDeleteTextArea: () => void;
  handleCopyCipherText: () => void;
  handleCopyPlainText: () => void;
  handlePasteCipherText: () => void;
  handlePastePlainText: () => void;
}

export const CeaserContext = createContext<ClassicalContextValue | undefined>(
  undefined,
);

// Clamps a numeric <input> change into [min, max], falling back to `min`
// when the field is empty or the value isn't a number (e.g. mid-edit).
function clampNumberInput(value: string, min: number, max: number): number {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return min;
  return Math.max(min, Math.min(parsed, max));
}

interface CipherParams {
  rotation: number;
  vigenereKey: string;
  playfairKey: string;
  affineA: number;
  affineB: number;
  polybiusKey: string;
  albertiKey: string;
  albertiPeriod: number;
  autokeySeed: string;
  hillMatrix: HillMatrix;
  adfgvxGridKey: string;
  adfgvxTranspositionKey: string;
  scytaleDiameter: number;
  railFenceRails: number;
  columnarKey: string;
  enigmaRotorPositions: string;
  enigmaPlugboard: string;
  otpKey: string;
}

// Dispatch table: one entry per implemented cipher, each taking the raw text
// plus the current params and returning the transformed text.
function encryptWith(
  cipherType: CipherId,
  text: string,
  params: CipherParams,
): string {
  switch (cipherType) {
    case "atbash":
      return encryptAtbash(text);
    case "vigenere":
      return encryptVigenere(text, params.vigenereKey);
    case "playfair":
      return encryptPlayfair(text, params.playfairKey);
    case "affine":
      return encryptAffine(text, params.affineA, params.affineB);
    case "polybius":
      return encryptPolybius(text, params.polybiusKey);
    case "alberti":
      return encryptAlberti(text, params.albertiKey, params.albertiPeriod);
    case "autokey":
      return encryptAutokey(text, params.autokeySeed);
    case "hill":
      return encryptHill(text, params.hillMatrix);
    case "adfgvx":
      return encryptAdfgvx(
        text,
        params.adfgvxGridKey,
        params.adfgvxTranspositionKey,
      );
    case "scytale":
      return encryptScytale(text, params.scytaleDiameter);
    case "railfence":
      return encryptRailFence(text, params.railFenceRails);
    case "columnar":
      return encryptColumnar(text, params.columnarKey);
    case "enigma":
      return encryptEnigma(
        text,
        params.enigmaRotorPositions,
        params.enigmaPlugboard,
      );
    case "otp":
      return encryptOtp(text, params.otpKey);
    case "caesar":
    default:
      return encryptCaesar(text, params.rotation);
  }
}

function decryptWith(
  cipherType: CipherId,
  text: string,
  params: CipherParams,
): string {
  switch (cipherType) {
    case "atbash":
      return decryptAtbash(text);
    case "vigenere":
      return decryptVigenere(text, params.vigenereKey);
    case "playfair":
      return decryptPlayfair(text, params.playfairKey);
    case "affine":
      return decryptAffine(text, params.affineA, params.affineB);
    case "polybius":
      return decryptPolybius(text, params.polybiusKey);
    case "alberti":
      return decryptAlberti(text, params.albertiKey, params.albertiPeriod);
    case "autokey":
      return decryptAutokey(text, params.autokeySeed);
    case "hill":
      return decryptHill(text, params.hillMatrix);
    case "adfgvx":
      return decryptAdfgvx(
        text,
        params.adfgvxGridKey,
        params.adfgvxTranspositionKey,
      );
    case "scytale":
      return decryptScytale(text, params.scytaleDiameter);
    case "railfence":
      return decryptRailFence(text, params.railFenceRails);
    case "columnar":
      return decryptColumnar(text, params.columnarKey);
    case "enigma":
      return decryptEnigma(
        text,
        params.enigmaRotorPositions,
        params.enigmaPlugboard,
      );
    case "otp":
      return decryptOtp(text, params.otpKey);
    case "caesar":
    default:
      return decryptCaesar(text, params.rotation);
  }
}

export default function ClassicalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [textArea, setTextArea] = useState<string>("");
  const [rotation, setRotation] = useState<number>(3);
  const [plaintext, setPlaintext] = useState<string>("");
  const [ciphertext, setCiphertext] = useState<string>("");
  const [cipherType, setCipherType] = useState<CipherId>(DEFAULT_CIPHER);
  const [vigenereKey, setVigenereKey] = useState<string>(DEFAULT_VIGENERE_KEY);
  const [playfairKey, setPlayfairKey] = useState<string>(DEFAULT_PLAYFAIR_KEY);
  const [affineA, setAffineA] = useState<number>(DEFAULT_A);
  const [affineB, setAffineB] = useState<number>(DEFAULT_B);
  const [polybiusKey, setPolybiusKey] = useState<string>(DEFAULT_POLYBIUS_KEY);
  const [albertiKey, setAlbertiKey] = useState<string>(DEFAULT_ALBERTI_KEY);
  const [albertiPeriod, setAlbertiPeriod] = useState<number>(
    DEFAULT_ALBERTI_PERIOD,
  );
  const [autokeySeed, setAutokeySeed] = useState<string>(DEFAULT_AUTOKEY_SEED);
  const [hillMatrix, setHillMatrix] = useState<HillMatrix>(DEFAULT_HILL_MATRIX);
  const [adfgvxGridKey, setAdfgvxGridKey] = useState<string>(
    DEFAULT_ADFGVX_GRID_KEY,
  );
  const [adfgvxTranspositionKey, setAdfgvxTranspositionKey] = useState<string>(
    DEFAULT_ADFGVX_TRANSPOSITION_KEY,
  );
  const [scytaleDiameter, setScytaleDiameter] = useState<number>(
    DEFAULT_SCYTALE_DIAMETER,
  );
  const [railFenceRails, setRailFenceRails] = useState<number>(
    DEFAULT_RAILFENCE_RAILS,
  );
  const [columnarKey, setColumnarKey] = useState<string>(DEFAULT_COLUMNAR_KEY);
  const [enigmaRotorPositions, setEnigmaRotorPositions] = useState<string>(
    DEFAULT_ENIGMA_ROTOR_POSITIONS,
  );
  const [enigmaPlugboard, setEnigmaPlugboard] = useState<string>(
    DEFAULT_ENIGMA_PLUGBOARD,
  );
  const [otpKey, setOtpKey] = useState<string>(DEFAULT_OTP_KEY);

  const handleCipherTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextCipher = e.target.value as CipherId;
    setCipherType(nextCipher);
    const label = CIPHERS.find(({ id }) => id === nextCipher)?.label ?? nextCipher;
    setAnnouncement(`${label} selected`);
  };

  const selectCipher = (nextCipher: CipherId) => {
    setCipherType(nextCipher);
  };

  const handleVigenereKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVigenereKey(e.target.value.slice(0, MAX_VIGENERE_KEY_LENGTH));
  };

  const handlePlayfairKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayfairKey(e.target.value.slice(0, MAX_PLAYFAIR_KEY_LENGTH));
  };

  const handleAffineAChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAffineA(Number(e.target.value));
  };

  const handleAffinePlusB = () => {
    setAffineB(affineB + 1 > 25 ? affineB : affineB + 1);
  };

  const handleAffineMinusB = () => {
    setAffineB(affineB - 1 < 0 ? affineB : affineB - 1);
  };

  const handlePolybiusKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPolybiusKey(e.target.value.slice(0, MAX_POLYBIUS_KEY_LENGTH));
  };

  const handleAlbertiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlbertiKey(e.target.value.slice(0, MAX_ALBERTI_KEY_LENGTH));
  };

  const handleAlbertiPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlbertiPeriod(
      clampNumberInput(e.target.value, MIN_ALBERTI_PERIOD, MAX_ALBERTI_PERIOD),
    );
  };

  const handleAutokeySeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAutokeySeed(e.target.value.slice(0, MAX_AUTOKEY_SEED_LENGTH));
  };

  const handleHillMatrixChange =
    (cell: keyof HillMatrix) => (e: ChangeEvent<HTMLInputElement>) => {
      setHillMatrix((previous) => ({
        ...previous,
        [cell]: clampNumberInput(e.target.value, 0, 25),
      }));
    };

  const handleAdfgvxGridKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdfgvxGridKey(e.target.value.slice(0, MAX_ADFGVX_KEY_LENGTH));
  };

  const handleAdfgvxTranspositionKeyChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setAdfgvxTranspositionKey(e.target.value.slice(0, MAX_ADFGVX_KEY_LENGTH));
  };

  const handleScytaleDiameterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScytaleDiameter(
      clampNumberInput(
        e.target.value,
        MIN_SCYTALE_DIAMETER,
        MAX_SCYTALE_DIAMETER,
      ),
    );
  };

  const handleRailFenceRailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRailFenceRails(
      clampNumberInput(
        e.target.value,
        MIN_RAILFENCE_RAILS,
        MAX_RAILFENCE_RAILS,
      ),
    );
  };

  const handleColumnarKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnarKey(e.target.value.slice(0, MAX_COLUMNAR_KEY_LENGTH));
  };

  const handleEnigmaRotorPositionsChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setEnigmaRotorPositions(e.target.value.slice(0, 3));
  };

  const handleEnigmaPlugboardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnigmaPlugboard(e.target.value.slice(0, MAX_ENIGMA_PLUGBOARD_LENGTH));
  };

  const handleOtpKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtpKey(e.target.value.slice(0, MAX_OTP_KEY_LENGTH));
  };

  const handlePlusRotation = () => {
    setRotation(rotation + 1 > MAX_CAESAR_ROTATION ? rotation : rotation + 1);
  };

  const handleMinusRotation = () => {
    setRotation(rotation - 1 < 0 ? rotation : rotation - 1);
  };

  const handleUpdateTextAreas = () => {
    switch (textArea) {
      case "encryption":
        handleEncryption(plaintext);
        break;
      case "dencryption":
        handleDecryption(ciphertext);
        break;
      default:
        break;
    }
  };

  const handleEncryption = (e: ChangeEvent<HTMLTextAreaElement> | string) => {
    setTextArea("encryption");
    const getText = typeof e === "object" ? e.target.value : e;

    setCiphertext(
      encryptWith(cipherType, getText, {
        rotation,
        vigenereKey,
        playfairKey,
        affineA,
        affineB,
        polybiusKey,
        albertiKey,
        albertiPeriod,
        autokeySeed,
        hillMatrix,
        adfgvxGridKey,
        adfgvxTranspositionKey,
        scytaleDiameter,
        railFenceRails,
        columnarKey,
        enigmaRotorPositions,
        enigmaPlugboard,
        otpKey,
      }),
    );
    setPlaintext(getText);
  };

  const handleDecryption = (e: ChangeEvent<HTMLTextAreaElement> | string) => {
    setTextArea("dencryption");
    const getText = typeof e === "object" ? e.target.value : e;

    setCiphertext(getText);
    setPlaintext(
      decryptWith(cipherType, getText, {
        rotation,
        vigenereKey,
        playfairKey,
        affineA,
        affineB,
        polybiusKey,
        albertiKey,
        albertiPeriod,
        autokeySeed,
        hillMatrix,
        adfgvxGridKey,
        adfgvxTranspositionKey,
        scytaleDiameter,
        railFenceRails,
        columnarKey,
        enigmaRotorPositions,
        enigmaPlugboard,
        otpKey,
      }),
    );
  };

  const handleDeleteTextArea = () => {
    setPlaintext("");
    setCiphertext("");
    setTextArea("");
    // The one-time pad key is the only "key" whose secrecy is the entire
    // security guarantee, so clearing the text also clears it from memory.
    setOtpKey(DEFAULT_OTP_KEY);
  };

  useEffect(() => {
    handleUpdateTextAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rotation,
    cipherType,
    vigenereKey,
    playfairKey,
    affineA,
    affineB,
    polybiusKey,
    albertiKey,
    albertiPeriod,
    autokeySeed,
    hillMatrix,
    adfgvxGridKey,
    adfgvxTranspositionKey,
    scytaleDiameter,
    railFenceRails,
    columnarKey,
    enigmaRotorPositions,
    enigmaPlugboard,
    otpKey,
  ]);

  const [announcement, setAnnouncement] = useState<string>("");
  const announceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!textArea) return;
    if (announceTimeoutRef.current) clearTimeout(announceTimeoutRef.current);
    announceTimeoutRef.current = setTimeout(() => {
      if (textArea === "encryption") {
        setAnnouncement(`Ciphertext updated, ${ciphertext.length} characters`);
      } else if (textArea === "dencryption") {
        setAnnouncement(`Plaintext updated, ${plaintext.length} characters`);
      }
    }, 700);
    return () => {
      if (announceTimeoutRef.current) clearTimeout(announceTimeoutRef.current);
    };
     
  }, [plaintext, ciphertext, textArea]);

  const handleCopyCipherText = () => {
    if (!ciphertext) {
      toast.info("No ciphertext to copy");
      return;
    }
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(ciphertext)
        .then(() => {
          toast.success("Ciphertext has been copied!");
          setAnnouncement("Ciphertext successfully copied to clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy ciphertext");
        });
    } else {
      toast.error("Clipboard access is not available. Please copy manually.");
      setAnnouncement("Clipboard not available. Please copy manually.");
    }
  };

  const handlePasteCipherText = () => {
    if (navigator?.clipboard?.readText) {
      navigator.clipboard
        .readText()
        .then((cliptext) => {
          if (!cliptext) return;
          const cleanText = cliptext.slice(0, MAX_TEXT);
          handleEncryption(cleanText);
          setAnnouncement("Text pasted into plaintext input");
        })
        .catch(() => {
          toast.error("Unable to read from clipboard. Please paste manually.");
        });
    } else {
      toast.error("Clipboard access is not available. Please paste manually.");
      setAnnouncement("Clipboard not available. Please paste manually.");
    }
  };

  const handleCopyPlainText = () => {
    if (!plaintext) {
      toast.info("No plaintext to copy");
      return;
    }
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(plaintext)
        .then(() => {
          toast.success("The plain text has been copied!");
          setAnnouncement("Plaintext successfully copied to clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy plaintext");
        });
    } else {
      toast.error("Clipboard access is not available. Please copy manually.");
      setAnnouncement("Clipboard not available. Please copy manually.");
    }
  };

  const handlePastePlainText = () => {
    if (navigator?.clipboard?.readText) {
      navigator.clipboard
        .readText()
        .then((cliptext) => {
          if (!cliptext) return;
          const cleanText = cliptext.slice(0, MAX_TEXT);
          handleDecryption(cleanText);
          setAnnouncement("Text pasted into ciphertext input");
        })
        .catch(() => {
          toast.error("Unable to read from clipboard. Please paste manually.");
        });
    } else {
      toast.error("Clipboard access is not available. Please paste manually.");
      setAnnouncement("Clipboard not available. Please paste manually.");
    }
  };

  return (
    <CeaserContext.Provider
      value={{
        rotation,
        plaintext,
        ciphertext,
        cipherType,
        handleCipherTypeChange,
        selectCipher,
        vigenereKey,
        handleVigenereKeyChange,
        playfairKey,
        handlePlayfairKeyChange,
        affineA,
        affineB,
        handleAffineAChange,
        handleAffinePlusB,
        handleAffineMinusB,
        polybiusKey,
        handlePolybiusKeyChange,
        albertiKey,
        albertiPeriod,
        handleAlbertiKeyChange,
        handleAlbertiPeriodChange,
        autokeySeed,
        handleAutokeySeedChange,
        hillMatrix,
        handleHillMatrixChange,
        adfgvxGridKey,
        adfgvxTranspositionKey,
        handleAdfgvxGridKeyChange,
        handleAdfgvxTranspositionKeyChange,
        scytaleDiameter,
        handleScytaleDiameterChange,
        railFenceRails,
        handleRailFenceRailsChange,
        columnarKey,
        handleColumnarKeyChange,
        enigmaRotorPositions,
        handleEnigmaRotorPositionsChange,
        enigmaPlugboard,
        handleEnigmaPlugboardChange,
        otpKey,
        handleOtpKeyChange,
        handlePlusRotation,
        handleMinusRotation,
        handleEncryption,
        handleDecryption,
        handleDeleteTextArea,
        handleCopyCipherText,
        handleCopyPlainText,
        handlePasteCipherText,
        handlePastePlainText,
      }}
    >
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      {children}
    </CeaserContext.Provider>
  );
}
