import { QueryKeys } from "@/lib/utils";
import type { Ghe } from "@/pages/Home/Ghe/models/Ghe";
import { GheService } from "@/pages/Home/Ghe/services/GheService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface RiscoDialogGheProps {
    setGheId: (value: string | null) => void;
}

export const useRiscoDialogGhe = ({ setGheId }: RiscoDialogGheProps) => {
    const [selectedGheName, setSelectedGheName] = useState<string | null>(null);
    const [ghePopoverOpen, setGhePopoverOpen] = useState(false);

    const { data } = useQuery({
        queryKey: [QueryKeys.GetGhes],
        queryFn: GheService.getGhes,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const availableGhes = data?.data || [];

    const handleSelectGhe = (ghe: Ghe) => {
        setGheId(ghe.id);
        setSelectedGheName(ghe.nome);
        setGhePopoverOpen(false);
    };

    return { ghePopoverOpen, setGhePopoverOpen, availableGhes, handleSelectGhe, selectedGheName };
};
