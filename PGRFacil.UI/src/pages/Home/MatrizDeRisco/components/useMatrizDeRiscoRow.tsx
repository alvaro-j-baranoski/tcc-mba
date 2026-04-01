import type MatrizDeRiscoData from "../MatrizDeRiscoData";

interface UseMatrizDeRiscoHeaderRowProps {
    data: MatrizDeRiscoData;
}

export const useMatrizDeRiscoHeaderRow = ({ data }: UseMatrizDeRiscoHeaderRowProps) => {
    const getCellColor = (nivelSignificancia: string) => {
        switch (nivelSignificancia) {
            case "Baixo":
                return "bg-emerald-100 text-emerald-900 border-emerald-200";
            case "Médio":
                return "bg-yellow-200 text-yellow-900 border-yellow-300";
            case "Alto":
                return "bg-red-200 text-red-900 border-red-300";
            default:
                return "bg-slate-50 text-slate-900 border-slate-200";
        }
    };

    const getCount = (agente: number, sig: number) => {
        return data.agentes.find((e) => e.agente === agente)?.significancias.find((s) => s.significancia === sig)
            ?.numeroDeRiscos;
    };

    return { getCellColor, getCount };
};
