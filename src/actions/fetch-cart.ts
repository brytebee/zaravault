"use server";

import { auth } from "@/auth";
import { db } from "@/db";

export default async function fetchCart() {
  const session = await auth();
  const items = await db.cart.findFirst({
    where: { userId: session?.user.id },
    include: { items: { select: { productId: true } } },
  });
  return items?.items;
}
