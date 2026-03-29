import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiscoDialogGheProps {
    type: "add" | "edit";
    setGheId: (value: string | null) => void;
    gheName: string | null;
}

export default function RiscoDialogGhe({ type, setGheId, gheName }: RiscoDialogGheProps) {
    return (
        <>
            <Label>GHE</Label>
            {type === "add" ? (
                <p className="text-sm text-muted-foreground">O GHE será atribuído automaticamente ao criar o risco.</p>
            ) : (
                <Input value={gheName || ""} disabled />
            )}
        </>
    );
}
