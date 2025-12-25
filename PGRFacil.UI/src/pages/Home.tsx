import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the app</h1>
      <p className="mb-6 text-muted-foreground">You are signed in.</p>
      <Button onClick={() => navigate('/login')}>Sign out</Button>
    </div>
  )
}
