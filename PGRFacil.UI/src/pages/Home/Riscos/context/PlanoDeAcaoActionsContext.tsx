import { createContext, useCallback, useMemo, useState } from "react";
import type { PlanoDeAcao } from "../models/PlanoDeAcao";

interface ModalState {
  open: boolean;
  planoDeAcao: PlanoDeAcao | null;
  riscoId: string | null;
}

export interface PlanoDeAcaoActionsContextType {
  modalState: ModalState | null;
  handleModal: (open: boolean, planoDeAcao: PlanoDeAcao | null, riscoId: string | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PlanoDeAcaoActionsContext =
  createContext<PlanoDeAcaoActionsContextType | null>(null);

export const PlanoDeAcaoActionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const handleModal = useCallback((open: boolean, planoDeAcao: PlanoDeAcao | null, riscoId: string | null) => {    
    if (open) {
      setModalState({ open, planoDeAcao, riscoId });
    } else {
      setModalState({ open, planoDeAcao: null, riscoId: null } );
    }
  }, []);
  
  const memoredPlanoDeAcaoContext = useMemo(
    () => ({ modalState, handleModal }),
    [modalState, handleModal],
  );

  return (
    <PlanoDeAcaoActionsContext.Provider value={memoredPlanoDeAcaoContext}>
      {children}
    </PlanoDeAcaoActionsContext.Provider>
  );
};
