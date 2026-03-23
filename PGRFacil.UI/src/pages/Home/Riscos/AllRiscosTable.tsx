import { QueryKeys } from "@/lib/utils";
import RiscosTable from "@/pages/Programa/components/RiscosTable";
import type { RiscosFilter } from "@/pages/Programa/models/RiscosFilter";
import { RiscosService } from "@/pages/Programa/services/RiscosService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AllRiscosTable() {
  const [filters, setFilters] = useState<RiscosFilter>({});

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetAllRiscos, filters],
    queryFn: () => RiscosService.getAllRiscos(filters),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="flex flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Todos os Riscos</h1>
      </div>

      {!isFetching ? (
        <RiscosTable
          riscosData={data?.data.items}
          filters={filters}
          onFiltersChange={setFilters}
        />
      ) : (
        <Skeleton
          count={10}
          height={40}
          wrapper={({ children }) => <div className="mb-4">{children}</div>}
        />
      )}
    </div>
  );
}
