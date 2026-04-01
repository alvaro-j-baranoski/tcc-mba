import { createContext, useCallback, useMemo, useState } from "react";
import type { Dano } from "../models/Dano";

interface ModalType {
    type: "add" | "edit" | "delete";
    dano: Dano | null;
}

export interface DanosActionsContextType {
    modalState: ModalType | null;
    handleModal: (open: boolean, type: ModalType["type"], dano: Dano | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DanosActionsContext = createContext<DanosActionsContextType | null>(null);

export const DanosActionsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = useState<ModalType | null>(null);

    const handleModal = useCallback((open: boolean, type: ModalType["type"], dano: Dano | null) => {
        if (open) {
            return setModalState({ type, dano });
        }

        setModalState(null);
    }, []);

    const memoredDanosContext = useMemo(() => ({ modalState, handleModal }), [modalState, handleModal]);

    return <DanosActionsContext.Provider value={memoredDanosContext}>{children}</DanosActionsContext.Provider>;
};
