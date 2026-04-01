import { useContext } from "react";
import { DanosActionsContext } from "../context/DanosActionsContext";

export const useDanosSectionHeader = () => {
    const { handleModal } = useContext(DanosActionsContext)!;
    const openModal = () => handleModal(true, "add", null);
    return { openModal };
}