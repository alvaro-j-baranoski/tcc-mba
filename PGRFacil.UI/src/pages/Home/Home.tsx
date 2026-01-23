import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { RelatoriosService } from "@/services/RelatoriosService";
import { RiskMatrix } from "@/components/RiskMatrix";
import { QueryKeys } from "@/lib/utils";
import ProgramasTable from "./components/ProgramasTable";

export default function Home() {

  const { data: matrizDeRiscoData } = useQuery({
    queryKey: [QueryKeys.GetMatrizDeRisco],
    queryFn: RelatoriosService.getMatrizDeRisco,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AppHeader />
      {matrizDeRiscoData && <RiskMatrix data={matrizDeRiscoData.data} />}
      <ProgramasTable />
    </div>
  );
}
