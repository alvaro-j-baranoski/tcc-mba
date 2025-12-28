import type { Programa } from "@/models/Programa"
import client from './client';

export const ProgramasService = {
    getProgramas(): Promise<{ data: Programa[] }> {
        return client.get('/API/Programas');
    }
}