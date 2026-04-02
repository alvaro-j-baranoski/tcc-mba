import { createContext, useCallback, useMemo, useState } from "react";
import type { Ghe } from "../models/Ghe";

interface ModalType {
    type: "add" | "edit" | "delete" | "versao";
    ghe: Ghe | null;
}

export interface GheActionsContextType {
    modalState: ModalType | null;
    handleModal: (open: boolean, type: ModalType["type"], ghe: Ghe | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GheActionsContext = createContext<GheActionsContextType | null>(null);

export const GheActionsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = useState<ModalType | null>(null);

    const handleModal = useCallback((open: boolean, type: ModalType["type"], ghe: Ghe | null) => {
        if (open) {
            return setModalState({ type, ghe });
        }

        setModalState(null);
    }, []);

    const memoizedGheContext = useMemo(() => ({ modalState, handleModal }), [modalState, handleModal]);

    return <GheActionsContext.Provider value={memoizedGheContext}>{children}</GheActionsContext.Provider>;
};
