import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { PerigosActionsContext } from "../../context/PerigosActionsContext";
import { PerigosService } from "../../services/PerigosService";
import { QueryKeys } from "@/lib/utils";

interface UseAddEditPerigoDialogProps {
    type: "add" | "edit";
}

export const useAddEditPerigoDialog = ({ type }: UseAddEditPerigoDialogProps) => {
    const { modalState, handleModal } = useContext(PerigosActionsContext)!;
    const perigo = modalState?.perigo;
    const [descricao, setDescricao] = useState(type === "edit" && perigo ? perigo.descricao : "");
    const queryClient = useQueryClient();

    const handleCloseModal = () => handleModal(false, type, null);

    const handleSuccess = () => {
        handleCloseModal();
        setDescricao("");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetPerigos] });
    };

    const { mutate: addMutate, isPending: addIsPending } = useMutation({
        mutationFn: PerigosService.addPerigo,
        onSuccess: handleSuccess,
    });

    const { mutate: editMutate, isPending: editIsPending } = useMutation({
        mutationFn: PerigosService.editPerigo,
        onSuccess: handleSuccess,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === "edit" && perigo) {
            editMutate({ id: perigo.id, descricao });
        } else {
            addMutate({ descricao });
        }
    };

    const isModalOpen = modalState?.type === type;

    return {
        perigo,
        isModalOpen,
        handleModal,
        handleSubmit,
        descricao,
        setDescricao,
        addIsPending,
        editIsPending,
        handleCloseModal,
    };
};
