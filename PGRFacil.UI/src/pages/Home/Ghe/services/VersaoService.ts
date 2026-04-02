import client from "@/services/client";
import type { AddVersaoPayload } from "../models/AddVersaoPayload";
import type { Versao } from "../models/Versao";

export const VersaoService = {
    addVersao(gheId: string, payload: AddVersaoPayload) {
        return client.post(`/API/ghes/${gheId}/versoes`, payload);
    },

    getVersoes(gheId: string): Promise<{ data: Versao[] }> {
        return client.get(`/API/ghes/${gheId}/versoes`);
    }
};