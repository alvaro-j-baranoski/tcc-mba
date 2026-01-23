import { Shield } from "lucide-react";

export default function ProgramaRiscosCadastrados({
  numberOfRisks,
}: {
  numberOfRisks: number | undefined;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 shadow-sm">
      <Shield size={14} />
      <span className="font-medium text-gray-700">
        {numberOfRisks} riscos cadastrados
      </span>
    </div>
  );
}
