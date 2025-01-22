import { create } from "zustand";

interface PaginationStore {
  page: number;
  setPage: (page: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
}));
