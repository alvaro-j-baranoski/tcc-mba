import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/dateUtils";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import { useAuth } from "@/hooks/useAuth";
import GheTableDropdownMenu from "./GheTableDropdownMenu";
import { useContext } from "react";
import { GheSelectedContext } from "../../context/GheSelectedContext";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/utils";

interface Props {
  ghes: Ghe[] | undefined;
}

export default function GheTableBody({ ghes }: Props) {
  const { isUserEditor } = useAuth();
  const { ghe, setGhe } = useContext(GheSelectedContext)!;
  const queryClient = useQueryClient();

  const handleRowClick = (clicked: Ghe) => {
    if (ghe?.id === clicked.id) {
      setGhe(null);
      console.log("Deselected, navigate to /ghe");
    }
    else {
      setGhe(clicked);
      console.log(`Navigate to /ghe/${clicked.id}`);
    }

    queryClient.refetchQueries({ queryKey: [QueryKeys.GetAllRiscos] });
  };

  return (
    <TableBody className="divide-y divide-gray-100">
      {ghes?.map((ghe) => (
        <TableRow
          key={ghe.id}
          className="hover:bg-gray-100 transition-colors group cursor-pointer"
          onClick={() => handleRowClick(ghe)}
        >
          <TableCell>{ghe.nome}</TableCell>
          <TableCell>{ghe.versao}</TableCell>
          <TableCell>{ghe.numeroDeRiscos}</TableCell>
          <TableCell>{formatDate(ghe.atualizadoEm)}</TableCell>
          <TableCell className="text-right">
            {isUserEditor && <GheTableDropdownMenu ghe={ghe} />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
