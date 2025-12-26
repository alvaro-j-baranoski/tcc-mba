import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getProgramas() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("https://localhost:65180/API/Programas", {
          method: "GET",
          credentials: "include",
        })

        if (!res.ok) {
          const text = await res.text()
          let msg = text
          const json = JSON.parse(text)
          msg = json?.message ?? JSON.stringify(json)
          setError(`GET failed: ${res.status} ${res.statusText} ${msg}`)
          return
        }

        console.log("GET to API/Programas succeeded")
      } catch (err) {
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    getProgramas()
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the app</h1>
      <p className="mb-2 text-muted-foreground">You are signed in.</p>

      {loading && <p className="mb-2 text-sm">Fetching from API/Programas...</p>}
      {error && <p className="mb-2 text-sm text-destructive">{error}</p>}

      <Button onClick={() => navigate('/login')}>Sign out</Button>
    </div>
  )
}
