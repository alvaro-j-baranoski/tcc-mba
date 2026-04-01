import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { useMatrizDeRiscoHeaderRow } from "./useMatrizDeRiscoHeaderRow";

export default function MatrizDeRiscoHeaderRow() {
    const { getHeaderColor } = useMatrizDeRiscoHeaderRow();
    
    return (
        <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1">
            <div className="flex items-end justify-center pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Significância</span>
            </div>
            {AgentesDeRisco.map((agente) => (
                <div
                    key={agente.value}
                    className={`
                        ${getHeaderColor(agente.value)}
                        p-3 text-xs font-bold uppercase text-center rounded-t-md flex items-center justify-center h-16
                        shadow-sm
                      `}
                >
                    {agente.value.replace(" (PSICOSSOCIAL)", "\n(PSICOSSOCIAL)")}
                </div>
            ))}
        </div>
    );
}
