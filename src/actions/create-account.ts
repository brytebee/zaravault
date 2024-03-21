"use server";

import { db } from "@/db";
import { generateCode, generateTime, sendCodeToEmail } from "@/utils";
import { from, product } from "@/utils/constants";
import { hash } from "bcrypt";
import { z } from "zod";

interface RegisterState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  data?: {
    message?: string[];
  };
}

const RegisterSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function createAccount(
  formState: RegisterState,
  formData: FormData
) {
  const validate = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validate.data;

  // Create the account
  // // Check if thr email is already registered
  const existing = await db.user.findUnique({ where: { email } });

  if (existing) {
    return {
      errors: {
        _form: [`Account with ${email} already exists!`],
      },
    };
  }
  // // hash password
  const hashedPass = await hash(password, 10);

  // // Ccreate the user
  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });

    // // Generate code and send to their email
    const token = generateCode(8);
    const _45mins = generateTime(45);

    // // Encrypt the code into a token
    // const token = encryptCode(code);

    // // Save to DB verificationToken
    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: _45mins,
      },
    });

    const domain = from as string;
    const productName = product as string;

    const emailPayload = {
      from: domain,
      to: [email],
      subject: "Confirm your email",
      product: productName,
      firstName: name.split(" ")[0],
      code: token,
    };

    await sendCodeToEmail(emailPayload);
    return {
      data: {
        message: [`Account created successfully! Check ${email} to proceed!`],
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }
    return {
      errors: {
        _form: ["Something went wrong."],
      },
    };
  }
}
