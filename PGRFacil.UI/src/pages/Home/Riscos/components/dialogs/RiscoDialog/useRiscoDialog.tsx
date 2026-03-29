import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { QueryKeys } from "@/lib/utils";
import type { Dano } from "@/pages/Home/Danos/models/Dano";
import { DanosService } from "@/pages/Home/Danos/services/DanosService";
import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import { PerigosService } from "@/pages/Home/Perigos/services/PerigosService";
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

    const [perigoSearch, setPerigoSearch] = useState("");
    const [debouncedPerigoSearch, setDebouncedPerigoSearch] = useState("");
    const [perigoPopoverOpen, setPerigoPopoverOpen] = useState(false);

    const [danoSearch, setDanoSearch] = useState("");
    const [debouncedDanoSearch, setDebouncedDanoSearch] = useState("");
    const [danoPopoverOpen, setDanoPopoverOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedPerigoSearch(perigoSearch), 300);
        return () => clearTimeout(timer);
    }, [perigoSearch]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedDanoSearch(danoSearch), 300);
        return () => clearTimeout(timer);
    }, [danoSearch]);

    const { data: perigosData } = useQuery({
        queryKey: [QueryKeys.GetPerigos, debouncedPerigoSearch],
        queryFn: () => PerigosService.getPerigos(debouncedPerigoSearch || undefined),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const { data: danosData } = useQuery({
        queryKey: [QueryKeys.GetDanos, debouncedDanoSearch],
        queryFn: () => DanosService.getDanos(debouncedDanoSearch || undefined),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const availablePerigos = (perigosData?.data?.items || []).filter((p) => !selectedPerigos.some((sp) => sp.id === p.id));

    const availableDanos = (danosData?.data?.items || []).filter((d) => !selectedDanos.some((sd) => sd.id === d.id));

    const handleSelectPerigo = (perigo: Perigo) => {
        setSelectedPerigos((prev) => [...prev, perigo]);
        setPerigoSearch("");
    };

    const handleRemovePerigo = (perigoId: string) => {
        setSelectedPerigos((prev) => prev.filter((p) => p.id !== perigoId));
    };

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
        handleRemovePerigo,
        perigoPopoverOpen,
        setPerigoPopoverOpen,
        perigoSearch,
        setPerigoSearch,
        availablePerigos,
        handleSelectPerigo,
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
