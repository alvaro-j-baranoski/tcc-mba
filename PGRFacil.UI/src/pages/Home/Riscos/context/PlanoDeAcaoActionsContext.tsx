import { createContext, useCallback, useMemo, useState } from "react";
import type { PlanoDeAcao } from "../models/PlanoDeAcao";
import type { Risco } from "../models/Risco";

interface ModalState {
    open: boolean;
    planoDeAcao: PlanoDeAcao | null;
    risco: Risco | null;
}

export interface PlanoDeAcaoActionsContextType {
    modalState: ModalState | null;
    handleModal: (open: boolean, planoDeAcao: PlanoDeAcao | null, risco: Risco | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PlanoDeAcaoActionsContext = createContext<PlanoDeAcaoActionsContextType | null>(null);

export const PlanoDeAcaoActionsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = useState<ModalState | null>(null);

    const handleModal = useCallback((open: boolean, planoDeAcao: PlanoDeAcao | null, risco: Risco | null) => {
        if (open) {
            setModalState({ open, planoDeAcao, risco });
        } else {
            setModalState({ open, planoDeAcao: null, risco: null });
        }
    }, []);

    const memoredPlanoDeAcaoContext = useMemo(() => ({ modalState, handleModal }), [modalState, handleModal]);

    return (
        <PlanoDeAcaoActionsContext.Provider value={memoredPlanoDeAcaoContext}>
            {children}
        </PlanoDeAcaoActionsContext.Provider>
    );
};
