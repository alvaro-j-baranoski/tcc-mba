import { QueryKeys } from "@/lib/utils";
import type { Dano } from "@/pages/Home/Danos/models/Dano";
import { DanosService } from "@/pages/Home/Danos/services/DanosService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseRiscoDialogDanosProps {
    selectedDanos: Dano[];
    setSelectedDanos: React.Dispatch<React.SetStateAction<Dano[]>>;
}

export const useRiscoDialogDanos = ({ selectedDanos, setSelectedDanos }: UseRiscoDialogDanosProps) => {
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

    const handleSelectDano = (dano: Dano) => {
        setSelectedDanos((prev) => [...prev, dano]);
        setDanoSearch("");
    };

    const handleRemoveDano = (danoId: string) => {
        setSelectedDanos((prev) => prev.filter((d) => d.id !== danoId));
    };

    const availableDanos = (danosData?.data?.items || []).filter(
        (d) => !selectedDanos.some((sd) => sd.id === d.id),
    );

    return {
        handleSelectDano,
        handleRemoveDano,
        danoSearch,
        setDanoSearch,
        debouncedDanoSearch,
        setDebouncedDanoSearch,
        danoPopoverOpen,
        setDanoPopoverOpen,
        availableDanos,
    };
};
