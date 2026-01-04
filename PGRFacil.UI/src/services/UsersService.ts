import type { User } from "@/models/login/User";
import client from "./client";

export const UsersService = {
  getAll(): Promise<{ data: User[] }> {
    return client.get("/API/Users");
  },

  delete(guid: string) {
    return client.delete(`/API/Users/${guid}`);
  },
};
