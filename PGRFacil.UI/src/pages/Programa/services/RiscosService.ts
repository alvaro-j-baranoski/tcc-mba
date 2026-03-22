import client from "../../../services/client";
import type { AddRiskProps } from "@/models/AddRiskProps";
import type EditRiskProps from "@/models/EditRiskProps";
import type DeleteRiscoProps from "@/models/DeleteRiskProps";
import type { GetRiscosPayload } from "../models/GetRiscosPayload";

export const RisksService = {
  getRiscos(gheId: string): Promise<{ data: GetRiscosPayload }> {
    return client.get(`API/ghes/${gheId}/riscos`);
  },

  addRisk(props: AddRiskProps) {
    return client.post(
      `API/Programs/${props.programGuid}/Risks`,
      props.payload
    );
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
