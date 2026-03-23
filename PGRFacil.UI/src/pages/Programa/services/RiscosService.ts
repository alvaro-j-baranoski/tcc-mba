import client from "../../../services/client";
import type { AddRiscoProps } from "@/pages/Programa/models/AddRiscoProps";
import type EditRiskProps from "@/models/EditRiskProps";
import type DeleteRiscoProps from "@/models/DeleteRiskProps";
import type { GetRiscosPayload } from "../models/GetRiscosPayload";

export const RiscosService = {
  getRiscos(gheId: string): Promise<{ data: GetRiscosPayload }> {
    return client.get(`API/ghes/${gheId}/riscos`);
  },

  addRisco(props: AddRiscoProps) {
    return client.post(`API/ghes/${props.gheId}/riscos`, props.payload);
  },

  editRisk(props: EditRiskProps) {
    return client.patch(
      `API/Programs/${props.programGuid}/Risks/${props.riskGuid}`,
      props.payload
    );
  },

  deleteRisco(props: DeleteRiscoProps) {
    return client.delete(
      `API/Programs/${props.programGuid}/Risks/${props.riskGuid}`
    );
  }
};
