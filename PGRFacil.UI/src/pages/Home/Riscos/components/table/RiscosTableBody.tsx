import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Risco } from "../../models/Risco";
import { Badge } from "@/components/ui/badge";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { mapNivelSignificancia } from "@/lib/utils";
import RiscosTableDropdownMenu from "./RiscosTableDropdownMenu";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  riscos: Risco[] | undefined;
}

export default function RiscosTableBody({ riscos }: Props) {
  const { isUserEditor } = useAuth();

  const getSignificanciaBadgeColor = (significancia: string) => {
    switch (significancia) {
      case "Baixo":
        return "bg-green-600 text-white hover:bg-green-700";
      case "Médio":
        return "bg-yellow-600 text-white hover:bg-yellow-700";
      default:
        return "bg-red-600 text-white hover:bg-red-700";
    }
  };

  return (
    <TableBody>
      {riscos?.map((risco) => (
        <TableRow key={risco.id}>
          <TableCell>
            <div className="max-w-[200px] truncate">
              <small className="text-xs leading-none font-medium">
                {risco.gheNome}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[200px] truncate">
              <small className="text-xs leading-none font-medium">
                {risco.local}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[200px] truncate">
              <small className="text-xs leading-none font-medium">
                {risco.atividades}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[250px] flex flex-wrap gap-1">
              {risco.perigos.map((perigo) => (
                <Badge
                  key={perigo.id}
                  variant="secondary"
                  className="whitespace-normal rounded-md bg-gray-200 text-gray-800"
                >
                  {perigo.descricao}
                </Badge>
              ))}
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[400px] flex flex-wrap gap-1">
              {risco.danos.map((dano) => (
                <Badge
                  key={dano.id}
                  variant="secondary"
                  className="rounded-md bg-gray-200 text-gray-800"
                >
                  {dano.descricao}
                </Badge>
              ))}
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[400px] text-wrap">
              <small className="text-xs leading-none font-medium">
                {AgentesDeRisco.find((a) => a.key === risco.agentes)?.value}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[400px] text-wrap">
              <small className="text-xs leading-none font-medium">
                {risco.tipoDeAvaliacao}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[400px] text-wrap">
              <small className="text-xs leading-none font-medium">
                {risco.severidade}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[400px] text-wrap">
              <small className="text-xs leading-none font-medium">
                {risco.probabilidade}
              </small>
            </div>
          </TableCell>
          <TableCell>
            <div className="max-w-[400px] text-wrap">
              <Badge
                className={getSignificanciaBadgeColor(
                  mapNivelSignificancia(risco.nivelSignificancia),
                )}
              >
                <small className="text-xs leading-none font-medium">
                  {risco.significancia} |{" "}
                  {mapNivelSignificancia(risco.nivelSignificancia)}
                </small>
              </Badge>
            </div>
          </TableCell>
          <TableCell className="text-right">
            {isUserEditor && <RiscosTableDropdownMenu risco={risco} />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
