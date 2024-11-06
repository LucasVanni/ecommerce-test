import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "cdn.dummyjson.com"],
  },
  rewrites: async () => {
    return [
      {
        source: "/recovery/password",
        destination: "/recovery-password",
      },
      {
        source: "/register",
        destination: "/register",
      },
      {
        source: "/product/details/:id",
        destination: "/product-details/:id",
      },
      {
        source: "/register/product",
        destination: "/register-product",
      },
    ];
  },
};

export default nextConfig;
