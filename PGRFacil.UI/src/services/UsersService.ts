import type { User } from "@/models/users/User";
import client from "./client";
import type EditUserProps from "@/models/users/EditUserProps";

export const UsersService = {
  getAll(): Promise<{ data: User[] }> {
    return client.get("/API/Users");
  },

  delete(guid: string) {
    return client.delete(`/API/Users/${guid}`);
  },

  update(props: EditUserProps) {
    return client.patch(`/API/Users/${props.id}`, props.payload);
  }
};
