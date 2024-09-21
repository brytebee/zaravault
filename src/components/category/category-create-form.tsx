"use client";

import React from "react";
import { useFormState } from "react-dom";
import { createCategory } from "@/actions";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import FormButton from "@/components/common/form-button";
import { Layers } from "lucide-react";

export default function CategoryCreateForm() {
  const [formState, action] = useFormState(createCategory, {});

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <Layers className="mx-auto h-12 w-12 text-purple-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create Category
          </h1>
        </div>
        <form action={action}>
          <div className="space-y-6">
            <Input
              name="name"
              label="Category Name"
              type="text"
              labelPlacement="outside"
              placeholder="e.g., Electronics"
              isInvalid={!!formState.errors?.name}
              errorMessage={formState.errors?.name?.join(", ")}
              className="w-full"
            />

            {formState.errors?._form && (
              <div className="rounded-lg border-2 border-red-500 bg-red-100 p-3 text-red-700">
                {formState.errors._form?.join(", ")}
              </div>
            )}

            <FormButton className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300 hover:from-purple-600 hover:to-indigo-700">
              Create Category
            </FormButton>

            <div className="text-center mt-4">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Cancel and return to home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
