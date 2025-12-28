import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Programa } from "@/models/Programa";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProgramasService } from "@/services/ProgramasService";

interface Props {
    controlledOpen: boolean;
    setControlledOpen: Dispatch<SetStateAction<boolean>>;
    programa: Programa;
}

export function DeleteProgramaDialog({controlledOpen, setControlledOpen, programa} : Props) {
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        setControlledOpen(false);
        queryClient.invalidateQueries({ queryKey: ["programas"] });
    }

    const { mutate } = useMutation({
        mutationFn: ProgramasService.deletePrograma, 
        onSuccess: handleSuccess
    })

    const handleDeleteButtonPressed = () => {
        mutate(programa.guid);
    }

    return (
        <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
            <DialogTrigger asChild>
                <button className="text-red-600 underline">Deletar</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deletar Programa</DialogTitle>
                    <DialogDescription>
                        Você tem certeza que deseja excluir o programa {programa.nome}?
                        Todos os riscos associados com esse programa também serão excluídos.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDeleteButtonPressed}>Deletar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}