"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import path from "@/path";
import { CartItem } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CartSchema = z.object({
  quantity: z.coerce.number().gte(1, "Qty must be above 1"),
});

export async function createCartItem(formData: FormData) {
  const validate = CartSchema.safeParse({
    quantity: formData.get("quantity"),
  });

  if (!validate.success) {
    return {
      errors: { _form: validate.error.flatten().fieldErrors.quantity },
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged in to do this!"],
      },
    };
  }

  const { quantity } = validate.data;
  const productId = formData.get("productId") as string;
  const cartId = formData.get("cartId") as string;
  const wishlistId = formData.get("wishlistId") as string;
  let returnedItem: CartItem;

  try {
    const existing = await db.cart.findFirst({
      where: { items: { some: { productId } } },
      include: { items: { where: { productId }, select: { productId: true } } },
    });

    if (existing) {
      const existingItem = await db.cartItem.findFirst({
        where: { productId },
      });

      if (existingItem?.quantity) {
        returnedItem = await db.cartItem.update({
          where: { id: existingItem?.id },
          data: { quantity: existingItem?.quantity + quantity },
        });
      }
    } else {
      returnedItem = await db.cartItem.create({
        data: {
          productId,
          cartId,
          quantity,
          wishlistId,
        },
      });
    }
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
          _form: ["Something went wrong, item  wasn't added to cart"],
        },
      };
    }
  }
  revalidatePath(path.cart());
  // @ts-ignore
  return returnedItem;
}
