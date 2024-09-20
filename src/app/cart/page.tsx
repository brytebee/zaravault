import { auth } from "@/auth";
import { db } from "@/db";
import { CartProvider } from "@/context/cart-context"; // Import CartProvider
import CartClient from "@/components/cart/CartClient";

export default async function CartPage() {
  const session = await auth();
  const cart = await db.cart.findFirst({
    where: { userId: session?.user.id },
    select: {
      _count: true,
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              slug: true,
              price: true,
              quantity: true,
              description: true,
              images: true,
              category: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    throw new Error("Something went wrong, item not added to cart!");
  }

  const { items } = cart;

  return (
    <CartProvider initialItems={items}>
      {" "}
      {/* Wrap CartClient with CartProvider */}
      <CartClient />
    </CartProvider>
  );
}
