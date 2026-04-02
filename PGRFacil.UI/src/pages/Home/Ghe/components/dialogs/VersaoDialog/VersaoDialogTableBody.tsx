import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import type { Versao } from "../../../models/Versao";
import VersaoDialogTableEditRow from "./VersaoDialogTableEditRow";

interface EditingState {
    id: number;
    versao: string;
    observacoes: string;
}

interface Props {
    versoes: Versao[] | undefined;
    editing: EditingState | null;
    isEditing: boolean;
    isEditVersaoValid: boolean;
    isMutating: boolean;
    onEditChange: (editing: EditingState) => void;
    onStartEdit: (v: Versao) => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: (versaoId: number) => void;
}

export default function VersaoDialogTableBody({
    versoes,
    editing,
    isEditing,
    isEditVersaoValid,
    isMutating,
    onEditChange,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onDelete,
}: Props) {
    return (
        <TableBody className="divide-y divide-gray-100">
            {versoes?.map((v) =>
                editing?.id === v.id ? (
                    <VersaoDialogTableEditRow
                        key={v.id}
                        versao={v}
                        editing={editing}
                        isEditing={isEditing}
                        isEditVersaoValid={isEditVersaoValid}
                        onEditChange={onEditChange}
                        onSave={onSaveEdit}
                        onCancel={onCancelEdit}
                    />
                ) : (
                    <TableRow key={v.id} className="hover:bg-gray-100 transition-colors">
                        <TableCell>{v.versao}</TableCell>
                        <TableCell className="whitespace-pre-line">{v.observacoes}</TableCell>
                        <TableCell>{new Date(v.dataCriacao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    disabled={isMutating}
                                    onClick={() => onStartEdit(v)}
                                    aria-label="Editar versão"
                                >
                                    <PencilIcon className="size-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    disabled={isMutating}
                                    onClick={() => onDelete(v.id)}
                                    aria-label="Excluir versão"
                                >
                                    <Trash2Icon className="size-4 text-destructive" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ),
            )}
            {!versoes?.length && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhuma versão encontrada.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
}
