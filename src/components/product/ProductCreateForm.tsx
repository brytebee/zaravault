"use client";

import React, { useState } from "react";
import { createProduct } from "@/actions";
import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/form-button";
import { ShoppingBag } from "lucide-react";

interface ProdCreateProps {
  catName: string;
}

export default function ProductCreateForm({ catName }: ProdCreateProps) {
  const [formState, action] = useFormState(
    createProduct.bind(null, catName),
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await action(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <ShoppingBag className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create Product
          </h1>
          <p className="mt-2 text-gray-600">
            Add a new product to the {catName} category
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formState.data?.message && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
              role="alert"
            >
              <p>{formState.data.message}</p>
            </div>
          )}
          <Input
            name="slug"
            label="Product Name"
            type="text"
            labelPlacement="outside"
            placeholder="e.g., leather-handbag"
            isInvalid={!!formState.errors?.slug}
            errorMessage={formState.errors?.slug?.join(", ")}
            required
            className="w-full"
          />
          <Textarea
            name="description"
            label="Product Description"
            labelPlacement="outside"
            placeholder="Briefly describe the product..."
            isInvalid={!!formState.errors?.description}
            errorMessage={formState.errors?.description?.join(", ")}
            required
            className="w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="quantity"
              label="Quantity"
              type="number"
              labelPlacement="outside"
              placeholder="200"
              isInvalid={!!formState.errors?.quantity}
              errorMessage={formState.errors?.quantity?.join(", ")}
              required
            />
            <Input
              name="price"
              label="Price ($)"
              type="number"
              labelPlacement="outside"
              placeholder="20.50"
              isInvalid={!!formState.errors?.price}
              errorMessage={formState.errors?.price?.join(", ")}
              required
            />
          </div>
          {formState.errors?._form && (
            <div className="rounded-lg border-2 border-red-500 bg-red-100 p-3 text-red-700">
              {formState.errors._form.join(", ")}
            </div>
          )}
          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:from-blue-600 hover:to-teal-600"
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </FormButton>
        </form>
      </div>
    </div>
  );
}
