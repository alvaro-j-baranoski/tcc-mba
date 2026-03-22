import type MatrizDeRiscoData from "@/pages/Home/MatrizDeRisco/MatrizDeRiscoData";
import client from "./client";

export const RelatoriosService = {
    getMatrizDeRisco(): Promise<{ data: MatrizDeRiscoData}> {
        return client.get("/API/Relatorios/MatrizDeRisco");
    }
}