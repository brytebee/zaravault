"use client";

import {
  Avatar,
  Button,
  Image,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import Link from "next/link";
import Cart from "./assets/svg/Cart";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <>
        <Link className="flex" href="/cart">
          <Cart count={5} />
          Cart
        </Link>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
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
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/api/auth/register">
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
