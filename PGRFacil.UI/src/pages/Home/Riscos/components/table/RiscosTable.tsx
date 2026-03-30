import { Table } from "@/components/ui/table";
import type { Risco } from "@/pages/Home/Riscos/models/Risco";
import type { RiscosFilter } from "@/pages/Home/Riscos/models/RiscosFilter";
import RiscosTableHeader from "./header/RiscosTableHeader";
import RiscosTableBody from "./body/RiscosTableBody";
import RiscosTableSkeleton from "./RiscosTableSkeleton";
import { RiscosActionsContext } from "../../context/RiscosActionsContext";
import { useContext } from "react";
import { RiscoDialog } from "../dialogs/RiscoDialog/RiscoDialog";
import { PlanoDeAcaoDialog } from "../dialogs/PlanoDeAcaoDialog/AddEditPlanoDeAcaoDialog";
import { PlanoDeAcaoActionsContext } from "../../context/PlanoDeAcaoActionsContext";
import { RiscosTableLoadMoreButton } from "./RiscosTableLoadMoreButton";

interface Props {
    isFetching: boolean;
    riscosData?: Risco[] | undefined;
    filters: RiscosFilter;
    onFiltersChange: (filters: RiscosFilter) => void;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}

export default function RiscosTable({
    isFetching,
    riscosData,
    filters,
    onFiltersChange,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}: Props) {
    const { modalState } = useContext(RiscosActionsContext)!;
    const { modalState: planoDeAcaoModalState } = useContext(PlanoDeAcaoActionsContext)!;

    return (
        <>
            {isFetching && !isFetchingNextPage ? (
                <RiscosTableSkeleton />
            ) : (
                <>
                    <Table>
                        <RiscosTableHeader filters={filters} onFiltersChange={onFiltersChange} />
                        <RiscosTableBody riscos={riscosData} />
                    </Table>
                    {hasNextPage && (
                        <RiscosTableLoadMoreButton
                            onClick={fetchNextPage}
                            disabled={isFetchingNextPage}
                            loading={isFetchingNextPage}
                        />
                    )}
                </>
            )}

            {modalState?.type === "add" ? <RiscoDialog type={"add"} gheId={null} gheName={null} /> : null}

            {modalState?.type === "edit" ? (
                <RiscoDialog
                    type={"edit"}
                    gheId={modalState.risco?.gheId || null}
                    gheName={modalState.risco?.gheNome || null}
                />
            ) : null}

            {planoDeAcaoModalState?.open ? <PlanoDeAcaoDialog /> : null}
        </>
    );
}
