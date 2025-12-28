import type { Programa } from "@/models/Programa"
import type { AddEditNewProgramaPayload } from "@/models/AddEditNewProgramaPayload"
import client from './client';

export const ProgramasService = {
    getProgramas(): Promise<{ data: Programa[] }> {
        return client.get('/API/Programas');
    },

    addNewPrograma(payload: AddEditNewProgramaPayload) {
        return client.post('/API/Programas', payload);
    },

    editPrograma(payload: Programa) {
        return client.put(`/API/Programas/${payload.guid}`, payload);
    },

    deletePrograma(guid: string) {
        return client.delete(`/API/Programas/${guid}`);
    }
}