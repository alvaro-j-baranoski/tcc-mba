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
import { useDeletePerigoDialog } from "./useDeletePerigoDialog";

export function DeletePerigoDialog() {
    const { perigo, isModalOpen, handleModal, handleDeleteButtonPressed } = useDeletePerigoDialog();

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, "delete", perigo!)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Perigo</DialogTitle>
                    <DialogDescription>
                        Você tem certeza que deseja excluir o Perigo "{perigo?.descricao}"?
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
