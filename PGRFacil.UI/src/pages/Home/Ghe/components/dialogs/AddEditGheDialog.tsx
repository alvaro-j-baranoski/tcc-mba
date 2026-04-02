import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddEditGheDialog } from "./useAddEditGheDialog";

interface AddEditGheDialogProps {
    type: "add" | "edit";
}

export function AddEditGheDialog({ type }: AddEditGheDialogProps) {
    const {
        isModalOpen,
        handleModal,
        ghe,
        handleSubmit,
        gheName,
        setGheName,
        addIsPending,
        editIsPending,
        handleCloseModal,
    } = useAddEditGheDialog({ type });

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, type, ghe || null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {type === "edit" ? "Editar" : "Adicionar"} um {type === "edit" ? "" : "novo"} GHE
                    </DialogTitle>
                    <DialogDescription>Escolha o nome do GHE.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ghe-name">Nome do GHE</Label>
                        <Input
                            id="ghe-name"
                            placeholder="Insira o nome do GHE"
                            value={gheName}
                            onChange={(e) => setGheName(e.target.value)}
                            disabled={addIsPending || editIsPending}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                            disabled={addIsPending || editIsPending}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={addIsPending || editIsPending || !gheName.trim()}>
                            {addIsPending || editIsPending
                                ? type === "edit"
                                    ? "Editando..."
                                    : "Criando..."
                                : type === "edit"
                                  ? "Editar"
                                  : "Criar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
