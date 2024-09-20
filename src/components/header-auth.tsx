"use client";

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
  let authContent: React.ReactNode;

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cart", JSON.stringify(cart));
      setIds(cart);
    }
  }, [cart, setIds]);

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <>
        <Link className="flex" href={path.cart()}>
          <Cart count={ids.length} />
          Cart
        </Link>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <form action={actions.signOut}>
              <Button type="submit" className="text-purple-800">
                Sign Out
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <Link href="/api/auth/signin">
            <Button
              type="submit"
              className="text-purple-800"
              variant="bordered"
            >
              Sign In
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/api/auth/register">
            <Button type="submit" className="text-purple-800" variant="flat">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}
