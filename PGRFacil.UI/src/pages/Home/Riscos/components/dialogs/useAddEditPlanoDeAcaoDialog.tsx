import { useContext, useState } from "react";
import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { PlanoDeAcaoService } from "../../services/PlanoDeAcaoService";
import { PlanoDeAcaoActionsContext } from "../../context/PlanoDeAcaoActionsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseAddEditPlanoDeAcaoDialogProps {
  gheId: string;
}

export const useAddEditPlanoDeAcaoDialog = ({
  gheId,
}: UseAddEditPlanoDeAcaoDialogProps) => {
  const { modalState, handleModal } = useContext(PlanoDeAcaoActionsContext)!;

  const isEdit = !!modalState?.planoDeAcao;

  const [responsavel, setResponsavel] = useState(
    isEdit ? modalState!.planoDeAcao!.responsavel : "",
  );

  const toLocalDatetimeString = (utcString: string): string => {
    const date = new Date(utcString);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const [dataInicio, setDataInicio] = useState(
    isEdit ? toLocalDatetimeString(modalState!.planoDeAcao!.dataInicio) : "",
  );
  const [dataConclusao, setDataConclusao] = useState(
    isEdit ? toLocalDatetimeString(modalState!.planoDeAcao!.dataConclusao) : "",
  );
  const [descricao, setDescricao] = useState(
    isEdit ? modalState!.planoDeAcao!.descricao : "",
  );

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    handleModal(false, null, null);
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
      editMutate({ gheId, riscoId: modalState!.riscoId!, payload });
    } else {
      addMutate({ gheId, riscoId: modalState!.riscoId!, payload });
    }
  };

  const handleDelete = () => {
    deleteMutate({ gheId, riscoId: modalState!.riscoId! });
  };

  const isPending = addIsPending || editIsPending || deleteIsPending;

  const isModalOpen = modalState?.open;

  return {
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
  };
};
