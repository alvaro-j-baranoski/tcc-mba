import { Button } from "@/components/ui/button";
import { ProgramasService } from "@/services/ProgramasService";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function Programa() {
  const { programaGuid } = useParams<{ programaGuid: string }>();

  const { data } = useQuery({
    queryKey: ["programaByID"],
    queryFn: ProgramasService.getProgramaByID.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex min-h-svh flex-col my-8 mx-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{data?.data.nome}</h1>
        <Button>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}
