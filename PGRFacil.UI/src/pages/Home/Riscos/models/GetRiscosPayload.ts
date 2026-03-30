import type { Risco } from "./Risco";

export interface GetRiscosPayload {
  "@nextLink": string | null;
  items: Risco[];
}