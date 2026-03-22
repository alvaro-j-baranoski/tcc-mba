import client from "@/services/client";
import type { Dano } from "../models/Dano";
import type { AddDanoPayload } from "../models/AddDanoPayload";
import type { EditDanoPayload } from "../models/EditDanoPayload";

export const DanosService = {
  getDanos(descricao?: string): Promise<{ data: { items: Dano[] } }> {
    return client.get("/API/danos", {
      params: descricao ? { descricao } : undefined,
    });
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
