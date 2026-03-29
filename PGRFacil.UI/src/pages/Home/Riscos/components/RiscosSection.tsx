import { QueryKeys } from "@/lib/utils";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import { RiscosService } from "@/pages/Home/Riscos/services/RiscosService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import RiscosTable from "./table/RiscosTable";
import { HomeSection } from "../../HomeSection";
import RiscosSectionHeader from "./RiscosSectionHeader";
import {
  RiscosActionsContextProvider,
} from "../context/RiscosActionsContext";

export default function RiscosSection() {

  const [filters, setFilters] = useState<RiscosFilter>({});

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetAllRiscos, filters],
    queryFn: () => RiscosService.getAllRiscos(filters),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <RiscosActionsContextProvider>
      <HomeSection>
        <RiscosSectionHeader />
        <RiscosTable
          isFetching={isFetching}
          riscosData={data?.data.items}
          filters={filters}
          onFiltersChange={setFilters}
        />

      </HomeSection>
    </RiscosActionsContextProvider>
  );
}
