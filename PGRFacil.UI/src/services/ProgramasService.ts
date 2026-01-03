import type { Programa } from "@/models/programs/Programa";
import type { AddProgramaPayload } from "@/models/programs/AddProgramaPayload";
import client from "./client";
import type { EditProgramaPayload } from "@/models/programs/EditProgramaPayload";

export const ProgramsService = {
  getPrograms(): Promise<{ data: Programa[] }> {
    return client.get("/API/Programs");
  },

  getProgramByID(guid: string): Promise<{ data: Programa }> {
    return client.get(`/API/Programs/${guid}`);
  },

  addNewProgram(payload: AddProgramaPayload) {
    return client.post("/API/Programs", payload);
  },

  editProgram(payload: EditProgramaPayload) {
    return client.patch(`/API/Programs/${payload.guid}`, payload);
  },

  deleteProgram(guid: string) {
    return client.delete(`/API/Programs/${guid}`);
  },
};
