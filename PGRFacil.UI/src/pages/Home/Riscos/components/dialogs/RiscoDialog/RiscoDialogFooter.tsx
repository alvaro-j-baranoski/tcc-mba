import { Button } from "@/components/ui/button";

interface RiscoDialogFooterProps {
    type: "add" | "edit";
    handleCloseModal: () => void;
    disabled: boolean;
}

export default function RiscoDialogFooter({ type, handleCloseModal, disabled }: RiscoDialogFooterProps) {
    return (
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCloseModal} disabled={disabled}>
                Cancelar
            </Button>
            <Button type="submit" disabled={disabled}>
                {disabled
                    ? type === "edit"
                        ? "Editando..."
                        : "Criando..."
                    : type === "edit"
                      ? "Editar"
                      : "Criar"}
            </Button>
        </div>
    );
}
