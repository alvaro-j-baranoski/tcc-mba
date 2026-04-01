import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import type MatrizDeRiscoData from "../MatrizDeRiscoData";
import { useMatrizDeRiscoTotalRow } from "./useMatrizDeRiscoTotalRow";

interface MatrizDeRiscoTotalRowProps {
    data: MatrizDeRiscoData;
}

export default function MatrizDeRiscoTotalRow({ data }: MatrizDeRiscoTotalRowProps) {
    const { getTotal } = useMatrizDeRiscoTotalRow({ data });

    return (
        <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mt-2 pt-2 border-t-2 border-slate-100">
            <div className="flex items-center justify-center font-bold text-slate-900 text-sm">TOTAL</div>
            {AgentesDeRisco.map((agente) => (
                <div
                    key={`total-${agente.value}`}
                    className="flex items-center justify-center font-bold text-slate-900 text-lg bg-slate-50 rounded-md py-2"
                >
                    {getTotal(agente.key)}
                </div>
            ))}
        </div>
    );
}
