import { QueryKeys } from "@/lib/utils";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import { RiscosService } from "@/pages/Home/Riscos/services/RiscosService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import RiscosTable from "./table/RiscosTable";
import { AddEditRiscoDialog } from "./dialogs/AddEditRiscoDialog";
import { HomeSection } from "../../HomeSection";
import RiscosSectionHeader from "./RiscosSectionHeader";
import { PlanoDeAcaoDialog } from "./dialogs/AddEditPlanoDeAcaoDialog";

export default function RiscosSection() {
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);
  const [planoDialogOpen, setPlanoDialogOpen] = useState(false);
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
      <RiscosTable
        isFetching={isFetching}
        riscosData={data?.data.items}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {addDialogControlledOpen ? (
        <AddEditRiscoDialog
          controlledOpen={addDialogControlledOpen}
          setControlledOpen={setAddDialogControlledOpen}
          isEdit={false}
          gheId={""}
        />
      ) : null}

      {editDialogControlledOpen ? (
        <AddEditRiscoDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          gheId={""}
          risco={undefined}
        />
      ) : null}

      {planoDialogOpen ? (
        <PlanoDeAcaoDialog
          controlledOpen={planoDialogOpen}
          setControlledOpen={setPlanoDialogOpen}
          gheId={""}
          riscoId={""}
          planoDeAcao={undefined}
        />
      ) : null}

    </HomeSection>
  );
}
