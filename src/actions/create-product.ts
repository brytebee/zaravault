"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import path from "@/path";
import { redirect } from "next/navigation";

interface ProductState {
  errors?: {
    slug?: string[];
    description?: string[];
    quantity?: string[];
    price?: string[];
    _form?: string[];
  };
  data?: {
    message?: string[];
  };
}

const CreateProductSchema = z.object({
  slug: z
    .string()
    .min(3)
    .regex(/^[-a-zA-Z0-9]+$/),
  description: z.string().min(10),
  quantity: z.coerce.number().gte(1),
  price: z.coerce.number().gte(0.01),
});

export async function createProduct(
  catName: string,
  formState: ProductState,
  formData: FormData
): Promise<ProductState> {
  const validate = CreateProductSchema.safeParse({
    slug: formData.get("slug"),
    description: formData.get("description"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
  });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You need to login to perform this action!"],
      },
    };
  }

  const cat = await db.category.findFirst({ where: { name: catName } });
  if (!cat) {
    return {
      errors: {
        _form: ["Category not found!"],
      },
    };
  }

  try {
    await db.product.create({
      data: { ...validate.data, categoryId: cat.id },
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
  revalidatePath(path.products(catName));
  redirect(path.products(catName));
}
