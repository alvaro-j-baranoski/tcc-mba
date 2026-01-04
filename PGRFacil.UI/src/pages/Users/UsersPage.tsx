import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/utils";
import { UsersService } from "@/services/UsersService";
import UsersTable from "./components/UsersTable";
import { AppHeader } from "@/components/AppHeader/AppHeader";

export default function UsersPage() {
  const { data } = useQuery({
    queryKey: [QueryKeys.GetUsers],
    queryFn: UsersService.getAll,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AppHeader />
      <div className="flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Usuários</h1>
        </div>
        <UsersTable users={data?.data ?? []} />
      </div>
    </div>
  );
}
