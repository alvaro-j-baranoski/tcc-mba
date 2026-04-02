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
import { Trash2Icon } from "lucide-react";

const VERSAO_REGEX = /^\d+\.\d+$/;

interface Props {
    gheId: string;
}

export default function VersaoDialogTable({ gheId }: Props) {
    const queryClient = useQueryClient();
    const [versao, setVersao] = useState("");
    const [observacoes, setObservacoes] = useState("");

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!VERSAO_REGEX.test(versao)) return;
        mutate();
    };

    const isVersaoValid = VERSAO_REGEX.test(versao);

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
                        <TableHead><strong>Versão</strong></TableHead>
                        <TableHead><strong>Observações</strong></TableHead>
                        <TableHead><strong>Data de Criação</strong></TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100">
                    {versoes?.map((v) => (
                        <TableRow key={v.id} className="hover:bg-gray-100 transition-colors">
                            <TableCell>{v.versao}</TableCell>
                            <TableCell>{v.observacoes}</TableCell>
                            <TableCell>{new Date(v.dataCriacao).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    disabled={isDeleting}
                                    onClick={() => deleteMutate(v.id)}
                                    aria-label="Excluir versão"
                                >
                                    <Trash2Icon className="size-4 text-destructive" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
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
