import type { Risk } from "@/models/Risk";
import client from "./client";
import type { AddRiskProps } from "@/models/AddRiskProps";
import type EditRiskProps from "@/models/EditRiskProps";
import type DeleteRiscoProps from "@/models/DeleteRiskProps";

export const RisksService = {
  getRisks(programaGuid: string): Promise<{ data: Risk[] }> {
    return client.get(`API/Programs/${programaGuid}/Risks`);
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
