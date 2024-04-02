"use client";

import { FormEvent, useState } from "react";
import FormButton from "../common/form-button";
import { createCart, createCartItem } from "@/actions";
import { useSession } from "next-auth/react";
import { cartStore } from "@/store";

interface Props {
  prod: {
    id: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function ProductToCart({ prod }: Props) {
  const session = useSession();
  const { addItem } = cartStore();
  const [error, setError] = useState(null);

  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const cart = await createCart();

      // @ts-ignore
      if (cart.errors) {
        // @ts-ignore
        setError(cart.errors);
      } else {
        // @ts-ignore
        formData.append("cartId", cart.id);
        formData.append("productId", prod.id);

        const item = await createCartItem(formData);
        addItem();
        // @ts-ignore
        if (item.errors) {
          // @ts-ignore
          setError(item.errors);
        }
      }
      // increase the count on the nnavbar
      // render cart on the cart page
    } catch (err: unknown) {
      if (err instanceof Error) {
        // @ts-ignore
        setError({ _form: err.message });
      }
    }
  };

  return (
    <form onSubmit={handler} className="mb-4">
      <p>{prod.slug}</p>
      <p>{prod.description}</p>
      <p className="mb-2">{prod.price}</p>

      {prod.quantity > 1 ? (
        <>
          <div className="my-2">
            <input
              type="number"
              name="quantity"
              min={1}
              max={prod.quantity}
              defaultValue={1}
            />
            {prod.quantity}
          </div>
          {/* @ts-ignore */}
          {error && <p className=" text-red-200">{error._form}</p>}
          {session.status === "authenticated" && (
            <FormButton>Add to Cart</FormButton>
          )}
        </>
      ) : (
        <>
          <span className="outline outline-4 outline-red-800 bg-yellow-600 p-2 my-4 rounded-md">
            Out of stock
          </span>
        </>
      )}
    </form>
  );
}
