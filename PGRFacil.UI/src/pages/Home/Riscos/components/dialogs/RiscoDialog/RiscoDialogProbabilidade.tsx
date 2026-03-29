import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiscoDialogProbabilidadeProps {
    probabilidadeRisco: number;
    setProbabilidadeRisco: (value: number) => void;
    disabled: boolean;
}

export default function RiscoDialogProbabilidade({
    probabilidadeRisco,
    setProbabilidadeRisco,
    disabled,
}: RiscoDialogProbabilidadeProps) {
    return (
        <>
            <Label htmlFor="probabilidade-risco">Probabilidade</Label>
            <Input
                id="probabilidade-risco"
                type="number"
                placeholder="Insira a probabilidade do risco"
                value={probabilidadeRisco}
                onChange={(e) => setProbabilidadeRisco(Number(e.target.value))}
                disabled={disabled}
            />
        </>
    );
}
