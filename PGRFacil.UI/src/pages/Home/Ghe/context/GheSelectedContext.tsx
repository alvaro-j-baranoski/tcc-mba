import { createContext, useCallback, useMemo, useState } from "react";
import type { Ghe } from "../models/Ghe";

export interface GheSelectedContextType {
    activeGhe: Ghe | null;
    setActiveGhe: (ghe: Ghe | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GheSelectedContext = createContext<GheSelectedContextType | null>(null);

export const GheSelectedContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ghe, setGhe] = useState<Ghe | null>(null);

    const setActiveGhe = useCallback((ghe: Ghe | null) => {
        setGhe(ghe);
    }, []);

    const memoredGheContext = useMemo(() => ({ activeGhe: ghe, setActiveGhe }), [ghe, setActiveGhe]);

    return <GheSelectedContext.Provider value={memoredGheContext}>{children}</GheSelectedContext.Provider>;
};
