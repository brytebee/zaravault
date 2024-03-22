"use client";

import { useFormState } from "react-dom";
import { createCategory } from "@/actions";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import FormButton from "@/components/common/form-button";

export default function CategoryCreateForm() {
  const [formState, action] = useFormState(createCategory, {});

  return (
    <div>
      <form action={action}>
        <div className="flex flex-col gap-4 p-4 w-80">
          <h1>Category create form</h1>
          <Input
            name="name"
            label="Name"
            type="text"
            labelPlacement="outside"
            placeholder="Jane Doe"
            isInvalid={!!formState.errors?.name}
            errorMessage={formState.errors?.name?.join(", ")}
          />

          {formState.errors?._form && (
            <div className="rounded border-[1px] bg-red-200">
              {formState.errors._form?.join(", ")}
            </div>
          )}
          <FormButton>Create</FormButton>
          <div>
            <p>
              <Link href="/" className="underline text-blue-400">
                Cancel
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
