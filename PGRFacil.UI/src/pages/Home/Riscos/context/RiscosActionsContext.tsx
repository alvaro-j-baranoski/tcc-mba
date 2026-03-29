import { createContext, useCallback, useMemo, useState } from "react";
import type { Risco } from "../models/Risco";

interface ModalType {
  type: "add" | "edit" | "delete";
  risco: Risco | null;
}

export interface RiscosActionsContextType {
  modalState: ModalType | null;
  handleModal: (open: boolean, type: ModalType["type"], risco: Risco | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const RiscosActionsContext =
  createContext<RiscosActionsContextType | null>(null);

export const RiscosActionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalState, setModalState] = useState<ModalType | null>(null);

  const handleModal = useCallback((open: boolean, type: ModalType["type"], risco: Risco | null) => {
    if (open) {
      return setModalState({ type, risco });
    }

    setModalState(null);
  }, []);
  
  const memoredRiscosContext = useMemo(
    () => ({ modalState, handleModal }),
    [modalState, handleModal],
  );

  return (
    <RiscosActionsContext.Provider value={memoredRiscosContext}>
      {children}
    </RiscosActionsContext.Provider>
  );
};
