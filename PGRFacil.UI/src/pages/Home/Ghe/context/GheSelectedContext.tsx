import { createContext, useMemo, useState } from "react";
import type { Ghe } from "../models/Ghe";

export interface GheSelectedContextType {
  ghe: Ghe | null;
  setGhe: (ghe: Ghe | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GheSelectedContext = createContext<GheSelectedContextType | null>(
  null,
);

export const GheSelectedContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ghe, setGhe] = useState<Ghe | null>(null);

  const memoredGheContext = useMemo(() => ({ ghe, setGhe }), [ghe, setGhe]);

  return (
    <GheSelectedContext.Provider value={memoredGheContext}>
      {children}
    </GheSelectedContext.Provider>
  );
};
