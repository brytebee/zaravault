"use client";

import { FormEvent, useState } from "react";
import FormButton from "../common/form-button";
import { createCart, createCartItem } from "@/actions";
import { useSession } from "next-auth/react";
import { cartStore } from "@/store";
import Image from "next/image";
import { Product } from "@prisma/client";

type Props = Product & {
  images: { url: string | null; productId: string }[];
};

interface ProdProps {
  prod: Props;
}

export default function ProductToCart({ prod }: ProdProps) {
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

        addItem(prod.id);
        // @ts-ignore
        if (item.errors) {
          // @ts-ignore
          setError(item.errors);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // @ts-ignore
        setError({ _form: err.message });
      }
    }
  };

  return (
    <form onSubmit={handler} className="mb-4 border rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        {/* Add multi image funtionality later */}
        <Image
          src={prod.images?.[0]?.url ?? ""}
          alt={prod.slug}
          width={100}
          height={100}
          className="rounded-lg mr-4"
        />
        <div>
          <p className="text-lg font-semibold">{prod.slug}</p>
          <p className="text-gray-600">{prod.description.slice(0, 20)}</p>
          <p className="text-gray-800 font-semibold">${prod.price}</p>
        </div>
      </div>

      {prod.quantity > 1 ? (
        <>
          <div className="flex items-center my-2 h-fit">
            <input
              type="number"
              name="quantity"
              min={1}
              max={prod.quantity}
              defaultValue={1}
              className="w-16 py-1 px-2 border border-gray-300 rounded-md mr-2"
            />
            <p className="text-gray-600">In stock: {prod.quantity}</p>
          </div>
          {/* @ts-ignore */}
          {error && <p className="text-red-500">{error._form}</p>}
          {session.status === "authenticated" && (
            <FormButton>Add to Cart</FormButton>
          )}
        </>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
          Out of stock
        </div>
      )}
    </form>
  );
}
