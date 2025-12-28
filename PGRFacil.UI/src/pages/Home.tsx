import { useQuery } from "@tanstack/react-query"
import { ProgramasService } from "@/services/ProgramasService"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Home() {
  const { data } = useQuery({
    queryKey: ['programas'],
    queryFn: ProgramasService.getProgramas,
  })

  const { data: listOfProgramas } = data || { data: [] }

  return (
    <div className="flex min-h-svh flex-col my-8 mx-8">
      <h1 className="text-2xl font-semibold mb-4">Programas</h1>
      <Table>
        <TableHeader>
          <TableHead>Nome</TableHead>
          <TableHead>Responsável</TableHead>
        </TableHeader>
        <TableBody>
          {listOfProgramas.map((programa) => (
            <TableRow key={programa.guid}>
              <TableCell>{programa.nome}</TableCell>
              <TableCell>João Silva</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    // <div className="flex min-h-svh flex-col items-center justify-center">
    //   <h1 className="text-2xl font-semibold mb-4">Welcome to the app</h1>
    //   <p className="mb-2 text-muted-foreground">You are signed in.</p>

    //   {isPending && <p className="mb-2 text-sm">Fetching from API/Programas...</p>}
    //   {error && <p className="mb-2 text-sm text-destructive">{error.message}</p>}

    //   <Button onClick={() => navigate('/login')}>Sign out</Button>
    
    //   <div className="mt-6 w-full max-w-md">
    //     <h2 className="text-xl font-semibold mb-4">Programas:</h2>
    //     {listOfProgramas.length === 0 && !isPending && <p className="text-sm text-muted-foreground">No programas found.</p>}
    //     <ul className="list-disc list-inside">
    //       {listOfProgramas.map((programa) => (
    //         <li key={programa.guid} className="mb-1">
    //           {programa.nome} (GUID: {programa.guid})
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  )
}
