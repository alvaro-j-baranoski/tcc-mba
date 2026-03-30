import type { QueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./utils";

export function invalidateQueriesForUpdatesOnRisco(queryClient: QueryClient, gheId: string) {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetMatrizDeRisco] });
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
    queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetRiscos(gheId)],
    });
    queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetGheByID(gheId)],
    });
    queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetAllRiscos],
    });
}
