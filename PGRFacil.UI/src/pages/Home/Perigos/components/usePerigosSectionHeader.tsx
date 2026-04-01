import { useContext } from "react";
import { PerigosActionsContext } from "../context/PerigosActionsContext";

export const usePerigosSectionHeader = () => {
    const { handleModal } = useContext(PerigosActionsContext)!;
    const openModal = () => handleModal(true, "add", null);
    return { openModal };
};
