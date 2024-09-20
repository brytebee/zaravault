"use client";

import { FormEvent, useState } from "react";
import FormButton from "@/components/common/form-button";
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
  const { data: session, status } = useSession();
  const { addItem } = cartStore();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleIncrement = () => {
    if (quantity < prod.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const cart = await createCart();

      if ("errors" in cart) {
        setError(cart.errors._form?.[0] || "An error occurred");
      } else {
        formData.append("cartId", cart.id);
        formData.append("productId", prod.id);
        formData.append("quantity", quantity.toString());

        const item = await createCartItem(formData);

        if ("errors" in item) {
          setError(item.errors._form?.[0] || "An error occurred");
        } else {
          addItem(prod.id);
          setError(null); // Clear error if everything is successful
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handler} className="mb-4 border rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
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

      {prod.quantity > 0 ? (
        <>
          <div className="flex items-center my-2">
            <button
              type="button"
              onClick={handleDecrement}
              className="py-1 px-2 border border-gray-300 rounded-md mr-2"
            >
              -
            </button>
            <p className="text-gray-600">{quantity}</p>
            <button
              type="button"
              onClick={handleIncrement}
              className="py-1 px-2 border border-gray-300 rounded-md ml-2"
            >
              +
            </button>
            <p className="text-gray-600 ml-2">In stock: {prod.quantity}</p>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {status === "authenticated" && <FormButton>Add to Cart</FormButton>}
        </>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
          Out of stock
        </div>
      )}
    </form>
  );
}
