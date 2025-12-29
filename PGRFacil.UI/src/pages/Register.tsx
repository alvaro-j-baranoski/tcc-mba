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
import { LoginService } from "@/services/LoginService";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/login");
  };

  const handleError = (error: AxiosError) => {
    if (error.response?.status === 400) {
      setErrorMessage("Email já está em uso. Por favor, use outro email.");
    } else {
      setErrorMessage(
        "Ocorreu um erro. Por favor, tente novamente mais tarde."
      );
    }
  };

  const mutation = useMutation({
    mutationFn: LoginService.registerUser,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { mutate, isPending } = mutation;

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
              <FieldLegend>Criar uma conta</FieldLegend>
              <FieldDescription>
                Insira suas credenciais para criar uma conta.
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
                {isPending ? "Criando..." : "Criar uma conta"}
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Voltar ao login
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
