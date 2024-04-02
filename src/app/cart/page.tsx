import { auth } from "@/auth";
import { db } from "@/db";

export default async function CartPage() {
  const session = await auth();
  const cart = await db.cart.findFirst({ where: { userId: session?.user.id } });
  if (!cart) {
    throw new Error("Something went wrong, item not added to cart!");
  }
  const cartItems = await db.cartItem.findMany({
    where: { cartId: cart.id },
  });

  return (
    <div>
      <h1>This is the cart page</h1>
      {cartItems.length &&
        cartItems.map((item) => (
          <div key={item.id}>
            <h4>{item.productId}</h4>
            <h4>{item.quantity}</h4>
            <h4>{item.cartId}</h4>
          </div>
        ))}
    </div>
  );
}
