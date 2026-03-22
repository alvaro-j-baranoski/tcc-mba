import type { Risco } from "./Risco";

export interface GetRiscosPayload {
  email: string;
  items: Risco[];
}