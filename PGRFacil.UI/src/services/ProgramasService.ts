import type { Programa } from "@/models/programas/Programa";
import type { AddProgramaPayload } from "@/models/programas/AddProgramaPayload";
import client from "./client";
import type { EditProgramaPayload } from "@/models/programas/EditProgramaPayload";

export const ProgramasService = {
  getProgramas(): Promise<{ data: Programa[] }> {
    return client.get("/API/Programas");
  },

  getProgramaByID(guid: string): Promise<{ data: Programa }> {
    return client.get(`/API/Programas/${guid}`);
  },

  addNewPrograma(payload: AddProgramaPayload) {
    return client.post("/API/Programas", payload);
  },

  editPrograma(payload: EditProgramaPayload) {
    return client.put(`/API/Programas/${payload.guid}`, payload);
  },

  deletePrograma(guid: string) {
    return client.delete(`/API/Programas/${guid}`);
  },
};
