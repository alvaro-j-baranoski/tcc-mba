import { Badge } from "@/components/ui/badge";
import type { Dano } from "../models/Dano";
import DanosTableDropdownMenu from "./DanosTableDropdownMenu";
import { DeleteDanoDialog } from "./dialogs/DeleteDanoDialog";
import { AddEditDanoDialog } from "./dialogs/AddEditDanoDialog";
import { useContext } from "react";
import { DanosActionsContext } from "../context/DanosActionsContext";

interface DanosTableProps {
    isUserEditor: boolean;
    danos: Dano[];
}

export default function DanosTable({ isUserEditor, danos }: DanosTableProps) {
    const { modalState } = useContext(DanosActionsContext)!;

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {danos.map((dano) => (
                    <div key={dano.id} className="flex items-center">
                        {isUserEditor ? (
                            <DanosTableDropdownMenu dano={dano} />
                        ) : (
                            <Badge variant="secondary">{dano.descricao}</Badge>
                        )}
                    </div>
                ))}
            </div>

            {modalState?.type === "delete" ? <DeleteDanoDialog /> : null}
            {modalState?.type === "add" ? <AddEditDanoDialog type="add" /> : null}
            {modalState?.type === "edit" ? <AddEditDanoDialog type="edit" /> : null}
        </>
    );
}
