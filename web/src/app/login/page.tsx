"use client";

import Form from "@/components/Form";
import Input from "@/components/Input";
import { useLogin } from "@/hooks/auth";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const { mutate } = useLogin();
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { setLoader } = useAppStore();

  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoader(true);

    mutate({
      email,
      password,
    });

    router.push("/");
  };

  return (
    <Form
      title="Login"
      handleSubmit={handleSubmit}
      leftButtonText="Make Login"
      rightButtonText="Register"
      rightLink="/register"
      recoveryLink
    >
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isPassword
      />
    </Form>
  );
};

export default Login;
