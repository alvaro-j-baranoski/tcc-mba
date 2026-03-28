import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import "react-loading-skeleton/dist/skeleton.css";

export default function GheTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <strong>Nome</strong>
        </TableHead>
        <TableHead>
          <strong>Versão</strong>
        </TableHead>
        <TableHead>
          <strong>Número de riscos</strong>
        </TableHead>
        <TableHead>
          <strong>Atualizado</strong>
        </TableHead>
        <TableHead className="text-right"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
