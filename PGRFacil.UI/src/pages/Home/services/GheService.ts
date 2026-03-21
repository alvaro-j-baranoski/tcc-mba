import type { Ghe } from "@/pages/Home/models/Ghe";
import type { AddGhePayload } from "@/pages/Home/models/AddGhePayload";
import client from "../../../services/client";
import type { EditGhePayload } from "@/pages/Home/models/EditGhePayload";

export const GheService = {
  getGhes(): Promise<{ data: Ghe[] }> {
    return client.get("/API/ghes");
  },

  getProgramByID(guid: string): Promise<{ data: Ghe }> {
    return client.get(`/API/Programs/${guid}`);
  },

  addGhe(payload: AddGhePayload) {
    return client.post("/API/ghes", payload);
  },

  editGhe(payload: EditGhePayload) {
    return client.patch(`/API/ghes/${payload.id}`, payload);
  },

  deleteGhe(guid: string) {
    return client.delete(`/API/ghes/${guid}`);
  },
};
