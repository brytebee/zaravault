import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "./header-auth";
import SearchMirror from "./assets/svg/SearchMirror";
import fetchCart from "@/actions/fetch-cart";
import { useState } from "react";

export async function Header() {
  let cartArray: string[] = [];
  const userCart = await fetchCart();
  if (userCart) {
    cartArray = userCart.map((id) => id.productId);
  }

  return (
    <Navbar
      maxWidth="full"
      className="shadow bg-white"
      classNames={{
        base: "py-2 md:py-3",
        wrapper: "px-4 sm:px-6 lg:px-8",
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-xl sm:text-2xl text-purple-800"
          >
            Zaravault
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-2xl text-purple-800">
            Zaravault
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem className="flex items-center border-2 border-purple-800 rounded-md">
          <SearchMirror />
          <input
            className="px-3 py-1 w-[200px] md:w-[300px] lg:w-[420px] text-sm border-none focus:border-none focus:outline-none rounded-md"
            placeholder="Search products or categories"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth cart={cartArray} />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/" className="w-full">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/categories" className="w-full">
            Categories
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/deals" className="w-full">
            Deals
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <div className="w-full mt-4">
            <input
              className="w-full px-3 py-2 border-2 border-purple-800 rounded-md"
              placeholder="Search products or categories"
            />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
