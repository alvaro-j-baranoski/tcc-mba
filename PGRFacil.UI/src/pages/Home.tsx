import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ProgramasService } from "@/services/ProgramasService"

export default function Home() {
  const navigate = useNavigate()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['programas'],
    queryFn: ProgramasService.getProgramas,
  })

  if (!isPending && !isError) {
    console.log('Fetched programas:', data?.data)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the app</h1>
      <p className="mb-2 text-muted-foreground">You are signed in.</p>

      {isPending && <p className="mb-2 text-sm">Fetching from API/Programas...</p>}
      {error && <p className="mb-2 text-sm text-destructive">{error.message}</p>}

      <Button onClick={() => navigate('/login')}>Sign out</Button>
    </div>
  )
}
