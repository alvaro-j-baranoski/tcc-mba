import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { RiscosActionsContext } from "../context/RiscosActionsContext";

export const useRiscosSectionHeader = () => {
    const { isUserEditor } = useAuth();
    const { handleModal } = useContext(RiscosActionsContext)!;
    const openModal = () => handleModal(true, "add", null);

    return { isUserEditor, openModal };
};
