"use client";

import { FormEvent } from "react";
import FormButton from "../common/form-button";
import { createCart } from "@/actions";
import { useFormState } from "react-dom";

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
  const [formState, cartAction] = useFormState(createCart, {});
  const [formStateForItem, itemAction] = useFormState(createCart, {});
  // const handler = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     // get the cartID if exist
  //     // create a new cart for user
  //     const cart = await cartAction();
  //     console.log(cart);

  //     // create a new cart item
  //     const item = await itemAction();
  //     console.log(item);

  //     // increase the count on the nnavbar
  //     // render cart on the cart page
  //   } catch (error) {
  //     // handle errors
  //   }
  // };

  return (
    <form action={cartAction} className="mb-4">
      {formState?.errors?._form && (
        <p className=" text-red-200">{formState.errors._form}</p>
      )}
      <p>{prod.slug}</p>
      <p>{prod.description}</p>
      <p className="mb-2">{prod.price}</p>

      {prod.quantity > 1 ? (
        <>
          <div className="my-2">
            <input
              type="number"
              name=""
              min={1}
              max={prod.quantity}
              defaultValue={1}
            />
            {prod.quantity}
          </div>
          <FormButton>Add to Cart</FormButton>
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
