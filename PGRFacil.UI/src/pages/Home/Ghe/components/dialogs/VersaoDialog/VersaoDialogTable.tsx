import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { QueryKeys } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { VersaoService } from "../../../services/VersaoService";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, PencilIcon, Trash2Icon, XIcon } from "lucide-react";
import type { Versao } from "../../../models/Versao";

const VERSAO_REGEX = /^\d+\.\d+$/;

interface Props {
    gheId: string;
}

interface EditingState {
    id: number;
    versao: string;
    observacoes: string;
}

export default function VersaoDialogTable({ gheId }: Props) {
    const queryClient = useQueryClient();
    const [versao, setVersao] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [editing, setEditing] = useState<EditingState | null>(null);

    const { data, isFetching } = useQuery({
        queryKey: QueryKeys.GetVersoes(gheId),
        queryFn: () => VersaoService.getVersoes(gheId),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const handleInvalidate = () => {
        queryClient.invalidateQueries({ queryKey: QueryKeys.GetVersoes(gheId) });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
    };

    const { mutate, isPending } = useMutation({
        mutationFn: () => VersaoService.addVersao(gheId, { versao, observacoes }),
        onSuccess: () => {
            setVersao("");
            setObservacoes("");
            handleInvalidate();
            toast.success("Versão adicionada com sucesso!");
        },
    });

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: (versaoId: number) => VersaoService.deleteVersao(gheId, String(versaoId)),
        onSuccess: () => {
            handleInvalidate();
            toast.success("Versão excluída com sucesso!");
        },
    });

    const { mutate: editMutate, isPending: isEditing } = useMutation({
        mutationFn: (edited: EditingState) =>
            VersaoService.editVersao(gheId, String(edited.id), {
                versao: edited.versao,
                observacoes: edited.observacoes,
            }),
        onSuccess: () => {
            setEditing(null);
            handleInvalidate();
            toast.success("Versão editada com sucesso!");
        },
    });

    const handleStartEdit = (v: Versao) => {
        setEditing({ id: v.id, versao: v.versao, observacoes: v.observacoes });
    };

    const handleCancelEdit = () => setEditing(null);

    const handleSaveEdit = () => {
        if (!editing || !VERSAO_REGEX.test(editing.versao)) return;
        editMutate(editing);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!VERSAO_REGEX.test(versao)) return;
        mutate();
    };

    const isVersaoValid = VERSAO_REGEX.test(versao);
    const isEditVersaoValid = editing ? VERSAO_REGEX.test(editing.versao) : false;
    const isMutating = isPending || isDeleting || isEditing;

    if (isFetching) {
        return (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        );
    }

    const versoes = data?.data;

    return (
        <>
            <Table className="w-full text-left border-collapse">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <strong>Versão</strong>
                        </TableHead>
                        <TableHead>
                            <strong>Observações</strong>
                        </TableHead>
                        <TableHead>
                            <strong>Data de Criação</strong>
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100">
                    {versoes?.map((v) =>
                        editing?.id === v.id ? (
                            <TableRow key={v.id}>
                                <TableCell>
                                    <Input
                                        value={editing.versao}
                                        onChange={(e) => setEditing({ ...editing, versao: e.target.value })}
                                        disabled={isEditing}
                                        className="w-24"
                                        aria-invalid={editing.versao.length > 0 && !isEditVersaoValid}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={editing.observacoes}
                                        onChange={(e) => setEditing({ ...editing, observacoes: e.target.value })}
                                        disabled={isEditing}
                                        className="min-h-9"
                                    />
                                </TableCell>
                                <TableCell>{new Date(v.dataCriacao).toLocaleDateString("pt-BR")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={isEditing || !isEditVersaoValid}
                                            onClick={handleSaveEdit}
                                            aria-label="Salvar edição"
                                        >
                                            <CheckIcon className="size-4 text-green-600" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={isEditing}
                                            onClick={handleCancelEdit}
                                            aria-label="Cancelar edição"
                                        >
                                            <XIcon className="size-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
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
                                            onClick={() => handleStartEdit(v)}
                                            aria-label="Editar versão"
                                        >
                                            <PencilIcon className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            disabled={isMutating}
                                            onClick={() => deleteMutate(v.id)}
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
            </Table>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <p className="text-sm font-medium">Adicionar nova versão</p>
                <div className="flex gap-2 items-start">
                    <Input
                        placeholder="Ex: 2.0"
                        value={versao}
                        onChange={(e) => setVersao(e.target.value)}
                        disabled={isPending}
                        className="w-24 shrink-0"
                        aria-invalid={versao.length > 0 && !isVersaoValid}
                    />
                    <Textarea
                        placeholder="Observações (opcional)"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        disabled={isPending}
                        className="min-h-9"
                    />
                </div>
                {versao.length > 0 && !isVersaoValid && (
                    <p className="text-sm text-destructive">Formato inválido. Use o formato "X.Y" (ex: 2.0, 12.2).</p>
                )}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending || !isVersaoValid}>
                        {isPending ? "Adicionando..." : "Adicionar"}
                    </Button>
                </div>
            </form>
        </>
    );
}
