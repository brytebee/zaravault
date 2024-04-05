import { create } from "zustand";

interface Cart {
  count: number;
  addItem: () => void;
  removeItem: () => void;
  setcount: () => void;
}

export const cartStore = create<Cart>()((set) => ({
  count: 0,
  addItem: () => set((state) => ({ count: state.count + 1 })),
  removeItem: () => set((state) => ({ count: state.count - 1 })),
  setcount: () => set((state) => ({ count: state.count + 1 })),
}));
