import type { Programa } from "@/models/Programa"
import type { AddNewProgramaPayload } from "@/models/AddNewProgramaPayload"
import client from './client';

export const ProgramasService = {
    getProgramas(): Promise<{ data: Programa[] }> {
        return client.get('/API/Programas');
    },

    addNewPrograma(payload: AddNewProgramaPayload) {
        return client.post('/API/Programas', payload);
    },

    deletePrograma(guid: string) {
        return client.delete(`/API/Programas/${guid}`);
    }
}