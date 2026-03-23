import client from "../../../services/client";
import type { AddRiscoProps } from "@/pages/Programa/models/AddRiscoProps";
import type DeleteRiscoProps from "@/models/DeleteRiskProps";
import type { GetRiscosPayload } from "../models/GetRiscosPayload";
import type EditRiscoProps from "../models/EditRiscoProps";

export const RiscosService = {
  getRiscos(gheId: string): Promise<{ data: GetRiscosPayload }> {
    return client.get(`API/ghes/${gheId}/riscos`);
  },

  addRisco(props: AddRiscoProps) {
    return client.post(`API/ghes/${props.gheId}/riscos`, props.payload);
  },

  editRisco(props: EditRiscoProps) {
    return client.patch(
      `API/ghes/${props.gheId}/riscos/${props.riscoId}`,
      props.payload
    );
  },

  deleteRisco(props: DeleteRiscoProps) {
    return client.delete(
      `API/Programs/${props.programGuid}/Risks/${props.riskGuid}`
    );
  }
};
