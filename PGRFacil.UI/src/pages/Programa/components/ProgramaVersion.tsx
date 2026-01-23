import { GitCommit } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProgramaVersion({
  version,
}: {
  version: string | undefined;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 shadow-sm">
      <GitCommit size={14} />
      <span className="font-medium text-gray-700">
        v{version || <Skeleton inline={true} />}
      </span>
    </div>
  );
}
