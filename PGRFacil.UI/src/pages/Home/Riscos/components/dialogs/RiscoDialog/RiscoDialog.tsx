import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRiscoDialog } from "./useRiscoDialog";
import RiscoDialogHeader from "./RiscoDialogHeader";
import RiscoDialogLocal from "./RiscoDialogLocal";
import RiscoDialogAtividades from "./RiscoDialogAtividades";
import RiscoDialogPerigos from "./RiscoDialogPerigos";
import RiscoDialogDanos from "./RiscoDialogDanos";
import RiscoDialogAgentes from "./RiscoDialogAgentes";
import RiscoDialogTipoDeAvaliacao from "./RiscoDialogTipoDeAvaliacao";
import RiscoDialogSeveridade from "./RiscoDialogSeveridade";
import RiscoDialogProbabilidade from "./RiscoDialogProbabilidade";

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

                        <RiscoDialogAgentes
                            agentesDeRisco={agentesDeRisco}
                            setAgentesDeRisco={setAgentesDeRisco}
                            disabled={addIsPending || editIsPending}
                        />

                        <RiscoDialogTipoDeAvaliacao
                            tipoDeAvaliacaoRisco={tipoDeAvaliacaoRisco}
                            setTipoDeAvaliacaoRisco={setTipoDeAvaliacaoRisco}
                            disabled={addIsPending || editIsPending}
                        />
                        <RiscoDialogSeveridade
                            severidadeRisco={severidadeRisco}
                            setSeveridadeRisco={setSeveridadeRisco}
                            disabled={addIsPending || editIsPending}
                        />
                        <RiscoDialogProbabilidade
                            probabilidadeRisco={probabilidadeRisco}
                            setProbabilidadeRisco={setProbabilidadeRisco}
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
