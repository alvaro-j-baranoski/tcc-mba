import type { Dano } from "./Dano";

export interface GetDanosPayload {
  "@nextLink": string | null;
  items: Dano[];
}
