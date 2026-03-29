import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiscoDialogAtividadesProps {
    atividadesRisco: string;
    setAtividadesRisco: (value: string) => void;
    disabled: boolean;
}

export default function RiscoDialogAtividades({
    atividadesRisco,
    setAtividadesRisco,
    disabled,
}: RiscoDialogAtividadesProps) {
    return (
        <>
            <Label htmlFor="atividades-risco">Atividades</Label>
            <Input
                id="atividades-risco"
                placeholder="Insira as atividades do risco"
                value={atividadesRisco}
                onChange={(e) => setAtividadesRisco(e.target.value)}
                disabled={disabled}
            />
        </>
    );
}
