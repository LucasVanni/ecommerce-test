"use client";
import { useAppStore } from "@/store";

import Form from "@/components/Form";
import Input from "@/components/Input";
import { useRegisterProduct } from "@/hooks/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const { mutate } = useRegisterProduct();
  const router = useRouter();
  const { setLoader, user } = useAppStore();

  useEffect(() => {
    if (!user?.name) {
      router.push("/login");
    }
  }, [user?.name, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoader(true);

    mutate({
      title,
      description,
      price: Number(price),
      stock: Number(stock),
      images: [image?.name || ""],
    });

    router.push("/");
  };

  return (
    <Form
      userName={user?.name}
      title="Register Product"
      handleSubmit={handleSubmit}
      leftButtonText="Register"
      rightButtonText="Back"
      rightLink="/"
    >
      <Input
        label="Nome"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="Imagem"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
          }
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Preview"
          className="mt-2"
          width={100}
          height={100}
        />
      )}
      <Input
        label="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
    </Form>
  );
};

export default RegisterProduct;
