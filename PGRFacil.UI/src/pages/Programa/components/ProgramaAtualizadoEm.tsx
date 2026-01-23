import { formatDate } from "@/lib/dateUtils";
import { Calendar } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function ProgramaAtualizadoEm({
  updatedOn,
}: {
  updatedOn: string | undefined;
}) {
  const updatedOnDisplay = updatedOn ? (
    `Atualizado ${formatDate(updatedOn)}`
  ) : (
    <Skeleton inline width={100} />
  );

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 shadow-sm">
      <Calendar size={14} className="text-gray-500" />
      <span className="text-gray-600">{updatedOnDisplay}</span>
    </div>
  );
}
