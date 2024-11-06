import {
  deleteProduct,
  getProductDetails,
  getProducts,
  registerProduct,
} from "@/services/product";
import { useMutation, useQuery } from "@tanstack/react-query";

import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { useAppStore } from "@/store";
import { Product } from "@/utils/products.interface";

const useDeleteProduct = () => {
  const { setLoader } = useAppStore();

  const { mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      setLoader(false);
    },
    onError: () => {
      setLoader(false);
    },
  });

  return { mutate };
};

const useProducts = (skip: number, search: string) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(search);
    }, 700);

    handler();

    return () => {
      handler.cancel();
    };
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", skip, debouncedSearch],
    queryFn: () => getProducts(skip, debouncedSearch),
  });

  return {
    products: data?.products,
    limit: data?.limit,
    skip: data?.skip,
    total: data?.total,
    isLoading,
    error,
  };
};
const useProductDetails = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });

  return {
    product: data,
    isLoading,
    error,
  };
};

const useRegisterProduct = () => {
  const { setLoader } = useAppStore();

  const { mutate } = useMutation({
    mutationKey: ["register-product"],
    mutationFn: (data: Product) => registerProduct(data),
    onSuccess: () => {
      setLoader(false);
    },
    onError: () => {
      setLoader(false);
    },
  });

  return { mutate };
};

export { useDeleteProduct, useProductDetails, useProducts, useRegisterProduct };
