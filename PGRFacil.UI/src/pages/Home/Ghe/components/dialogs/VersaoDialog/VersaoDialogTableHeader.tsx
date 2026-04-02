import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function VersaoDialogTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>
                    <strong>Versão</strong>
                </TableHead>
                <TableHead>
                    <strong>Observações</strong>
                </TableHead>
                <TableHead>
                    <strong>Data de Criação</strong>
                </TableHead>
                <TableHead className="text-right"></TableHead>
            </TableRow>
        </TableHeader>
    );
}
