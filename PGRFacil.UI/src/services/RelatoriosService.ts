import type ReportMatrixData from "@/models/ReportMatrixData";
import client from "./client";

export const RelatoriosService = {
    getMatrizDeRisco(): Promise<{ data: ReportMatrixData}> {
        return client.get("/API/Relatorios/MatrizDeRisco");
    }
}