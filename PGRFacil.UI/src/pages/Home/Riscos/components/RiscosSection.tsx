import { QueryKeys } from "@/lib/utils";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import { RiscosService } from "@/pages/Home/Riscos/services/RiscosService";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import RiscosTable from "./table/RiscosTable";
import { HomeSection } from "../../HomeSection";
import RiscosSectionHeader from "./RiscosSectionHeader";
import { RiscosActionsContextProvider } from "../context/RiscosActionsContext";
import { PlanoDeAcaoActionsContextProvider } from "../context/PlanoDeAcaoActionsContext";
import { GheSelectedContext } from "../../Ghe/context/GheSelectedContext";

export default function RiscosSection() {
  const [filters, setFilters] = useState<RiscosFilter>({});

  const { activeGhe: ghe } = useContext(GheSelectedContext)!;

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetAllRiscos, ghe?.id, filters],
    queryFn: () => {
      console.log(ghe);
      if (ghe) {
        return RiscosService.getRiscos(ghe.id, filters);
      } else {
        return RiscosService.getAllRiscos(filters);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <RiscosActionsContextProvider>
      <PlanoDeAcaoActionsContextProvider>
        <HomeSection>
          <RiscosSectionHeader />
          <RiscosTable
            isFetching={isFetching}
            riscosData={data?.data.items}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </HomeSection>
      </PlanoDeAcaoActionsContextProvider>
    </RiscosActionsContextProvider>
  );
}
