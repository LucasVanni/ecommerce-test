import api from "./api";

const register = async (data: { email: string; password: string }) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export { register };
