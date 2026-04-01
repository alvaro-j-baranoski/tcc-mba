import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddEditPerigoDialog } from "./useAddEditPerigoDialog";

interface AddEditPerigoDialogProps {
    type: "add" | "edit";
}

export function AddEditPerigoDialog({ type }: AddEditPerigoDialogProps) {
    const {
        perigo,
        isModalOpen,
        handleModal,
        handleSubmit,
        descricao,
        setDescricao,
        addIsPending,
        editIsPending,
        handleCloseModal,
    } = useAddEditPerigoDialog({ type });

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, type, perigo || null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {type === "edit" ? "Editar" : "Adicionar"} um {type === "edit" ? "" : "novo"} Perigo
                    </DialogTitle>
                    <DialogDescription>Escolha a descrição do Perigo.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="perigo-descricao">Descrição do Perigo</Label>
                        <Input
                            id="perigo-descricao"
                            placeholder="Insira a descrição do Perigo"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
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
                        <Button type="submit" disabled={addIsPending || editIsPending || !descricao.trim()}>
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
