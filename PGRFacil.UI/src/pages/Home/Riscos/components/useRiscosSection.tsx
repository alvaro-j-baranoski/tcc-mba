import { useState, useContext } from "react";
import type { RiscosFilter } from "../models/RiscosFilter";
import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { GheSelectedContext } from "../../Ghe/context/GheSelectedContext";
import { RiscosService } from "../services/RiscosService";

export const useRiscosSection = () => {
  const RESULT_LIMIT = 10;
  const [filters, setFilters] = useState<RiscosFilter>({});
  const { activeGhe: ghe } = useContext(GheSelectedContext)!;

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetAllRiscos, ghe?.id, filters],
    queryFn: () => {
      const filtersWithLimit = { ...filters, limit: RESULT_LIMIT };
      if (ghe) {
        return RiscosService.getRiscos(ghe.id, ghe.nome, filtersWithLimit);
      } else {
        return RiscosService.getAllRiscos(filtersWithLimit);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const riscos = data?.data.items;

  return {
    isFetching,
    riscos,
    filters,
    setFilters,
  };
};
