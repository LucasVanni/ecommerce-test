"use client";

import Form from "@/components/Form";
import Input from "@/components/Input";
import { useRecoveryPassword, useRecoveryPasswordToken } from "@/hooks/auth";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RecoveryPassword = () => {
  const { mutate } = useRecoveryPassword();
  const { mutate: mutateRecoveryPasswordToken } = useRecoveryPasswordToken();

  const { setLoader } = useAppStore();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoader(true);

    const currentUrl = window.location.href;

    if (token) {
      mutateRecoveryPasswordToken({
        token,
        password,
        confirmPassword,
      });

      router.push("/login");
    } else {
      mutate({
        email,
        recoveryLink: currentUrl,
      });
    }
  };

  return (
    <Form
      title="Recuperar senha"
      handleSubmit={handleSubmit}
      leftButtonText="Enviar"
      rightButtonText="Voltar"
      rightLink="/login"
    >
      {token ? (
        <>
          <Input
            label="Nova Senha"
            type="password"
            value={password}
            isPassword
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirmar Nova Senha"
            type="password"
            value={confirmPassword}
            isPassword
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      ) : (
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
    </Form>
  );
};

export default RecoveryPassword;
