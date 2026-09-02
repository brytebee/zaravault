"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CartSummary: React.FC<{ total: number }> = ({ total }) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const shipping = 5.0;
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Here you would typically call your API to create an order
      // For this example, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/checkout/success");
    } catch (error) {
      console.error("Checkout failed:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sticky top-20">
      <h2 className="text-2xl font-semibold mb-6 text-violet-950">
        Cart Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg">Subtotal</p>
          <p className="text-lg font-medium">${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg">Shipping</p>
          <p className="text-lg font-medium">${shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg">Tax (10%)</p>
          <p className="text-lg font-medium">${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center border-t pt-4 font-bold text-xl text-violet-950">
          <p>Total</p>
          <p>${grandTotal.toFixed(2)}</p>
        </div>
      </div>
      <button
        className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50 ${
          isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-violet-950 hover:bg-violet-800"
        }`}
        onClick={handleCheckout}
        disabled={isProcessing}
        aria-label="Proceed to Checkout"
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </button>
      <p className="mt-4 text-sm text-gray-500">
        By proceeding, you agree to our{" "}
        <a href="/terms" className="text-violet-950 hover:underline">
          Terms and Conditions
        </a>
        .
      </p>
    </div>
  );
};

export default CartSummary;
