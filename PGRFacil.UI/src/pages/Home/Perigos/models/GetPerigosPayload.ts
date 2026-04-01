import type { Perigo } from "./Perigo";

export interface GetPerigosPayload {
  "@nextLink": string | null;
  items: Perigo[];
}
