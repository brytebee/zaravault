"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Cart } from "@prisma/client";

export async function createCart() {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You need to login to do this!"],
      },
    };
  }

  let cart: Cart | null;
  try {
    cart = await db.cart.findFirst({
      where: { userId: session.user.id },
    });
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
      });
    }
    return cart;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong, cart isn't created"],
        },
      };
    }
  }
}
