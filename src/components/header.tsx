import {
  Input,
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
        <Link href="/" className="font-bold text-purple-800">
          Zaravault
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex items-center border-[2px] border-purple-800 rounded-md">
          <SearchMirror />
          <input
            className="px-3 py-1 md:w-[420px] text-sm border-none focus:border-none focus:outline-none"
            placeholder="search products or categories"
          />
          {/* <div className="flex items-center">
            <SearchMirror />
            <input
              type="text"
              placeholder="Search..."
              className="search-input flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
