import { create } from "zustand";

interface ModalStore {
  open: boolean;
  setOpen: (view: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
