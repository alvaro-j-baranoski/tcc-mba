import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { useRiscoDialog } from "./useRiscoDialog";
import RiscoDialogHeader from "./RiscoDialogHeader";
import RiscoDialogLocal from "./RiscoDialogLocal";
import RiscoDialogAtividades from "./RiscoDialogAtividades";
import RiscoDialogPerigos from "./RiscoDialogPerigos";
import RiscoDialogDanos from "./RiscoDialogDanos";

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
        setSelectedPerigos,
        selectedDanos,
        setSelectedDanos,
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
                <RiscoDialogHeader type={type} />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <RiscoDialogLocal
                            localRisco={localRisco}
                            setLocalRisco={setLocalRisco}
                            disabled={addIsPending || editIsPending}
                        />
                        <RiscoDialogAtividades
                            atividadesRisco={atividadesRisco}
                            setAtividadesRisco={setAtividadesRisco}
                            disabled={addIsPending || editIsPending}
                        />
                        <RiscoDialogPerigos
                            selectedPerigos={selectedPerigos}
                            setSelectedPerigos={setSelectedPerigos}
                            disabled={addIsPending || editIsPending}
                        />
                        <RiscoDialogDanos
                            selectedDanos={selectedDanos}
                            setSelectedDanos={setSelectedDanos}
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
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                            disabled={addIsPending || editIsPending}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={addIsPending || editIsPending}>
                            {addIsPending || editIsPending
                                ? type === "edit"
                                    ? "Editando..."
                                    : "Criando..."
                                : type === "edit"
                                  ? "Editar"
                                  : "Criar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
