import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/dateUtils";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import { useAuth } from "@/hooks/useAuth";
import GheTableDropdownMenu from "./GheTableDropdownMenu";
import { useContext } from "react";
import { GheSelectedContext } from "../../context/GheSelectedContext";


interface Props {
  ghes: Ghe[] | undefined;
}

export default function GheTableBody({ ghes }: Props) {
  const { isUserEditor } = useAuth();
  const { activeGhe, setActiveGhe } = useContext(GheSelectedContext)!;
  const handleRowClick = (clicked: Ghe) => {
    if (activeGhe === null || activeGhe.id !== clicked.id) {
      setActiveGhe(clicked);
    } else {
      setActiveGhe(null);
    }
  };

  return (
    <TableBody className="divide-y divide-gray-100">
      {ghes?.map((ghe) => (
        <TableRow
          key={ghe.id}
          className={`hover:bg-gray-100 transition-colors group cursor-pointer ${activeGhe?.id === ghe.id ? "bg-blue-100" : ""}`}
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
