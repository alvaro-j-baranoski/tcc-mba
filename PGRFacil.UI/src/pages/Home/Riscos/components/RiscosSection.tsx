import { QueryKeys } from "@/lib/utils";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import { RiscosService } from "@/pages/Home/Riscos/services/RiscosService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RiscosTable from "./table/RiscosTable";
import { AddEditRiscoDialog } from "./dialogs/AddEditRiscoDialog";
import { HomeSection } from "../../HomeSection";
import RiscosSectionHeader from "./RiscosSectionHeader";

export default function RiscosSection() {
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [filters, setFilters] = useState<RiscosFilter>({});

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetAllRiscos, filters],
    queryFn: () => RiscosService.getAllRiscos(filters),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <HomeSection>
      <RiscosSectionHeader />

      {!isFetching ? (
        <RiscosTable
          riscosData={data?.data.items}
          filters={filters}
          onFiltersChange={setFilters}
        />
      ) : (
        <Skeleton
          count={10}
          height={40}
          wrapper={({ children }) => <div className="mb-4">{children}</div>}
        />
      )}

      {addDialogControlledOpen ? (
        <AddEditRiscoDialog
          controlledOpen={addDialogControlledOpen}
          setControlledOpen={setAddDialogControlledOpen}
          isEdit={false}
          gheId={""}
        />
      ) : null}
    </HomeSection>
  );
}
