"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Dropdown from "../Dropdown";

const Header: FC<{ name?: string }> = ({ name }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();

  return (
    <header className="bg-[#0a1d30] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <Image
            src="/icon/icon.jpeg"
            className="cursor-pointer"
            alt="Logo"
            width={70}
            height={70}
          />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isClient ? (
              <>
                {name ? (
                  <div className="flex items-center space-x-4">
                    <Link href="/register/product">
                      <p
                        className={`cursor-pointer select-none hover:bg-primary/80 p-2 rounded-md ${
                          pathname === "/register/product" ? "bg-primary" : ""
                        }`}
                      >
                        Register Product
                      </p>
                    </Link>

                    <Dropdown>
                      <p>{name}</p>
                    </Dropdown>
                  </div>
                ) : (
                  <li>
                    <Link href="/login" legacyBehavior>
                      <p
                        className={`cursor-pointer select-none hover:bg-primary/80 p-2 rounded-md ${
                          pathname === "/login" ? "bg-primary" : ""
                        }`}
                      >
                        Get Access
                      </p>
                    </Link>
                  </li>
                )}
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
