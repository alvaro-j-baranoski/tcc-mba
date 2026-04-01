import client from "@/services/client";
import type { AddPerigoPayload } from "../models/AddPerigoPayload";
import type { EditPerigoPayload } from "../models/EditPerigoPayload";
import type { GetPerigosPayload } from "../models/GetPerigosPayload";

export const PerigosService = {
  getPerigos(descricao?: string, limit?: number): Promise<{ data: GetPerigosPayload }> {
    return client.get("/API/perigos", {
      params: { ...(descricao ? { descricao } : {}), ...(limit ? { limit } : {}) },
    });
  },

  getByNextLink(nextLink: string): Promise<{ data: GetPerigosPayload }> {
    return client.get(nextLink);
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
