import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CheckIcon, XIcon } from "lucide-react";
import type { Versao } from "../../../models/Versao";

interface EditingState {
    id: number;
    versao: string;
    observacoes: string;
}

interface Props {
    versao: Versao;
    editing: EditingState;
    isEditing: boolean;
    isEditVersaoValid: boolean;
    onEditChange: (editing: EditingState) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function VersaoDialogTableEditRow({
    versao,
    editing,
    isEditing,
    isEditVersaoValid,
    onEditChange,
    onSave,
    onCancel,
}: Props) {
    return (
        <TableRow key={versao.id}>
            <TableCell>
                <Input
                    value={editing.versao}
                    onChange={(e) => onEditChange({ ...editing, versao: e.target.value })}
                    disabled={isEditing}
                    className="w-24"
                    aria-invalid={editing.versao.length > 0 && !isEditVersaoValid}
                />
            </TableCell>
            <TableCell>
                <Textarea
                    value={editing.observacoes}
                    onChange={(e) => onEditChange({ ...editing, observacoes: e.target.value })}
                    disabled={isEditing}
                    className="min-h-9"
                />
            </TableCell>
            <TableCell>{new Date(versao.dataCriacao).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={isEditing || !isEditVersaoValid}
                        onClick={onSave}
                        aria-label="Salvar edição"
                    >
                        <CheckIcon className="size-4 text-green-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={isEditing}
                        onClick={onCancel}
                        aria-label="Cancelar edição"
                    >
                        <XIcon className="size-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
