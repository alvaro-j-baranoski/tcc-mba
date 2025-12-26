import { Button } from '@/components/ui/button'
import { LoginService } from '@/services/LoginService'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSuccess = () => navigate('/app')
  const handleError = (error: AxiosError) => {
    console.log('Login error:', error)

        // const text = await res.text()
        // // Try to parse JSON error message if available
        // let msg = text
        // const json = JSON.parse(text)
        // msg = json?.message ?? JSON.stringify(json)
        // setError(`Login failed: ${res.status} ${res.statusText} ${msg}`)
        // return

  }

  const mutation = useMutation({
    mutationFn: LoginService.loginUser,
    onError: handleError,
    onSuccess: handleSuccess,
  })

  const { mutate, error, isPending } = mutation
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate({ email, password })
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Sign in to your account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm text-destructive">{error.message}</p> : null}

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending || !email || !password}>
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
