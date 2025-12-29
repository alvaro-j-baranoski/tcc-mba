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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSuccess = (success: AxiosResponse) => {
    LoginService.handleSuccess(success.data as LoginResponse);
    navigate("/home");
  };

  const handleError = (error: AxiosError) => {
    console.log("Login error:", error);
  };

  const mutation = useMutation({
    mutationFn: LoginService.loginUser,
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal">
              <Button type="submit" disabled={isPending || !email || !password}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </Field>
          </FieldGroup>

          {/* {error ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending || !email || !password}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div> */}
        </form>
      </div>
    </div>
  );
}
