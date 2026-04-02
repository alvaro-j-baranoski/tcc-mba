import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VersaoService } from "../../../services/VersaoService";
import { toast } from "sonner";

const VERSAO_REGEX = /^\d+\.\d+$/;

export const useVersaoDialogAddForm = (gheId: string, onSuccess: () => void) => {
    const [versao, setVersao] = useState("");
    const [observacoes, setObservacoes] = useState("");

    const { mutate, isPending } = useMutation({
        mutationFn: () => VersaoService.addVersao(gheId, { versao, observacoes }),
        onSuccess: () => {
            setVersao("");
            setObservacoes("");
            onSuccess();
            toast.success("Versão adicionada com sucesso!");
        },
    });

    const isVersaoValid = VERSAO_REGEX.test(versao);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isVersaoValid) return;
        mutate();
    };

    return {
        versao,
        setVersao,
        observacoes,
        setObservacoes,
        isPending,
        isVersaoValid,
        handleSubmit,
    };
};
