import type { QueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./utils";

export function invalidateQueriesForUpdatesOnRisco(
  queryClient: QueryClient,
  programaGuid: string
) {
  queryClient.invalidateQueries({ queryKey: [QueryKeys.GetMatrizDeRisco] });
  queryClient.invalidateQueries({ queryKey: [QueryKeys.GetProgramas] });
  queryClient.invalidateQueries({
    queryKey: [QueryKeys.GetRiscos(programaGuid)],
  });
  queryClient.invalidateQueries({
    queryKey: [QueryKeys.GetProgramaByID(programaGuid)],
  });
}
