import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { RelatoriosService } from "@/services/RelatoriosService";
import { MatrizDeRisco } from "@/pages/Home/MatrizDeRisco/MatrizDeRisco";
import { QueryKeys } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import DanosTable from "./Danos/components/DanosTable";
import GheTable from "./Ghe/components/GheTable";
import PerigosTable from "./Perigos/components/PerigosTable";

export default function Home() {
  const { data: matrizDeRiscoData, isFetching } = useQuery({
    queryKey: [QueryKeys.GetMatrizDeRisco],
    queryFn: RelatoriosService.getMatrizDeRisco,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AppHeader />
      {!isFetching ? 
        (matrizDeRiscoData && <MatrizDeRisco data={matrizDeRiscoData.data} />) : 
        (<Spinner className="mx-auto my-10 size-8" />)}
      <GheTable />
      <PerigosTable />
      <DanosTable />
    </div>
  );
}
