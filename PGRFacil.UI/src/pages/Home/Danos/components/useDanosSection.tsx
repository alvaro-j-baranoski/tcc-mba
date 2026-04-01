import { useAuth } from "@/hooks/useAuth";
import { QueryKeys } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DanosService } from "../services/DanosService";

export const useDanosSection = () => {
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { isUserEditor } = useAuth();

    const RESULT_LIMIT = 25;

    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [QueryKeys.GetDanos, debouncedSearch],
        queryFn: ({ pageParam }) => {
            if (pageParam) {
                return DanosService.getByNextLink(pageParam);
            }
            return DanosService.getDanos(debouncedSearch || undefined, RESULT_LIMIT);
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.data["@nextLink"] ?? undefined,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const danos = data?.pages.flatMap((page) => page.data.items) || [];

    return {
        isFetching,
        isFetchingNextPage,
        isUserEditor,
        setDebouncedSearch,
        danos,
        hasNextPage,
        fetchNextPage,
    };
};
