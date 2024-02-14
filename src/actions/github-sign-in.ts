"use server";

import * as auth from "@/auth";

export async function signInGit() {
  return auth.signIn("github");
}
