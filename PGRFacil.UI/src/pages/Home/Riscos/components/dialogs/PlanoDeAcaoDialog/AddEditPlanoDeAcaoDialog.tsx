import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAddEditPlanoDeAcaoDialog } from "./useAddEditPlanoDeAcaoDialog";

export function PlanoDeAcaoDialog() {
    const {
        isEdit,
        handleSubmit,
        responsavel,
        setResponsavel,
        isPending,
        dataInicio,
        setDataInicio,
        dataConclusao,
        setDataConclusao,
        descricao,
        setDescricao,
        handleDelete,
        deleteIsPending,
        isModalOpen,
        handleModal,
    } = useAddEditPlanoDeAcaoDialog();

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(open) => {
                handleModal(open, null, null);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar" : "Adicionar"} Plano de Ação</DialogTitle>
                    <DialogDescription>Preencha os campos do plano de ação.</DialogDescription>
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
                            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending}>
                                {deleteIsPending ? "Excluindo..." : "Excluir"}
                            </Button>
                        )}
                        <div className="flex gap-2 ml-auto">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleModal(false, null, null)}
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
