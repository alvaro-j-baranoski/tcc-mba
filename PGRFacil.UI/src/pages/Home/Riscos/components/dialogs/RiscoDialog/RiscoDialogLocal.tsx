import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiscoDialogLocalProps {
    localRisco: string;
    setLocalRisco: (value: string) => void;
    disabled: boolean;
}

export default function RiscoDialogLocal({ localRisco, setLocalRisco, disabled }: RiscoDialogLocalProps) {
    return (
        <>
            <Label htmlFor="local-risco">Local</Label>
            <Input
                id="local-risco"
                placeholder="Insira o local do risco"
                value={localRisco}
                onChange={(e) => setLocalRisco(e.target.value)}
                disabled={disabled}
            />
        </>
    );
}
