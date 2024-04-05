import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "./header-auth";
import SearchMirror from "./assets/svg/SearchMirror";

export async function Header() {
  return (
    <Navbar className="shadow mb-6 bg-white">
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-purple-800">
          Zaravault
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex items-center border-[2px] border-purple-800 rounded-md">
          <SearchMirror />
          <input
            className="px-3 py-1 md:w-[420px] text-sm border-none focus:border-none focus:outline-none rounded-md"
            placeholder="search products or categories"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
