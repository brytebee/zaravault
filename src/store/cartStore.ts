import { create } from "zustand";

interface Cart {
  ids: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
}

export const cartStore = create<Cart>()((set) => ({
  ids: [],
  addItem: (id) =>
    set((state) => {
      const exists = state.ids.includes(id);
      return {
        ids: exists ? state.ids : [...state.ids, id],
      };
    }),
  removeItem: (id: string) =>
    set((state) => ({
      ids: state.ids.filter((itemId) => itemId !== id),
    })),
}));
