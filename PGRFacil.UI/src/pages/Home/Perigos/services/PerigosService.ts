import client from "@/services/client";
import type { Perigo } from "../models/Perigo";
import type { AddPerigoPayload } from "../models/AddPerigoPayload";
import type { EditPerigoPayload } from "../models/EditPerigoPayload";

export const PerigosService = {
  getPerigos(): Promise<{ data: { items: Perigo[] } }> {
    return client.get("/API/perigos");
  },

  addPerigo(payload: AddPerigoPayload) {
    return client.post("/API/perigos", payload);
  },

  editPerigo(payload: EditPerigoPayload) {
    return client.patch(`/API/perigos/${payload.id}`, payload);
  },

  deletePerigo(id: string) {
    return client.delete(`/API/perigos/${id}`);
  },
};
