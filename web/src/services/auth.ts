import api from "./api";

const getUserInfo = async (email: string) => {
  const response = await api.get(`/users/${email}`);
  return response.data;
};

const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

const recoveryPassword = async (data: { email: string }) => {
  const response = await api.post("/auth/recovery-password", data);
  return response.data;
};

const recoveryPasswordToken = async (data: {
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  if (data.password !== data.confirmPassword) {
    throw new Error("As senhas não coincidem.");
  }

  const response = await api.put("/auth/reset-password", data);
  return response.data;
};

export { getUserInfo, login, recoveryPassword, recoveryPasswordToken };
