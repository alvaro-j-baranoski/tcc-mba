import { useAuth } from "@/hooks/useAuth";
import { QueryKeys } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PerigosService } from "../services/PerigosService";

export const usePerigosSection = () => {
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { isUserEditor } = useAuth();

    const RESULT_LIMIT = 25;

    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [QueryKeys.GetPerigos, debouncedSearch],
        queryFn: ({ pageParam }) => {
            if (pageParam) {
                return PerigosService.getByNextLink(pageParam);
            }
            return PerigosService.getPerigos(debouncedSearch || undefined, RESULT_LIMIT);
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.data["@nextLink"] ?? undefined,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const perigos = data?.pages.flatMap((page) => page.data.items) || [];

    return {
        isFetching,
        isFetchingNextPage,
        isUserEditor,
        setDebouncedSearch,
        perigos,
        hasNextPage,
        fetchNextPage,
    };
};
