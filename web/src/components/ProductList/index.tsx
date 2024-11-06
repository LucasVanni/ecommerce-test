import { useDeleteProduct } from "@/hooks/products";
import { Product } from "@/utils/products.interface";
import { Button } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ProductList = ({ products }: { products: Product[] }) => {
  const { mutate } = useDeleteProduct();

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <div className="mt-6  grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products?.map((product) => (
        <div key={product.id} className="group relative">
          <div
            className="ursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/product/details/${product.id}`;
            }}
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-95 lg:h-80">
              {product.images && product.images.length > 0 && (
                <Image
                  alt={product.title}
                  src={product.images[0]}
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                  width={400}
                  height={400}
                />
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product?.id || "");
                  }}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
