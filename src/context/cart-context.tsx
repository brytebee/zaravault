"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { cartStore } from "@/store/cartStore";
import { Category } from "@prisma/client";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    price: number;
    quantity: number;
    images: { url: string }[];
    description: string;
    category: Category;
  };
}

interface CartContextType {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void; // Add addItem method
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{
  initialItems: CartItem[];
  children: ReactNode;
}> = ({ initialItems, children }) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const count = items.length;
  const { setIds } = cartStore();

  useEffect(() => {
    setIds(items.map((item) => item.id));
  }, [items, setIds]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists, update the quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      // If the item does not exist, add it to the cart
      return [...prevItems, item];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ items, count, addItem, removeItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
