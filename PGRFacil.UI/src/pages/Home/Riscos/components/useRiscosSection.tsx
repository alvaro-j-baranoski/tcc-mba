import { useState, useContext } from "react";
import type { RiscosFilter } from "../models/RiscosFilter";
import { QueryKeys } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GheSelectedContext } from "../../Ghe/context/GheSelectedContext";
import { RiscosService } from "../services/RiscosService";

export const useRiscosSection = () => {
    const RESULT_LIMIT = 10;
    const [filters, setFilters] = useState<RiscosFilter>({});
    const { activeGhe: ghe } = useContext(GheSelectedContext)!;

    const getRiscosQueryFn = (pageParam?: string) => {
        if (pageParam) {
            return RiscosService.getByNextLink(pageParam, ghe?.id, ghe?.nome);
        }
        const filtersWithLimit = { ...filters, limit: RESULT_LIMIT };
        if (ghe) {
            return RiscosService.getRiscos(ghe.id, ghe.nome, filtersWithLimit);
        }
        return RiscosService.getAllRiscos(filtersWithLimit);
    };

    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [QueryKeys.GetAllRiscos, ghe?.id, filters],
        queryFn: ({ pageParam }) => getRiscosQueryFn(pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.data["@nextLink"] ?? undefined,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const riscos = data?.pages.flatMap((page) => page.data.items);

    return {
        isFetching,
        riscos,
        filters,
        setFilters,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};
