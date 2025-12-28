import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProgramasService } from "@/services/ProgramasService";

export function AddNewProgramaDialog() {
  const [open, setOpen] = useState(false);
  const [programaName, setProgramaName] = useState("");

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setOpen(false);
    setProgramaName("");
    queryClient.invalidateQueries({ queryKey: ["programas"] });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ProgramasService.addNewPrograma,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ nome: programaName });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um novo programa</DialogTitle>
          <DialogDescription>
            Escolha o nome do novo programa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="programa-name">Nome do programa</Label>
            <Input
              id="programa-name"
              placeholder="Insira o nome do programa"
              value={programaName}
              onChange={(e) => setProgramaName(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || !programaName.trim()}>
              {isPending ? "Criando..." : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
