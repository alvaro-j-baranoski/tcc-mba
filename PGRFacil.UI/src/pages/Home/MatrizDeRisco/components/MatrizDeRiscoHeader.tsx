import { useContext } from "react";
import { GheSelectedContext } from "../../Ghe/context/GheSelectedContext";
import { Badge } from "@/components/ui/badge";

export default function MatrizDeRiscoHeader() {
    const { activeGhe } = useContext(GheSelectedContext)!;

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Matriz de Riscos (Significância x Categoria)</h2>
                {activeGhe && <Badge variant="secondary">{activeGhe.nome}</Badge>}
            </div>
            <p className="text-sm text-slate-500">Distribuição de riscos por nível de significância e categoria</p>
        </div>
    );
}
