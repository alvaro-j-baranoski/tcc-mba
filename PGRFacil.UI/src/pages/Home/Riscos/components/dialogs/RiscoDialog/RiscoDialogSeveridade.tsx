import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiscoDialogSeveridadeProps {
    severidadeRisco: number;
    setSeveridadeRisco: (value: number) => void;
    disabled: boolean;
}

export default function RiscoDialogSeveridade({
    severidadeRisco,
    setSeveridadeRisco,
    disabled,
}: RiscoDialogSeveridadeProps) {
    return (
        <>
            <Label htmlFor="severidade-risco">Severidade</Label>
            <Input
                id="severidade-risco"
                type="number"
                placeholder="Insira a severidade do risco"
                value={severidadeRisco}
                onChange={(e) => setSeveridadeRisco(Number(e.target.value))}
                disabled={disabled}
            />
        </>
    );
}
