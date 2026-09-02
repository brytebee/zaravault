// src/app/api/cart/[id]/quantity/route.ts
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { quantity } = await req.json();

  if (quantity < 1) {
    return NextResponse.json(
      { error: "Quantity must be at least 1" },
      { status: 400 }
    );
  }

  const updatedItem = await db.cartItem.update({
    where: { id: params.id },
    data: { quantity },
  });

  return NextResponse.json(updatedItem);
}
