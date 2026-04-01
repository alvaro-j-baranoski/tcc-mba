import type MatrizDeRiscoData from "../MatrizDeRiscoData";

interface UseMatrizDeRiscoTotalRowProps {
    data: MatrizDeRiscoData;
}

export const useMatrizDeRiscoTotalRow = ({ data }: UseMatrizDeRiscoTotalRowProps) => {
    const getTotal = (agente: number) => {
        let total = 0;
        data.agentes
            .find((e) => e.agente === agente)
            ?.significancias.forEach((s) => {
                total += s.numeroDeRiscos;
            });
        return total;
    };

    return { getTotal };
}