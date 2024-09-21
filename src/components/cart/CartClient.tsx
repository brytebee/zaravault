"use client";

import PlusMinusButton from "@/components/common/plus-minus-buttons";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { cartStore } from "@/store/cartStore";
import CartSummary from "@/components/cart/CartSummary";
import Link from "next/link";
import path from "@/path";
import { useState } from "react";

const CartClient = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const { removeItem: removeItemFromStore } = cartStore();
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const handleUpdateQuantity = async (index: number, newQuantity: number) => {
    const itemId = items[index].id;
    setLoadingItemId(itemId);
    updateQuantity(itemId, newQuantity);

    try {
      const response = await fetch(`/api/cart/${itemId}/quantity`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setLoadingItemId(itemId);
    try {
      const response = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to remove item");
      removeItem(itemId);
      removeItemFromStore(itemId);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const calculateTotal = () =>
    items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  return (
    <div className="grid lg:grid-cols-3 gap-8 p-4">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6 text-violet-950">My Cart</h1>
        {items.length > 0 ? (
          items.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <Link
                href={path.productShow(
                  item.product.category.name,
                  item.product.id
                )}
                className="flex items-center w-full"
              >
                <Image
                  src={item.product.images?.[0]?.url ?? ""}
                  alt={item.product.slug}
                  width={100}
                  height={100}
                  className="rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="font-medium text-violet-950">
                    {item.product.slug}
                  </p>
                  <p className="text-gray-500">
                    {item.product.description
                      ? item.product.description.slice(0, 30) + "..."
                      : "No description available"}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold ml-4 text-violet-950">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <PlusMinusButton
                  min={1}
                  max={item.product.quantity}
                  value={item.quantity}
                  onChange={(newQuantity) =>
                    handleUpdateQuantity(i, newQuantity)
                  }
                  disabled={loadingItemId === item.id}
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-6 text-red-500 hover:underline text-sm"
                  disabled={loadingItemId === item.id}
                >
                  {loadingItemId === item.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <CartSummary total={calculateTotal()} />
    </div>
  );
};

export default CartClient;
