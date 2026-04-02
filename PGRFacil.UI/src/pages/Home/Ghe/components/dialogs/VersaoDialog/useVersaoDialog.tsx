import { useContext } from "react";
import { GheActionsContext } from "../../../context/GheActionsContext";

export const useVersaoDialog = () => {
    const { modalState, handleModal } = useContext(GheActionsContext)!;
    const ghe = modalState?.ghe;
    const isModalOpen = modalState?.type === "versao";

    return { ghe, isModalOpen, handleModal };
};
