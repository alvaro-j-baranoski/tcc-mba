import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { PlanoDeAcaoService } from "@/pages/Home/Riscos/services/PlanoDeAcaoService";
import type { PlanoDeAcao } from "@/pages/Home/Riscos/models/PlanoDeAcao";

function toLocalDatetimeString(utcString: string): string {
  const date = new Date(utcString);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  gheId: string;
  riscoId: string;
  planoDeAcao?: PlanoDeAcao;
}

export function PlanoDeAcaoDialog({
  controlledOpen,
  setControlledOpen,
  gheId,
  riscoId,
  planoDeAcao,
}: Props) {
  const isEdit = !!planoDeAcao;

  const [responsavel, setResponsavel] = useState(
    isEdit ? planoDeAcao.responsavel : ""
  );
  const [dataInicio, setDataInicio] = useState(
    isEdit ? toLocalDatetimeString(planoDeAcao.dataInicio) : ""
  );
  const [dataConclusao, setDataConclusao] = useState(
    isEdit ? toLocalDatetimeString(planoDeAcao.dataConclusao) : ""
  );
  const [descricao, setDescricao] = useState(
    isEdit ? planoDeAcao.descricao : ""
  );

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    invalidateQueriesForUpdatesOnRisco(queryClient, gheId);
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: PlanoDeAcaoService.addPlanoDeAcao,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: PlanoDeAcaoService.editPlanoDeAcao,
    onSuccess: handleSuccess,
  });

  const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: PlanoDeAcaoService.deletePlanoDeAcao,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      responsavel,
      dataInicio: new Date(dataInicio).toISOString(),
      dataConclusao: new Date(dataConclusao).toISOString(),
      descricao,
    };
    if (isEdit) {
      editMutate({ gheId, riscoId, payload });
    } else {
      addMutate({ gheId, riscoId, payload });
    }
  };

  const handleDelete = () => {
    deleteMutate({ gheId, riscoId });
  };

  const isPending = addIsPending || editIsPending || deleteIsPending;

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar" : "Adicionar"} Plano de Ação
          </DialogTitle>
          <DialogDescription>
            Preencha os campos do plano de ação.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input
              id="responsavel"
              placeholder="Insira o responsável"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              disabled={isPending}
            />
            <Label htmlFor="data-inicio">Data de Início</Label>
            <Input
              id="data-inicio"
              type="datetime-local"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              disabled={isPending}
            />
            <Label htmlFor="data-conclusao">Data de Conclusão</Label>
            <Input
              id="data-conclusao"
              type="datetime-local"
              value={dataConclusao}
              onChange={(e) => setDataConclusao(e.target.value)}
              disabled={isPending}
            />
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Insira a descrição do plano de ação"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between">
            {isEdit && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                {deleteIsPending ? "Excluindo..." : "Excluir"}
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => setControlledOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && !deleteIsPending
                  ? isEdit
                    ? "Editando..."
                    : "Criando..."
                  : isEdit
                  ? "Editar"
                  : "Criar"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
