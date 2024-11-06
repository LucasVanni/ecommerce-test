import api from "@/services/api";
import { Product } from "@/utils/products.interface";

const getProducts = async (skip: number, search: string) => {
  const response = await api.get(`/products?skip=${skip}&search=${search}`);
  return response.data;
};

const getProductDetails = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

const registerProduct = async (data: Product) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: localStorage.getItem("access_token"),
    },
  });
  return response.data;
};

const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export { deleteProduct, getProductDetails, getProducts, registerProduct };
