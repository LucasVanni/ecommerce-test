"use client";

import Header from "@/components/Header";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import { useProducts } from "@/hooks/products";
import { useAppStore } from "@/store";
import { useState } from "react";

const Home = () => {
  const { user } = useAppStore();
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;
  const { products, total } = useProducts(skip, search);

  return (
    <>
      <Header name={user?.name} />
      <main className="container mb-10 mx-auto mt-10">
        <section className="products">
          <h2 className="text-2xl font-bold mb-4">Products</h2>

          <div className="w-full bg-slate-50 p-4 border rounded-md">
            <Input
              label="Search products"
              type="text"
              placeholder="Type to find a specific product"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSkip(0);
              }}
            />
            {!products ? (
              <div className="flex flex-1 py-10 justify-center items-center w-full ">
                <Loader type="component" />
              </div>
            ) : (
              <ProductList products={products} />
            )}
            <Pagination
              dataPerPage={limit}
              total={total}
              paginateFront={() => {
                setSkip(skip + limit);
              }}
              paginateBack={() => {
                setSkip(skip - limit);
              }}
              currentPage={Math.floor(skip / limit) + 1}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
