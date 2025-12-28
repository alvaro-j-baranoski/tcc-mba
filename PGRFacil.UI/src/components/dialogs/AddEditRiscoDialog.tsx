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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Risco } from "@/models/Risco";
import { RiscosService } from "@/services/RiscosService";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  risco?: Risco;
  programaGuid: string;
}

export function AddEditRiscoDialog({
  controlledOpen,
  setControlledOpen,
  isEdit,
  risco,
  programaGuid,
}: Props) {
  const [localRisco, setLocalRisco] = useState(
    isEdit && risco ? risco.local : ""
  );
  const [atividadesRisco, setAtividadesRisco] = useState(
    isEdit && risco ? risco.atividades : ""
  );
  const [perigosRisco, setPerigosRisco] = useState(
    isEdit && risco ? risco.perigos : ""
  );
  const [danosRisco, setDanosRisco] = useState(
    isEdit && risco ? risco.danos : ""
  );
  const [agentesDeRisco, setAgentesDeRisco] = useState(
    isEdit && risco ? risco.agentesDeRisco : 0
  );
  const [tipoDeAvaliacaoRisco, setTipoDeAvaliacaoRisco] = useState(
    isEdit && risco ? risco.tipoDeAvaliacao : ""
  );
  const [severidadeRisco, setSeveridadeRisco] = useState(
    isEdit && risco ? risco.severidade : 0
  );
  const [probabilidadeRisco, setProbabilidadeRisco] = useState(
    isEdit && risco ? risco.probabilidade : 0
  );

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    setLocalRisco("");
    queryClient.invalidateQueries({ queryKey: ["Riscos"] });
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: RiscosService.addRisco,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: RiscosService.editRisco,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && risco) {
      editMutate({
        programaGuid: programaGuid,
        riscoGuid: risco.guid,
        payload: {
          local: localRisco,
          atividades: atividadesRisco,
          perigos: perigosRisco,
          danos: danosRisco,
          agentesDeRisco: agentesDeRisco,
          tipoDeAvaliacao: tipoDeAvaliacaoRisco,
          severidade: severidadeRisco,
          probabilidade: probabilidadeRisco,
        },
      });
    } else {
      addMutate({
        programaGuid: programaGuid,
        payload: {
          local: localRisco,
          atividades: atividadesRisco,
          perigos: perigosRisco,
          danos: danosRisco,
          agentesDeRisco: agentesDeRisco,
          tipoDeAvaliacao: tipoDeAvaliacaoRisco,
          severidade: severidadeRisco,
          probabilidade: probabilidadeRisco,
        },
      });
    }
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar" : "Adicionar"} um {isEdit ? "" : "novo"} risco
          </DialogTitle>
          <DialogDescription>Preencha os campos do risco.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="local-risco">Local</Label>
            <Input
              id="local-risco"
              placeholder="Insira o local do risco"
              value={localRisco}
              onChange={(e) => setLocalRisco(e.target.value)}
              disabled={addIsPending || editIsPending}
            />
            <Label htmlFor="atividades-risco">Atividades</Label>
            <Input
              id="atividades-risco"
              placeholder="Insira as atividades do risco"
              value={atividadesRisco}
              onChange={(e) => setAtividadesRisco(e.target.value)}
              disabled={addIsPending || editIsPending}
            />
            <Label htmlFor="perigos-risco">Perigos</Label>
            <Input
              id="perigos-risco"
              placeholder="Insira os perigos do risco"
              value={perigosRisco}
              onChange={(e) => setPerigosRisco(e.target.value)}
              disabled={addIsPending || editIsPending}
            />
            <Label htmlFor="danos-risco">Danos</Label>
            <Input
              id="danos-risco"
              placeholder="Insira os danos do risco"
              value={danosRisco}
              onChange={(e) => setDanosRisco(e.target.value)}
              disabled={addIsPending || editIsPending}
            />

            <Label htmlFor="agentes-de-risco">Agentes</Label>
            <RadioGroup
              id="agentes-de-risco"
              defaultValue={"" + agentesDeRisco}
              onValueChange={(value) => setAgentesDeRisco(Number(value))}
              className="grid grid-cols-2 gap-2"
            >
              {AgentesDeRisco.map((agente) => {
                return (
                  <div key={agente.key} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={"" + agente.key}
                      id={agente.value + agente.key}
                    />
                    <Label htmlFor={agente.value + agente.key}>{agente.value}</Label>
                  </div>
                );
              })}
            </RadioGroup>

            <Label htmlFor="tipo-de-avaliacao-risco">Tipo de Avaliação</Label>
            <Input
              id="tipo-de-avaliacao-risco"
              placeholder="Insira os tipos de avaliação do risco"
              value={tipoDeAvaliacaoRisco}
              onChange={(e) => setTipoDeAvaliacaoRisco(e.target.value)}
              disabled={addIsPending || editIsPending}
            />
            <Label htmlFor="severidade-risco">Severidade</Label>
            <Input
              id="severidade-risco"
              type="number"
              placeholder="Insira a severidade do risco"
              value={severidadeRisco}
              onChange={(e) => setSeveridadeRisco(Number(e.target.value))}
              disabled={addIsPending || editIsPending}
            />
            <Label htmlFor="probabilidade-risco">Probabilidade</Label>
            <Input
              id="probabilidade-risco"
              type="number"
              placeholder="Insira a probabilidade do risco"
              value={probabilidadeRisco}
              onChange={(e) => setProbabilidadeRisco(Number(e.target.value))}
              disabled={addIsPending || editIsPending}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setControlledOpen(false)}
              disabled={addIsPending || editIsPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={addIsPending || editIsPending}>
              {addIsPending || editIsPending
                ? isEdit
                  ? "Editando..."
                  : "Criando..."
                : isEdit
                ? "Editar"
                : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
