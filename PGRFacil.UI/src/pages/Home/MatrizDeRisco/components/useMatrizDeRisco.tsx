import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RelatoriosService } from "../services/RelatoriosService";
import { useContext } from "react";
import { GheSelectedContext } from "../../Ghe/context/GheSelectedContext";

export const useMatrizDeRisco = () => {
    const { activeGhe } = useContext(GheSelectedContext)!;

    const getMatrizDeRiscoQueryFn = () => {
        if (activeGhe) {
            return RelatoriosService.getMatrizDeRiscoByGhe(activeGhe.id);
        }
        return RelatoriosService.getMatrizDeRisco();
    };

    const { data: reportData, isFetching } = useQuery({
        queryKey: [QueryKeys.GetMatrizDeRisco, activeGhe?.id],
        queryFn: getMatrizDeRiscoQueryFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const data = reportData?.data;

    return { data, isFetching };
};
