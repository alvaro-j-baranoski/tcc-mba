import { Table } from "@/components/ui/table";
import type { Risco } from "@/pages/Home/Riscos/models/Risco";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import RiscosTableHeader from "./RiscosTableHeader";
import RiscosTableBody from "./RiscosTableBody";
import RiscosTableSkeleton from "./RiscosTableSkeleton";
import { RiscosActionsContext } from "../../context/RiscosActionsContext";
import { useContext } from "react";
import { AddEditRiscoDialog } from "../dialogs/AddEditRiscoDialog";

interface Props {
  isFetching: boolean;
  riscosData?: Risco[] | undefined;
  filters: RiscosFilter;
  onFiltersChange: (filters: RiscosFilter) => void;
}

export default function RiscosTable({
  isFetching,
  riscosData,
  filters,
  onFiltersChange,
}: Props) {
  const { modalState } = useContext(RiscosActionsContext)!;

  return (
    <>
      {isFetching ? (
        <RiscosTableSkeleton />
      ) : (
        <Table>
          <RiscosTableHeader
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
          <RiscosTableBody riscos={riscosData} />
        </Table>
      )}

      {modalState?.type === "add" ? (
        <AddEditRiscoDialog isEdit={false} gheId={""} />
      ) : null}

      {modalState?.type === "edit" ? (
        <AddEditRiscoDialog isEdit={true} gheId={""} />
      ) : null}
      {/* 
        {modalState?.type === "plano" ? (
          <PlanoDeAcaoDialog
            controlledOpen={planoDialogOpen}
            setControlledOpen={setPlanoDialogOpen}
            gheId={""}
            riscoId={targetRisco!.id}
            planoDeAcao={targetRisco!.planoDeAcao}
          />
        ) : null} */}
    </>
  );
}
