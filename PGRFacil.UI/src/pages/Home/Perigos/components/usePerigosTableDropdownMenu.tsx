import { useContext } from "react";
import { PerigosActionsContext } from "../context/PerigosActionsContext";
import type { Perigo } from "../models/Perigo";

export const usePerigosTableDropdownMenu = () => {
    const { handleModal } = useContext(PerigosActionsContext)!;

    const handleOnEditButtonPressed = (perigo: Perigo) => {
        handleModal(true, "edit", perigo);
    };

    const handleOnDeleteButtonPressed = (perigo: Perigo) => {
        handleModal(true, "delete", perigo);
    };

    return { handleOnEditButtonPressed, handleOnDeleteButtonPressed };
};
