import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RelatoriosService } from "../services/RelatoriosService";

export const useMatrizDeRisco = () => {
    const { data: reportData, isFetching } = useQuery({
        queryKey: [QueryKeys.GetMatrizDeRisco],
        queryFn: RelatoriosService.getMatrizDeRisco,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const data = reportData?.data;

    return { data, isFetching };
};
