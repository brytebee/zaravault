"use server";

import * as auth from "@/auth";

export async function signInGit() {
  return auth.signIn("github");
}

export async function signInGoog() {
  return auth.signIn("google");
}

export async function signOut() {
  return auth.signOut();
}
