import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useVersaoDialogAddForm } from "./useVersaoDialogAddForm";

interface Props {
    gheId: string;
    onSuccess: () => void;
}

export default function VersaoDialogAddForm({ gheId, onSuccess }: Props) {
    const { versao, setVersao, observacoes, setObservacoes, isPending, isVersaoValid, handleSubmit } =
        useVersaoDialogAddForm(gheId, onSuccess);

    return (
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
    );
}
