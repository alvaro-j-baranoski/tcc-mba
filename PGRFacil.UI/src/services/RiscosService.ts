import type { Risco } from "@/models/Risco";
import client from "./client";

export const RiscosService = {
  getRiscos(programaGuid: string): Promise<{ data: Risco[] }> {
    return client.get(`API/Programas/${programaGuid}/Riscos`);
  }
};
