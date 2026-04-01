import type EditUserProps from "@/pages/Usuarios/models/EditUserProps";
import client from "@/services/client";
import type GetUsuariosResponse from "../models/GetUsuariosResponse";

export const UsuarioService = {
  getAll(): Promise<{ data: GetUsuariosResponse }> {
    return client.get("/API/Usuarios");
  },

  delete(guid: string) {
    return client.delete(`/API/Usuarios/${guid}`);
  },

  update(props: EditUserProps) {
    return client.patch(`/API/Usuarios/${props.id}`, props.payload);
  }
};
