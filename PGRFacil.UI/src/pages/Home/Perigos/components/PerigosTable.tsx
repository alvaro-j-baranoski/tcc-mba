import { Badge } from "@/components/ui/badge";
import type { Perigo } from "../models/Perigo";
import PerigosTableDropdownMenu from "./PerigosTableDropdownMenu";
import { DeletePerigoDialog } from "./dialogs/DeletePerigoDialog";
import { AddEditPerigoDialog } from "./dialogs/AddEditPerigoDialog";
import { useContext } from "react";
import { PerigosActionsContext } from "../context/PerigosActionsContext";

interface PerigosTableProps {
    isUserEditor: boolean;
    perigos: Perigo[];
}

export default function PerigosTable({ isUserEditor, perigos }: PerigosTableProps) {
    const { modalState } = useContext(PerigosActionsContext)!;

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {perigos.map((perigo) => (
                    <div key={perigo.id} className="flex items-center">
                        {isUserEditor ? (
                            <PerigosTableDropdownMenu perigo={perigo} />
                        ) : (
                            <Badge variant="secondary">{perigo.descricao}</Badge>
                        )}
                    </div>
                ))}
            </div>

            {modalState?.type === "delete" ? <DeletePerigoDialog /> : null}
            {modalState?.type === "add" ? <AddEditPerigoDialog type="add" /> : null}
            {modalState?.type === "edit" ? <AddEditPerigoDialog type="edit" /> : null}
        </>
    );
}