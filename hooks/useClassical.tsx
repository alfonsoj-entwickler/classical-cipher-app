import { useContext } from "react";
import { CeaserContext, ClassicalContextValue } from "@/context/ClassicalProvider";

const useClassical = (): ClassicalContextValue => {
  const context = useContext(CeaserContext);
  if (!context) {
    throw new Error("useClassical must be used within a ClassicalProvider");
  }
  return context;
};

export default useClassical;
