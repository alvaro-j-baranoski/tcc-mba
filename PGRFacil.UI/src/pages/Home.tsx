import { useQuery } from "@tanstack/react-query"
import { ProgramasService } from "@/services/ProgramasService"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddNewProgramaDialog } from "@/components/dialogs/AddNewProgramaDialog"
import { DeleteProgramaDialog } from "@/components/dialogs/DeleteProgramaDialog"

export default function Home() {

  const { data: getProgramasData, refetch: getProgramasRefetch } = useQuery({
    queryKey: ['programas'],
    queryFn: ProgramasService.getProgramas
  })

  const { data: listOfProgramas } = getProgramasData || { data: [] }

  // const addNewPrograma = () => {
  //   // Logic to add a new programa
  //   // After adding, refetch the list
  //   getProgramasRefetch()
  // }

  return (
    <div className="flex min-h-svh flex-col my-8 mx-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Programas</h1>
        <AddNewProgramaDialog/>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfProgramas.map((programa) => (
            <TableRow key={programa.guid}>
              <TableCell>{programa.nome}</TableCell>
              <TableCell>João Silva</TableCell>
              <TableCell>
                <DeleteProgramaDialog nome={programa.nome} guid={programa.guid}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
