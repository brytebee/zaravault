"use client";

import { createAccount } from "@/actions";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/form-button";
import Link from "next/link";

export default function CreateAccountPage() {
  const [formState, action] = useFormState(createAccount, {});
  return (
    <form action={action}>
      {formState.data?.message && (
        <p className="text-lime-500">{formState.data.message}</p>
      )}
      <div className="flex flex-col gap-4 p-4 w-80">
        <h1>Create Account</h1>
        <Input
          name="name"
          label="Name"
          type="text"
          labelPlacement="outside"
          placeholder="Jane Doe"
          isInvalid={!!formState.errors?.name}
          errorMessage={formState.errors?.name?.join(", ")}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          labelPlacement="outside"
          placeholder="janedoe@email.com"
          isInvalid={!!formState.errors?.email}
          errorMessage={formState.errors?.email?.join(", ")}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          labelPlacement="outside"
          placeholder="********"
          isInvalid={!!formState.errors?.password}
          errorMessage={formState.errors?.password?.join(", ")}
        />
        {formState.errors?._form ? (
          <div className="rounded border-[1px] bg-red-200">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <FormButton>Register</FormButton>
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
