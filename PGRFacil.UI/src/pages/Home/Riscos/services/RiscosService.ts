import client from "../../../../services/client";
import type { AddRiscoProps } from "@/pages/Home/Riscos/models/AddRiscoProps";
import type DeleteRiscoProps from "@/pages/Home/Riscos/models/DeleteRiscoProps";
import type { GetRiscosPayload } from "../models/GetRiscosPayload";
import type EditRiscoProps from "../models/EditRiscoProps";
import type { RiscosFilter } from "../models/RiscosFilter";

export const RiscosService = {
  getAllRiscos(filters?: RiscosFilter): Promise<{ data: GetRiscosPayload }> {
    return client.get("API/Riscos", {
      params: filters,
    });
  },

  getRiscos(gheId: string, filters?: RiscosFilter): Promise<{ data: GetRiscosPayload }> {
    return client.get(`API/ghes/${gheId}/riscos`, {
      params: filters,
    });
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
      `API/ghes/${props.gheId}/riscos/${props.riscoId}`
    );
  }
};
