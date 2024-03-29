'use server';

import { auth } from "@/auth";
import { createCart } from "./create-cart";
import { db } from "@/db";

export async function createCartItem() {
  const cart = await createCart();

  if (cart?.errors) {
    return {
      errors: {
        _form: ['Items wasn\'t added to cart, something went wrong!']
      }
    }
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be logged in to do this!']
      }
    }
  }

  try {
    // Update and pass the productID, wishlistID/cartId
    // Remember only one of them can be present ie. wishlist/cart
    await db.cartItem.create({
      data: {
        productId: '',
        cartId: '',
        quantity: 1,
        wishlistId: '',
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong, item  wasn\'t added to cart']
        }
      }
    }
  }
  // TODO: When it's not a visible path, what should be revalidated?
}