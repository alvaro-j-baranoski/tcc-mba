import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { XIcon } from "lucide-react";
import { useRiscoDialog } from "./useRiscoDialog";

interface Props {
    type: "add" | "edit";
    gheId: string;
}

export function RiscoDialog({ type, gheId }: Props) {
    const {
        handleSubmit,
        localRisco,
        setLocalRisco,
        atividadesRisco,
        setAtividadesRisco,
        selectedPerigos,
        handleRemovePerigo,
        perigoPopoverOpen,
        setPerigoPopoverOpen,
        perigoSearch,
        setPerigoSearch,
        availablePerigos,
        handleSelectPerigo,
        selectedDanos,
        handleRemoveDano,
        danoPopoverOpen,
        setDanoPopoverOpen,
        danoSearch,
        setDanoSearch,
        availableDanos,
        handleSelectDano,
        agentesDeRisco,
        setAgentesDeRisco,
        tipoDeAvaliacaoRisco,
        setTipoDeAvaliacaoRisco,
        severidadeRisco,
        setSeveridadeRisco,
        probabilidadeRisco,
        setProbabilidadeRisco,
        addIsPending,
        editIsPending,
        handleModal,
        isModalOpen,
        handleCloseModal,
        risco,
    } = useRiscoDialog({ type, gheId });

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, type, risco || null)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {type === "edit" ? "Editar" : "Adicionar"} um {type === "edit" ? "" : "novo"} risco
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
                                    <CommandInput placeholder="Buscar perigos..." value={perigoSearch} onValueChange={setPerigoSearch} />
                                    <CommandList>
                                        <CommandEmpty>Nenhum perigo encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {availablePerigos.map((perigo) => (
                                                <CommandItem key={perigo.id} value={perigo.id} onSelect={() => handleSelectPerigo(perigo)}>
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
                                    <CommandInput placeholder="Buscar danos..." value={danoSearch} onValueChange={setDanoSearch} />
                                    <CommandList>
                                        <CommandEmpty>Nenhum dano encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {availableDanos.map((dano) => (
                                                <CommandItem key={dano.id} value={dano.id} onSelect={() => handleSelectDano(dano)}>
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
                                        <RadioGroupItem value={"" + agente.key} id={agente.value + agente.key} />
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
                        <Button type="button" variant="outline" onClick={handleCloseModal} disabled={addIsPending || editIsPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={addIsPending || editIsPending}>
                            {addIsPending || editIsPending ? (type === "edit" ? "Editando..." : "Criando...") : type === "edit" ? "Editar" : "Criar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
