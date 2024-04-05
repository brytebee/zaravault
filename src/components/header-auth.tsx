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

export default function HeaderAuth() {
  const session = useSession();
  const { count } = cartStore();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <>
        <Link className="flex" href="/cart">
          <Cart count={count} />
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
