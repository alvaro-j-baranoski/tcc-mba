import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PerigosService } from "../../services/PerigosService";
import { useContext } from "react";
import { PerigosActionsContext } from "../../context/PerigosActionsContext";
import { QueryKeys } from "@/lib/utils";

export const useDeletePerigoDialog = () => {
    const { modalState, handleModal } = useContext(PerigosActionsContext)!;
    const perigo = modalState?.perigo;
    const isModalOpen = modalState?.type === "delete";
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        handleModal(false, "delete", null);
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetPerigos] });
    };

    const { mutate } = useMutation({
        mutationFn: PerigosService.deletePerigo,
        onSuccess: handleSuccess,
    });

    const handleDeleteButtonPressed = () => {
        if (perigo?.id) {
            mutate(perigo.id);
        }
    };

    return { perigo, isModalOpen, handleModal, handleDeleteButtonPressed };
};
