import { formatDate } from "@/lib/dateUtils";
import { Calendar } from "lucide-react";

export default function ProgramaAtualizadoEm({
  updatedOn,
}: {
  updatedOn: string | undefined;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 shadow-sm">
      <Calendar size={14} className="text-gray-500" />
      <span className="text-gray-600">Atualizado {formatDate(updatedOn)}</span>
    </div>
  );
}
