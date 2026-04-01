import { useContext } from "react"
import { DanosActionsContext } from "../context/DanosActionsContext";
import type { Dano } from "../models/Dano";

export const useDanosTableDropdownMenu = () => {
    const { handleModal } = useContext(DanosActionsContext)!;

    const handleOnEditButtonPressed = (dano: Dano) => {
        handleModal(true, "edit", dano);
    };

    const handleOnDeleteButtonPressed = (dano: Dano) => {
        handleModal(true, "delete", dano);
    };

    return { handleOnEditButtonPressed, handleOnDeleteButtonPressed };
}