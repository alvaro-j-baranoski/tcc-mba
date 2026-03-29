import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RiscoDialogHeaderProps {
    type: "add" | "edit";
}

export default function RiscoDialogHeader({ type }: RiscoDialogHeaderProps) {
    return (
        <DialogHeader>
            <DialogTitle>
                {type === "edit" ? "Editar" : "Adicionar"}
                um {type === "edit" ? "" : "novo"} risco
            </DialogTitle>
            <DialogDescription>Preencha os campos do risco.</DialogDescription>
        </DialogHeader>
    );
}
