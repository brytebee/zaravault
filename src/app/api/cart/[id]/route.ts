// src/app/api/cart/[id]/route.ts
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await db.cartItem.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Item removed successfully" });
}
