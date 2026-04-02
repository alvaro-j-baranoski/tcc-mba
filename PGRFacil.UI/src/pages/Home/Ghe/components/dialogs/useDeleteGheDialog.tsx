import { QueryKeys } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GheService } from "../../services/GheService";
import { useContext } from "react";
import { GheActionsContext } from "../../context/GheActionsContext";

export const useDeleteGheDialog = () => {
    const { modalState, handleModal } = useContext(GheActionsContext)!;
    const ghe = modalState?.ghe;
    const isModalOpen = modalState?.type === "delete";
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        handleModal(false, "delete", null);
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
    };

    const { mutate } = useMutation({
        mutationFn: GheService.deleteGhe,
        onSuccess: handleSuccess,
    });

    const handleDeleteButtonPressed = () => {
        if (ghe?.id) mutate(ghe.id);
    };

    return { ghe, isModalOpen, handleModal, handleDeleteButtonPressed };
};
