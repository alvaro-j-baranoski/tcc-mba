import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DanosService } from "../../services/DanosService";
import { useContext } from "react";
import { DanosActionsContext } from "../../context/DanosActionsContext";
import { QueryKeys } from "@/lib/utils";

export const useDeleteDanoDialog = () => {
    const { modalState, handleModal } = useContext(DanosActionsContext)!;
    const dano = modalState?.dano;
    const isModalOpen = modalState?.type === "delete";
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        handleModal(false, "delete", null);
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDanos] });
    };

    const { mutate } = useMutation({
        mutationFn: DanosService.deleteDano,
        onSuccess: handleSuccess,
    });

    const handleDeleteButtonPressed = () => {
        if (dano?.id) {
            mutate(dano.id);
        }
    };

    return { dano, isModalOpen, handleModal, handleDeleteButtonPressed };
};
