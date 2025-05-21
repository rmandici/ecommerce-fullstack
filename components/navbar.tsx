"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 text-black font-bold">
        <Link href="/">
          <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-4 py-2 rounded-full">
            My Ecommerce
          </div>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-2 py-2 rounded-full">
              Home{" "}
            </div>
          </Link>
          <Link href="/products">
            <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-2 py-2 rounded-full">
              Products{" "}
            </div>
          </Link>
          <Link href="/checkout">
            <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-2 py-2 rounded-full">
              Checkout{" "}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout">
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {" "}
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li className="text-black block">
              <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-2 py-2 rounded-full">
                <Link href={"/"}> Home </Link>
              </div>
              <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-2 py-2 rounded-full">
                <Link href={"/products"}> Products</Link>
              </div>
              <div className="transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 hover:text-white hover:shadow-md px-2 py-2 rounded-full">
                <Link href={"/checkout"}> Checkout</Link>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
