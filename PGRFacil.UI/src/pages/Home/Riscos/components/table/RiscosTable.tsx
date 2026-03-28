import { Table } from "@/components/ui/table";
import type { Risco } from "@/pages/Home/Riscos/models/Risco";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import RiscosTableHeader from "./RiscosTableHeader";
import RiscosTableBody from "./RiscosTableBody";
import RiscosTableSkeleton from "./RiscosTableSkeleton";

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
  // const [targetRisco, setTargetRisco] = useState<Risco | null>(null);
  // const queryClient = useQueryClient();

  // const handleOnEditButtonPressed = (risco: Risco) => {
  //   setTargetRisco(risco);
  //   setEditDialogControlledOpen(true);
  // };

  // const handleOnDeleteButtonPressed = (risco: Risco) => {
  //   deleteMutate({ gheId: gheId ?? "", riscoId: risco.id });
  // };

  // const handleOnAddPlanoPressed = (risco: Risco) => {
  //   setTargetRisco(risco);
  //   setPlanoDialogOpen(true);
  // };

  // const handleOnDeleteSuccess = () => {
  //   invalidateQueriesForUpdatesOnRisco(queryClient, gheId!);
  // };

  // const { mutate: deleteMutate } = useMutation({
  //   mutationFn: RiscosService.deleteRisco,
  //   onSuccess: handleOnDeleteSuccess,
  // });

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
    </>
  );
}
