import { create } from "zustand";

interface CategoriesStore {
  activeCategoryId: number;
  setActiveCategoryId: (id: number) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  activeCategoryId: 0,
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),
}));
