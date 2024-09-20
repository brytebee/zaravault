"use client";

const CartSummary: React.FC<{ total: number }> = ({ total }) => {
  const shipping = 5.0;
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sticky top-20">
      <h2 className="text-2xl font-semibold mb-6">Cart Summary</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Subtotal</p>
        <p className="text-lg font-medium">${total.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Shipping</p>
        <p className="text-lg font-medium">${shipping.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Tax</p>
        <p className="text-lg font-medium">${tax.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center border-t pt-4 font-bold text-xl">
        <p>Total</p>
        <p>${grandTotal.toFixed(2)}</p>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
