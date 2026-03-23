import client from "@/services/client";

export interface PlanoDeAcaoPayload {
  responsavel: string;
  dataInicio: string;
  dataConclusao: string;
  descricao: string;
}

export interface PlanoDeAcaoProps {
  gheId: string;
  riscoId: string;
  payload: PlanoDeAcaoPayload;
}

export interface DeletePlanoDeAcaoProps {
  gheId: string;
  riscoId: string;
}

export const PlanoDeAcaoService = {
  addPlanoDeAcao(props: PlanoDeAcaoProps) {
    return client.post(
      `API/ghes/${props.gheId}/riscos/${props.riscoId}/planodeacao`,
      props.payload
    );
  },

  editPlanoDeAcao(props: PlanoDeAcaoProps) {
    return client.patch(
      `API/ghes/${props.gheId}/riscos/${props.riscoId}/planodeacao`,
      props.payload
    );
  },

  deletePlanoDeAcao(props: DeletePlanoDeAcaoProps) {
    return client.delete(
      `API/ghes/${props.gheId}/riscos/${props.riscoId}/planodeacao`
    );
  },
};
