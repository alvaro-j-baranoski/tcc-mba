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
import { useDeleteGheDialog } from "./useDeleteGheDialog";

export function DeleteGheDialog() {
    const { isModalOpen, handleModal, ghe, handleDeleteButtonPressed } = useDeleteGheDialog();

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, "delete", ghe!)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir GHE</DialogTitle>
                    <DialogDescription>
                        Você tem certeza que deseja excluir o GHE {ghe?.nome}? Todos os riscos associados com esse GHE
                        também serão excluídos.
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
