import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProgramaTitle({ programaName }: { programaName: string | undefined }) {
  return (
    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
      {programaName || <Skeleton/>}
    </h1>
  );
}
