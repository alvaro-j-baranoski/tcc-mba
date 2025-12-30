import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { onUnauthorized } from "@/services/client";
import { LoginService, type LoginResponse } from "@/services/LoginService";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle global unauthorized errors. Will listen only once during the app lifecycle.
    onUnauthorized(() => {
      toast.error("Sessão expirada. Por favor, faça login novamente.");
      navigate("/login");
    });
  }, [navigate]);

  const handleSuccess = (success: AxiosResponse) => {
    LoginService.handleSuccess(success.data as LoginResponse);
    navigate("/home");
  };

  const handleError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
    } else {
      setErrorMessage("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: LoginService.loginUser,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    mutate({ email, password });
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Login</FieldLegend>
              <FieldDescription>
                Entre na sua conta para continuar.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled={isPending}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    disabled={isPending}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="h-5">
              {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
              )}
            </div>

            <Field orientation="horizontal">
              <Button type="submit" disabled={isPending || !email || !password}>
                {isPending ? "Entrando..." : "Entrar"}
              </Button>
              <Button onClick={() => {navigate("/register")}}>
                Criar uma conta
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
