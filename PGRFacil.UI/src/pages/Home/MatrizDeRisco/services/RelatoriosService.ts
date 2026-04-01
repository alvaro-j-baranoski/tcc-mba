import type MatrizDeRiscoData from "@/pages/Home/MatrizDeRisco/MatrizDeRiscoData";
import client from "@/services/client";

export const RelatoriosService = {
    getMatrizDeRisco(): Promise<{ data: MatrizDeRiscoData}> {
        return client.get("/API/Relatorios/MatrizDeRisco");
    },

    getMatrizDeRiscoByGhe(gheId: string): Promise<{ data: MatrizDeRiscoData}> {
        return client.get(`/API/ghes/${gheId}/MatrizDeRisco`);
    }
}