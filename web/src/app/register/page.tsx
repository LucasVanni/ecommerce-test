"use client";

import Form from "@/components/Form";
import Input from "@/components/Input";
import { useUserRegister } from "@/hooks/users";
import { useAppStore } from "@/store";
import { useState } from "react";

import { useRouter } from "next/navigation";

const Register = () => {
  const { mutate } = useUserRegister();
  const router = useRouter();

  const { setLoader } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoader(true);

    mutate({
      email,
      password,
      name,
    });

    router.push("/login");
  };

  return (
    <Form
      title="Register"
      handleSubmit={handleSubmit}
      leftButtonText="Register"
      rightButtonText="Back"
      rightLink="/login"
    >
      <Input
        label="Nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

export default Register;
