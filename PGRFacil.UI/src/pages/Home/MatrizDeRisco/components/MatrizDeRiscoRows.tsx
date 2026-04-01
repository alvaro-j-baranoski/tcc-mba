import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { NivelSignificancia } from "../NivelSignificancia";
import type MatrizDeRiscoData from "../MatrizDeRiscoData";
import { useMatrizDeRiscoHeaderRow } from "./useMatrizDeRiscoRow";

interface MatrizDeRiscoRowsProps {
    data: MatrizDeRiscoData;
}

export default function MatrizDeRiscoRows({ data }: MatrizDeRiscoRowsProps) {
    const { getCellColor, getCount } = useMatrizDeRiscoHeaderRow({ data });

    return (
        <>
            {NivelSignificancia.map((sig) => (
                <div key={sig.value} className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1">
                    {/* Row Label */}
                    <div className="flex items-center justify-center font-bold text-slate-700 rounded-l-md border-y border-l border-slate-200">
                        {sig.value}
                    </div>

                    {/* Data Cells */}
                    {AgentesDeRisco.map((agente) => {
                        const count = getCount(agente.key, sig.key);
                        return (
                            <div
                                key={`${agente.value}-${sig.value}`}
                                className={`
                                    ${getCellColor(sig.value)}
                                    h-12 flex items-center justify-center font-bold text-lg border
                                    transition-colors
                                `}
                            >
                                {count}
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
}
