import { useContext, useState } from "react";
import { GheActionsContext } from "../../context/GheActionsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/utils";
import { GheService } from "../../services/GheService";

interface UseAddEditGheDialogProps {
    type: "add" | "edit";
}

export const useAddEditGheDialog = ({ type }: UseAddEditGheDialogProps) => {
    const { modalState, handleModal } = useContext(GheActionsContext)!;
    const ghe = modalState?.ghe;
    const isEdit = type === "edit";
    const [gheName, setGheName] = useState(isEdit && ghe ? ghe.nome : "");
    const queryClient = useQueryClient();

    const handleCloseModal = () => handleModal(false, type, null);

    const handleSuccess = () => {
        handleCloseModal();
        setGheName("");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
    };

    const { mutate: addMutate, isPending: addIsPending } = useMutation({
        mutationFn: GheService.addGhe,
        onSuccess: handleSuccess,
    });

    const { mutate: editMutate, isPending: editIsPending } = useMutation({
        mutationFn: GheService.editGhe,
        onSuccess: handleSuccess,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && ghe) {
            editMutate({ id: ghe.id, nome: gheName });
        } else {
            addMutate({ nome: gheName });
        }
    };

    const isModalOpen = modalState?.type === type;

    return {
        ghe,
        isModalOpen,
        handleModal,
        handleSubmit,
        gheName,
        setGheName,
        addIsPending,
        editIsPending,
        handleCloseModal,
    };
};
