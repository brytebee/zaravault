"use client";

import { createProduct } from "@/actions";
import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/form-button";
import Link from "next/link";

interface ProdCreateProps {
  catName: string;
}
export default function ProductCreateForm({ catName }: ProdCreateProps) {
  const [formState, action] = useFormState(
    createProduct.bind(null, catName),
    {}
  );
  return (
    <form action={action}>
      {formState.data?.message && (
        <p className="text-lime-500">{formState.data.message}</p>
      )}
      <div className="flex flex-col gap-4 p-4 w-80">
        <h1>Create Product</h1>
        <Input
          name="slug"
          label="Product name"
          type="text"
          labelPlacement="outside"
          placeholder="hand-bags"
          isInvalid={!!formState.errors?.slug}
          errorMessage={formState.errors?.slug?.join(", ")}
        />
        <Textarea
          name="description"
          label="Briefly describe product"
          type="text"
          labelPlacement="outside"
          placeholder="Add some description"
          isInvalid={!!formState.errors?.description}
          errorMessage={formState.errors?.description?.join(", ")}
        />
        <Input
          name="quantity"
          label="Quantity"
          type="number"
          labelPlacement="outside"
          placeholder="200"
          isInvalid={!!formState.errors?.quantity}
          errorMessage={formState.errors?.quantity?.join(", ")}
        />
        <Input
          name="price"
          label="Price ($)"
          type="number"
          labelPlacement="outside"
          placeholder="20.5"
          isInvalid={!!formState.errors?.price}
          errorMessage={formState.errors?.price?.join(", ")}
        />
        {formState.errors?._form ? (
          <div className="rounded border-[1px] bg-red-200">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <FormButton>Create Product</FormButton>
        <div>
          <p>
            Already registered{" "}
            <Link href="/api/auth/signin" className="underline text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
