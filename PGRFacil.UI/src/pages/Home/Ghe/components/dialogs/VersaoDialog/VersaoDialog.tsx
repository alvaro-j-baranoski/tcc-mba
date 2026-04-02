import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useVersaoDialog } from "./useVersaoDialog";

export default function VersaoDialog() {
    const { isModalOpen, handleModal, ghe } = useVersaoDialog();

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, "versao", null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gerenciar Versões</DialogTitle>
                    <DialogDescription>Gerenciar versões para o GHE {ghe?.nome}.</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
