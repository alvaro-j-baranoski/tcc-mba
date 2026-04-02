import { QueryKeys } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { VersaoService } from "../../../services/VersaoService";
import { useState } from "react";
import { toast } from "sonner";
import type { Versao } from "../../../models/Versao";

const VERSAO_REGEX = /^\d+\.\d+$/;

interface EditingState {
    id: number;
    versao: string;
    observacoes: string;
}

export const useVersaoDialogTable = (gheId: string) => {
    const queryClient = useQueryClient();
    const [editing, setEditing] = useState<EditingState | null>(null);

    const { data, isFetching } = useQuery({
        queryKey: QueryKeys.GetVersoes(gheId),
        queryFn: () => VersaoService.getVersoes(gheId),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const handleInvalidate = () => {
        queryClient.invalidateQueries({ queryKey: QueryKeys.GetVersoes(gheId) });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
    };

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: (versaoId: number) => VersaoService.deleteVersao(gheId, String(versaoId)),
        onSuccess: () => {
            handleInvalidate();
            toast.success("Versão excluída com sucesso!");
        },
    });

    const { mutate: editMutate, isPending: isEditing } = useMutation({
        mutationFn: (edited: EditingState) =>
            VersaoService.editVersao(gheId, String(edited.id), {
                versao: edited.versao,
                observacoes: edited.observacoes,
            }),
        onSuccess: () => {
            setEditing(null);
            handleInvalidate();
            toast.success("Versão editada com sucesso!");
        },
    });

    const handleStartEdit = (v: Versao) => {
        setEditing({ id: v.id, versao: v.versao, observacoes: v.observacoes });
    };

    const handleCancelEdit = () => setEditing(null);

    const handleSaveEdit = () => {
        if (!editing || !VERSAO_REGEX.test(editing.versao)) return;
        editMutate(editing);
    };

    const isEditVersaoValid = editing ? VERSAO_REGEX.test(editing.versao) : false;
    const isMutating = isDeleting || isEditing;

    return {
        versoes: data?.data,
        isFetching,
        editing,
        setEditing,
        isEditing,
        isDeleting,
        isMutating,
        isEditVersaoValid,
        handleStartEdit,
        handleCancelEdit,
        handleSaveEdit,
        deleteMutate,
        handleInvalidate,
    };
};
