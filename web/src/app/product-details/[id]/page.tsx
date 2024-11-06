"use client";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Review from "@/components/Review/indext";
import { useProductDetails } from "@/hooks/products";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();

  const { product } = useProductDetails(id as string);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!product) {
    return <Loader type="page" />;
  }

  const handleImageClick = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-gray-100 dark:bg-gray-800 py-8 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <Image
                  className="w-full h-full object-contain"
                  src={product.images[mainImageIndex]}
                  alt={`${product.title} - 1`}
                  width={900}
                  height={900}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-2 mt-2">
                  {product.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="w-20 h-20 mb-5 rounded-lg bg-gray-300 dark:bg-gray-700 cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        className="w-full h-full object-contain"
                        src={image}
                        alt={`${product.title} - ${index + 1}`}
                        width={80}
                        height={80}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Review reviews={product.reviews} />
      </main>
    </div>
  );
};

export default ProductDetail;
