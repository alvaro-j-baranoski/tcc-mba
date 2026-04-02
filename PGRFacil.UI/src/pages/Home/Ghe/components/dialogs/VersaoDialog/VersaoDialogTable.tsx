import { Table } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { useVersaoDialogTable } from "./useVersaoDialogTable";
import VersaoDialogTableHeader from "./VersaoDialogTableHeader";
import VersaoDialogTableBody from "./VersaoDialogTableBody";
import VersaoDialogAddForm from "./VersaoDialogAddForm";

interface Props {
    gheId: string;
}

export default function VersaoDialogTable({ gheId }: Props) {
    const {
        versoes,
        isFetching,
        editing,
        setEditing,
        isEditing,
        isEditVersaoValid,
        isMutating,
        handleStartEdit,
        handleCancelEdit,
        handleSaveEdit,
        deleteMutate,
        handleInvalidate,
    } = useVersaoDialogTable(gheId);

    if (isFetching) {
        return (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <Table className="w-full text-left border-collapse">
                <VersaoDialogTableHeader />
                <VersaoDialogTableBody
                    versoes={versoes}
                    editing={editing}
                    isEditing={isEditing}
                    isEditVersaoValid={isEditVersaoValid}
                    isMutating={isMutating}
                    onEditChange={setEditing}
                    onStartEdit={handleStartEdit}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                    onDelete={deleteMutate}
                />
            </Table>

            <VersaoDialogAddForm gheId={gheId} onSuccess={handleInvalidate} />
        </>
    );
}
