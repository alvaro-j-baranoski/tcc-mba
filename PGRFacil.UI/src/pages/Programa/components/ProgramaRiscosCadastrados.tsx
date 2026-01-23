import { Shield } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function ProgramaRiscosCadastrados({
  numberOfRisks,
}: {
  numberOfRisks: number | undefined;
}) {
  const riscosCadastradosDisplay = numberOfRisks ? (
    `${numberOfRisks} riscos cadastrados`
  ) : (
    <Skeleton inline width={80} />
  );

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 shadow-sm">
      <Shield size={14} />
      <span className="font-medium text-gray-700">
        {riscosCadastradosDisplay}
      </span>
    </div>
  );
}
