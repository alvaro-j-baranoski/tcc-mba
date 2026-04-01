import client from "@/services/client";
import type { AddDanoPayload } from "../models/AddDanoPayload";
import type { EditDanoPayload } from "../models/EditDanoPayload";
import type { GetDanosPayload } from "../models/GetDanosPayload";

export const DanosService = {
  getDanos(descricao?: string, limit?: number): Promise<{ data: GetDanosPayload }> {
    return client.get("/API/danos", {
      params: { ...(descricao ? { descricao } : {}), ...(limit ? { limit } : {}) },
    });
  },

  getByNextLink(nextLink: string): Promise<{ data: GetDanosPayload }> {
    return client.get(nextLink);
  },

  addDano(payload: AddDanoPayload) {
    return client.post("/API/danos", payload);
  },

  editDano(payload: EditDanoPayload) {
    return client.patch(`/API/danos/${payload.id}`, payload);
  },

  deleteDano(id: string) {
    return client.delete(`/API/danos/${id}`);
  },
};
