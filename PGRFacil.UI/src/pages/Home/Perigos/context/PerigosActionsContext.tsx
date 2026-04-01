import { createContext, useCallback, useMemo, useState } from "react";
import type { Perigo } from "../models/Perigo";

interface ModalType {
    type: "add" | "edit" | "delete";
    perigo: Perigo | null;
}

export interface PerigosActionsContextType {
    modalState: ModalType | null;
    handleModal: (open: boolean, type: ModalType["type"], perigo: Perigo | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PerigosActionsContext = createContext<PerigosActionsContextType | null>(null);

export const PerigosActionsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = useState<ModalType | null>(null);

    const handleModal = useCallback((open: boolean, type: ModalType["type"], perigo: Perigo | null) => {
        if (open) {
            return setModalState({ type, perigo });
        }

        setModalState(null);
    }, []);

    const memoizedPerigosContext = useMemo(() => ({ modalState, handleModal }), [modalState, handleModal]);

    return <PerigosActionsContext.Provider value={memoizedPerigosContext}>{children}</PerigosActionsContext.Provider>;
};
