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
import RiscoDialogFooter from "./RiscoDialogFooter";
import RiscoDialogGhe from "./RiscoDialogGhe";

interface RiscoDialogProps {
    type: "add" | "edit";
    gheId: string | null;
    gheName: string | null;
}

export function RiscoDialog({ type, gheId, gheName }: RiscoDialogProps) {
    const {
        setGheId,
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
        handleSubmit,
        handleCloseModal,
        isModalOpen,
        risco,
    } = useRiscoDialog({ type, gheIdInput: gheId });

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => handleModal(open, type, risco || null)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <RiscoDialogHeader type={type} />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <RiscoDialogGhe
                            type={type}
                            setGheId={setGheId}
                            gheName={gheName}
                        />
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
                    <RiscoDialogFooter
                        type={type}
                        handleCloseModal={handleCloseModal}
                        disabled={addIsPending || editIsPending}
                    />
                </form>
            </DialogContent>
        </Dialog>
    );
}
