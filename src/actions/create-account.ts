"use server";

export async function createAccount(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
}
