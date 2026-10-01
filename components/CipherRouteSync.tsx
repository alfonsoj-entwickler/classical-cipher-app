"use client";
import { useEffect } from "react";
import useClassical from "@/hooks/useClassical";
import { CipherId } from "@/helpers/ciphers/types";

// Mounted on /cipher/[slug] pages so the shared ClassicalProvider (rendered once
// in the root layout) switches to the cipher named by the route on load.
const CipherRouteSync = ({ cipherId }: { cipherId: CipherId }) => {
  const { cipherType, selectCipher } = useClassical();

  useEffect(() => {
    if (cipherType !== cipherId) {
      selectCipher(cipherId);
    }
    // Only sync once, on mount for this route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cipherId]);

  return null;
};

export default CipherRouteSync;
