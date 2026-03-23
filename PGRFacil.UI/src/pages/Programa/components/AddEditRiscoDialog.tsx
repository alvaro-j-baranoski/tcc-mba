import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Risco } from "@/pages/Programa/models/Risco";
import { RiscosService } from "@/pages/Programa/services/RiscosService";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PerigosService } from "@/pages/Home/Perigos/services/PerigosService";
import { DanosService } from "@/pages/Home/Danos/services/DanosService";
import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import type { Dano } from "@/pages/Home/Danos/models/Dano";
import { QueryKeys } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  risco?: Risco;
  gheId: string;
}

export function AddEditRiscoDialog({
  controlledOpen,
  setControlledOpen,
  isEdit,
  risco,
  gheId,
}: Props) {
  const [localRisco, setLocalRisco] = useState(isEdit && risco ? risco.local : "");
  const [atividadesRisco, setAtividadesRisco] = useState(isEdit && risco ? risco.atividades : "");
  const [selectedPerigos, setSelectedPerigos] = useState<Perigo[]>([]);
  const [selectedDanos, setSelectedDanos] = useState<Dano[]>([]);
  const [agentesDeRisco, setAgentesDeRisco] = useState(isEdit && risco ? risco.agentes : 0);
  const [tipoDeAvaliacaoRisco, setTipoDeAvaliacaoRisco] = useState(isEdit && risco ? risco.tipoDeAvaliacao : "");
  const [severidadeRisco, setSeveridadeRisco] = useState(isEdit && risco ? risco.severidade : 0);
  const [probabilidadeRisco, setProbabilidadeRisco] = useState(isEdit && risco ? risco.probabilidade : 0);

  const [perigoSearch, setPerigoSearch] = useState("");
  const [debouncedPerigoSearch, setDebouncedPerigoSearch] = useState("");
  const [perigoPopoverOpen, setPerigoPopoverOpen] = useState(false);

  const [danoSearch, setDanoSearch] = useState("");
  const [debouncedDanoSearch, setDebouncedDanoSearch] = useState("");
  const [danoPopoverOpen, setDanoPopoverOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedPerigoSearch(perigoSearch), 300);
    return () => clearTimeout(timer);
  }, [perigoSearch]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedDanoSearch(danoSearch), 300);
    return () => clearTimeout(timer);
  }, [danoSearch]);

  const { data: perigosData } = useQuery({
    queryKey: [QueryKeys.GetPerigos, debouncedPerigoSearch],
    queryFn: () => PerigosService.getPerigos(debouncedPerigoSearch || undefined),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: danosData } = useQuery({
    queryKey: [QueryKeys.GetDanos, debouncedDanoSearch],
    queryFn: () => DanosService.getDanos(debouncedDanoSearch || undefined),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const availablePerigos = (perigosData?.data?.items || []).filter(
    (p) => !selectedPerigos.some((sp) => sp.id === p.id)
  );

  const availableDanos = (danosData?.data?.items || []).filter(
    (d) => !selectedDanos.some((sd) => sd.id === d.id)
  );

  const handleSelectPerigo = (perigo: Perigo) => {
    setSelectedPerigos((prev) => [...prev, perigo]);
    setPerigoSearch("");
  };

  const handleRemovePerigo = (perigoId: string) => {
    setSelectedPerigos((prev) => prev.filter((p) => p.id !== perigoId));
  };

  const handleSelectDano = (dano: Dano) => {
    setSelectedDanos((prev) => [...prev, dano]);
    setDanoSearch("");
  };

  const handleRemoveDano = (danoId: string) => {
    setSelectedDanos((prev) => prev.filter((d) => d.id !== danoId));
  };

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    setLocalRisco("");
    invalidateQueriesForUpdatesOnRisco(queryClient, gheId);
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: RiscosService.addRisco,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: RiscosService.editRisk,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      local: localRisco,
      atividades: atividadesRisco,
      perigoIds: selectedPerigos.map((p) => p.id),
      danoIds: selectedDanos.map((d) => d.id),
      agentes: agentesDeRisco,
      tipoDeAvaliacao: tipoDeAvaliacaoRisco,
      severidade: severidadeRisco,
      probabilidade: probabilidadeRisco,
    };
    if (isEdit && risco) {
      editMutate({
        programGuid: gheId,
        riskGuid: risco.id,
        payload,
      });
    } else {
      addMutate({
        gheId: gheId,
        payload,
      });
    }
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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

            <Label>Perigos</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {selectedPerigos.map((perigo) => (
                <Badge key={perigo.id} variant="secondary" className="gap-1">
                  {perigo.descricao}
                  <button
                    type="button"
                    onClick={() => handleRemovePerigo(perigo.id)}
                    className="ml-0.5 hover:text-destructive"
                    disabled={addIsPending || editIsPending}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Popover open={perigoPopoverOpen} onOpenChange={setPerigoPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-muted-foreground font-normal"
                  disabled={addIsPending || editIsPending}
                >
                  Buscar perigos...
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Buscar perigos..."
                    value={perigoSearch}
                    onValueChange={setPerigoSearch}
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum perigo encontrado.</CommandEmpty>
                    <CommandGroup>
                      {availablePerigos.map((perigo) => (
                        <CommandItem
                          key={perigo.id}
                          value={perigo.id}
                          onSelect={() => handleSelectPerigo(perigo)}
                        >
                          {perigo.descricao}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Label>Danos</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {selectedDanos.map((dano) => (
                <Badge key={dano.id} variant="secondary" className="gap-1">
                  {dano.descricao}
                  <button
                    type="button"
                    onClick={() => handleRemoveDano(dano.id)}
                    className="ml-0.5 hover:text-destructive"
                    disabled={addIsPending || editIsPending}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Popover open={danoPopoverOpen} onOpenChange={setDanoPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-muted-foreground font-normal"
                  disabled={addIsPending || editIsPending}
                >
                  Buscar danos...
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Buscar danos..."
                    value={danoSearch}
                    onValueChange={setDanoSearch}
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum dano encontrado.</CommandEmpty>
                    <CommandGroup>
                      {availableDanos.map((dano) => (
                        <CommandItem
                          key={dano.id}
                          value={dano.id}
                          onSelect={() => handleSelectDano(dano)}
                        >
                          {dano.descricao}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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
