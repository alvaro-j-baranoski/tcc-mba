import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiscoDialogTipoDeAvaliacaoProps {
    tipoDeAvaliacaoRisco: string;
    setTipoDeAvaliacaoRisco: (value: string) => void;
    disabled: boolean;
}

export default function RiscoDialogTipoDeAvaliacao({
    tipoDeAvaliacaoRisco,
    setTipoDeAvaliacaoRisco,
    disabled,
}: RiscoDialogTipoDeAvaliacaoProps) {
    return (
        <>
            <Label htmlFor="tipo-de-avaliacao-risco">Tipo de Avaliação</Label>
            <Input
                id="tipo-de-avaliacao-risco"
                placeholder="Insira os tipos de avaliação do risco"
                value={tipoDeAvaliacaoRisco}
                onChange={(e) => setTipoDeAvaliacaoRisco(e.target.value)}
                disabled={disabled}
            />
        </>
    );
}
