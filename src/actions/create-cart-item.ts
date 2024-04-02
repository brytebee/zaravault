"use server";

import { auth } from "@/auth";
import { db } from "@/db";
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

  try {
    return await db.cartItem.create({
      data: {
        productId,
        cartId,
        quantity,
        wishlistId,
      },
    });
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
  // TODO: When it's not a visible path, what should be revalidated?
}
