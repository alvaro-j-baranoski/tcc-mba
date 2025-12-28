import type { Risco } from "@/models/Risco";
import client from "./client";
import type { AddRiscoProps } from "@/models/AddRiscoProps";
import type EditRiscoProps from "@/models/EditRiscoProps";
import type DeleteRiscoProps from "@/models/DeleteRiscoProps";

export const RiscosService = {
  getRiscos(programaGuid: string): Promise<{ data: Risco[] }> {
    return client.get(`API/Programas/${programaGuid}/Riscos`);
  },

  addRisco(props: AddRiscoProps) {
    return client.post(
      `API/Programas/${props.programaGuid}/Riscos`,
      props.payload
    );
  },

  editRisco(props: EditRiscoProps) {
    return client.put(
      `API/Programas/${props.programaGuid}/Riscos/${props.riscoGuid}`,
      props.payload
    );
  },

  deleteRisco(props: DeleteRiscoProps) {
    return client.delete(
      `API/Programas/${props.programaGuid}/Riscos/${props.riscoGuid}`
    );
  }
};
