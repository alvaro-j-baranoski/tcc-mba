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
import { LoginService, type LoginResponse } from "@/services/LoginService";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSuccess = (success: AxiosResponse) => {
    LoginService.handleSuccess(success.data as LoginResponse);
    navigate("/login");
  };

  const handleError = (error: AxiosError) => {
    console.log("Login error:", error);
  };

  const mutation = useMutation({
    mutationFn: LoginService.registerUser,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { mutate, error, isPending } = mutation;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

            <Field orientation="horizontal">
              <Button type="submit" disabled={isPending || !email || !password}>
                {isPending ? "Criando..." : "Criar uma conta"}
              </Button>
              <Button onClick={() => {navigate("/login")}}>
                Voltar ao login
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
