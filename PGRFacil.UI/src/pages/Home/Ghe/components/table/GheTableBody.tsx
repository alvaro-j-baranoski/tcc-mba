import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/dateUtils";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import { useAuth } from "@/hooks/useAuth";
import GheTableDropdownMenu from "./GheTableDropdownMenu";

interface Props {
  ghes: Ghe[] | undefined;
}

export default function GheTableBody({ ghes }: Props) {
  const { isUserEditor } = useAuth();

  return (
    <TableBody className="divide-y divide-gray-100">
      {ghes?.map((ghe) => (
        <TableRow
          key={ghe.id}
          className="hover:bg-gray-100 transition-colors group cursor-pointer"
          onClick={() => {
            console.log(`Navigate to /ghe/${ghe.id}`);
          }}
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
