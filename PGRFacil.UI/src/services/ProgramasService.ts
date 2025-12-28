import client from './client';

export const ProgramasService = {
    getProgramas() {
        return client.get('/API/Programas');
    }
}