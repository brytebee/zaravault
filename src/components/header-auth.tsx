"use client";

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import Link from "next/link";
import Cart from "./assets/svg/Cart";
import { cartStore } from "@/store";
import path from "@/path";
import { useEffect } from "react";

interface HeaderAuthProps {
  cart: string[];
}

export default function HeaderAuth({ cart }: HeaderAuthProps) {
  const session = useSession();
  const { ids, setIds } = cartStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cart", JSON.stringify(cart));
      setIds(cart);
    }
  }, [cart, setIds]);

  if (session.status === "loading") {
    return null;
  }

  if (session.data?.user) {
    return (
      <>
        <NavbarItem>
          <Link className="flex items-center" href={path.cart()}>
            <Cart count={ids.length} />
            <span className="ml-1 hidden sm:inline">Cart</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src={session.data.user.image || ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu actions" color="secondary">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">{session.data.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="orders">My Orders</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <form action={actions.signOut}>
                  <Button type="submit" className="text-purple-800 w-full">
                    Sign Out
                  </Button>
                </form>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </>
    );
  }

  return (
    <>
      <NavbarItem>
        <Link href="/api/auth/signin">
          <Button className="text-purple-800" variant="bordered">
            Sign In
          </Button>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/api/auth/register">
          <Button className="bg-purple-800 text-white">Sign Up</Button>
        </Link>
      </NavbarItem>
    </>
  );
}
