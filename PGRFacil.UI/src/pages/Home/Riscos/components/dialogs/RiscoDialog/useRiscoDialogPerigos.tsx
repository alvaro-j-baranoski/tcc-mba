import { QueryKeys } from "@/lib/utils";
import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import { PerigosService } from "@/pages/Home/Perigos/services/PerigosService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseRiscoDialogPerigosProps {
    selectedPerigos: Perigo[];
    setSelectedPerigos: React.Dispatch<React.SetStateAction<Perigo[]>>;
}

export const useRiscoDialogPerigos = ({ selectedPerigos, setSelectedPerigos }: UseRiscoDialogPerigosProps) => {
    const [perigoSearch, setPerigoSearch] = useState("");
    const [debouncedPerigoSearch, setDebouncedPerigoSearch] = useState("");
    const [perigoPopoverOpen, setPerigoPopoverOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedPerigoSearch(perigoSearch), 300);
        return () => clearTimeout(timer);
    }, [perigoSearch]);

    const { data: perigosData } = useQuery({
        queryKey: [QueryKeys.GetPerigos, debouncedPerigoSearch],
        queryFn: () => PerigosService.getPerigos(debouncedPerigoSearch || undefined),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const handleSelectPerigo = (perigo: Perigo) => {
        setSelectedPerigos((prev) => [...prev, perigo]);
        setPerigoSearch("");
    };

    const handleRemovePerigo = (perigoId: string) => {
        setSelectedPerigos((prev) => prev.filter((p) => p.id !== perigoId));
    };
    
    const availablePerigos = (perigosData?.data?.items || []).filter(
        (p) => !selectedPerigos.some((sp) => sp.id === p.id),
    );

    return {
        handleSelectPerigo,
        handleRemovePerigo,
        perigoSearch,
        setPerigoSearch,
        debouncedPerigoSearch,
        setDebouncedPerigoSearch,
        perigoPopoverOpen,
        setPerigoPopoverOpen,
        availablePerigos,
    };
};
