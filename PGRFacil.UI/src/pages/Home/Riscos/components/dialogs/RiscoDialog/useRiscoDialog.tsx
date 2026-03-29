import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { QueryKeys } from "@/lib/utils";
import type { Dano } from "@/pages/Home/Danos/models/Dano";
import { DanosService } from "@/pages/Home/Danos/services/DanosService";
import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import { RiscosService } from "@/pages/Home/Riscos/services/RiscosService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { RiscosActionsContext } from "../../../context/RiscosActionsContext";

interface useRiscoDialogProps {
    type: "add" | "edit";
    gheId: string;
}

export const useRiscoDialog = ({ type, gheId }: useRiscoDialogProps) => {
    const { modalState, handleModal } = useContext(RiscosActionsContext)!;
    const risco = modalState?.risco;
    const isEdit = type === "edit";

    const [localRisco, setLocalRisco] = useState(isEdit && risco ? risco.local : "");
    const [atividadesRisco, setAtividadesRisco] = useState(isEdit && risco ? risco.atividades : "");
    const [selectedPerigos, setSelectedPerigos] = useState<Perigo[]>(isEdit && risco ? risco.perigos : []);
    const [selectedDanos, setSelectedDanos] = useState<Dano[]>(isEdit && risco ? risco.danos : []);
    const [agentesDeRisco, setAgentesDeRisco] = useState(isEdit && risco ? risco.agentes : 0);
    const [tipoDeAvaliacaoRisco, setTipoDeAvaliacaoRisco] = useState(isEdit && risco ? risco.tipoDeAvaliacao : "");
    const [severidadeRisco, setSeveridadeRisco] = useState(isEdit && risco ? risco.severidade : 0);
    const [probabilidadeRisco, setProbabilidadeRisco] = useState(isEdit && risco ? risco.probabilidade : 0);

    const [danoSearch, setDanoSearch] = useState("");
    const [debouncedDanoSearch, setDebouncedDanoSearch] = useState("");
    const [danoPopoverOpen, setDanoPopoverOpen] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => setDebouncedDanoSearch(danoSearch), 300);
        return () => clearTimeout(timer);
    }, [danoSearch]);


    const { data: danosData } = useQuery({
        queryKey: [QueryKeys.GetDanos, debouncedDanoSearch],
        queryFn: () => DanosService.getDanos(debouncedDanoSearch || undefined),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const availableDanos = (danosData?.data?.items || []).filter((d) => !selectedDanos.some((sd) => sd.id === d.id));

    const handleSelectDano = (dano: Dano) => {
        setSelectedDanos((prev) => [...prev, dano]);
        setDanoSearch("");
    };

    const handleRemoveDano = (danoId: string) => {
        setSelectedDanos((prev) => prev.filter((d) => d.id !== danoId));
    };

    const queryClient = useQueryClient();

    const handleCloseModal = () => handleModal(false, isEdit ? "edit" : "add", null);

    const handleSuccess = () => {
        handleCloseModal();
        setLocalRisco("");
        invalidateQueriesForUpdatesOnRisco(queryClient, gheId);
    };

    const { mutate: addMutate, isPending: addIsPending } = useMutation({
        mutationFn: RiscosService.addRisco,
        onSuccess: handleSuccess,
    });

    const { mutate: editMutate, isPending: editIsPending } = useMutation({
        mutationFn: RiscosService.editRisco,
        onSuccess: handleSuccess,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            local: localRisco,
            atividades: atividadesRisco,
            perigoIds: selectedPerigos.map((p) => p.id),
            danoIds: selectedDanos.map((d) => d.id),
            agentes: agentesDeRisco,
            tipoDeAvaliacao: tipoDeAvaliacaoRisco,
            severidade: severidadeRisco,
            probabilidade: probabilidadeRisco,
        };
        if (isEdit && risco) {
            editMutate({
                gheId: gheId,
                riscoId: risco.id,
                payload,
            });
        } else {
            addMutate({
                gheId: gheId,
                payload,
            });
        }
    };

    const isModalOpen = modalState?.type === (isEdit ? "edit" : "add");

    return {
        handleSubmit,
        localRisco,
        setLocalRisco,
        atividadesRisco,
        setAtividadesRisco,
        selectedPerigos,
        setSelectedPerigos,
        selectedDanos,
        handleRemoveDano,
        danoPopoverOpen,
        setDanoPopoverOpen,
        danoSearch,
        setDanoSearch,
        availableDanos,
        handleSelectDano,
        agentesDeRisco,
        setAgentesDeRisco,
        tipoDeAvaliacaoRisco,
        setTipoDeAvaliacaoRisco,
        severidadeRisco,
        setSeveridadeRisco,
        probabilidadeRisco,
        setProbabilidadeRisco,
        addIsPending,
        editIsPending,
        handleModal,
        isModalOpen,
        handleCloseModal,
        risco,
    };
};
