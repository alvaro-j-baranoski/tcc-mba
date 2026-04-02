import client from "@/services/client";
import type { AddVersaoPayload } from "../models/AddVersaoPayload";
import type { Versao } from "../models/Versao";
import type { EditVersaoPayload } from "../models/EditVersaoPayload";

export const VersaoService = {
    addVersao(gheId: string, payload: AddVersaoPayload) {
        return client.post(`/API/ghes/${gheId}/versoes`, payload);
    },

    getVersoes(gheId: string): Promise<{ data: Versao[] }> {
        return client.get(`/API/ghes/${gheId}/versoes`);
    },

    deleteVersao(gheId: string, versaoId: string) {
        return client.delete(`/API/ghes/${gheId}/versoes/${versaoId}`);
    },

    editVersao(gheId: string, versaoId: string, payload: EditVersaoPayload) {
        return client.patch(`/API/ghes/${gheId}/versoes/${versaoId}`, payload);
    },
};
