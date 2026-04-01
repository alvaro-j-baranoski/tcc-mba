import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteDanoDialog } from "./useDeleteDanoDialog";

export function DeleteDanoDialog() {
    
    const { dano, isModalOpen, handleModal, handleDeleteButtonPressed } = useDeleteDanoDialog();
  
    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, "delete", dano!)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Dano</DialogTitle>
                    <DialogDescription>
                        Você tem certeza que deseja excluir o Dano "{dano?.descricao}"?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDeleteButtonPressed}>
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
