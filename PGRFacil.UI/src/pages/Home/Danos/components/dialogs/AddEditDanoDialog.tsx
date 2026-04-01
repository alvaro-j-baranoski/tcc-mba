import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddEditDanoDialog } from "./useAddEditDanoDialog";

interface AddEditDanoDialogProps {
    type: "add" | "edit";
}

export function AddEditDanoDialog({ type }: AddEditDanoDialogProps) {
    const {
        dano,
        isModalOpen,
        handleModal,
        handleSubmit,
        descricao,
        setDescricao,
        addIsPending,
        editIsPending,
        handleCloseModal,
    } = useAddEditDanoDialog({ type });

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, type, dano || null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {type === "edit" ? "Editar" : "Adicionar"} um {type === "edit" ? "" : "novo"} Dano
                    </DialogTitle>
                    <DialogDescription>Escolha a descrição do Dano.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="dano-descricao">Descrição do Dano</Label>
                        <Input
                            id="dano-descricao"
                            placeholder="Insira a descrição do Dano"
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
