"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { Category } from "@prisma/client";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import path from "@/path";
import { redirect } from "next/navigation";

interface CatData {
  errors?: {
    name?: string[] | null;
    _form?: string[] | null;
  };
}

const CatSchema = z.object({
  name: z.string().min(3),
});

export async function createCategory(
  formState: CatData,
  formData: FormData
): Promise<CatData> {
  const validate = CatSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const { name } = validate.data;

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You need to login to perform this action!"],
      },
    };
  }

  let cat: Category;

  try {
    cat = await db.category.create({
      data: {
        name,
      },
    });
  } catch (err: unknown) {
    // @ts-ignore
    if (err.code === "P2002") {
      return {
        errors: {
          _form: [`A category for ${name} already exists!`],
        },
      };
    }

    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong!"],
        },
      };
    }
  }

  revalidatePath(path.home());
  redirect(path.categoryShow(cat.name));
}
