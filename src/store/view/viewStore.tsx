// src/store/viewStore.js

import { create } from "zustand";

interface ViewStore {
  view: string | null;
  setView: (view: "list" | "create") => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  view: "list",
  setView: (view) => set({ view }),
}));
