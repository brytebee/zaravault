import create from "zustand";
import { persist } from "zustand/middleware";

interface Cart {
  ids: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  setIds: (ids: string[]) => void;
}

const customStorage = {
  getItem: (key: string) => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
};

const persistableCartStore = persist<Cart>(
  (set) => ({
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
    setIds: (ids) =>
      set(() => ({
        ids: ids,
      })),
  }),
  {
    name: "cart-store",
    storage: customStorage,
  }
);

export const cartStore = create(persistableCartStore);
