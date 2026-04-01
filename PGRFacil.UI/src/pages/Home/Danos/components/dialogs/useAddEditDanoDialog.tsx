import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { DanosActionsContext } from "../../context/DanosActionsContext";
import { DanosService } from "../../services/DanosService";
import { QueryKeys } from "@/lib/utils";

interface UseAddEditDanoDialogProps {
    type: "add" | "edit";
}

export const useAddEditDanoDialog = ({ type }: UseAddEditDanoDialogProps) => {
    const { modalState, handleModal } = useContext(DanosActionsContext)!;
    const dano = modalState?.dano;
    const [descricao, setDescricao] = useState(type === "edit" && dano ? dano.descricao : "");
    const queryClient = useQueryClient();

    const handleCloseModal = () => handleModal(false, type, null);

    const handleSuccess = () => {
        handleCloseModal();
        setDescricao("");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDanos] });
    };

    const { mutate: addMutate, isPending: addIsPending } = useMutation({
        mutationFn: DanosService.addDano,
        onSuccess: handleSuccess,
    });

    const { mutate: editMutate, isPending: editIsPending } = useMutation({
        mutationFn: DanosService.editDano,
        onSuccess: handleSuccess,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type === "edit" && dano) {
            editMutate({ id: dano.id, descricao });
        } else {
            addMutate({ descricao });
        }
    };

    const isModalOpen = modalState?.type === type;

    return { dano, isModalOpen, handleModal, handleSubmit, descricao, setDescricao, addIsPending, editIsPending, handleCloseModal };
}