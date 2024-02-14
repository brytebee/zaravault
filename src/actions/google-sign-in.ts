"use server";

import * as auth from "@/auth";

export async function signInGoog() {
  return auth.signIn("google");
}
