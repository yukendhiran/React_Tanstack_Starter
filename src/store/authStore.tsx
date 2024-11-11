import { create } from "zustand";
import { sleep } from "@/lib/utils";

// Define the Zustand store
interface AuthStore {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const key = "tanstack.auth.user";

// Create Zustand store
export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem(key) ?? null, // Ensure user is `string | null`
  isAuthenticated: !!localStorage.getItem(key), // `false` if `null`

  login: async (username: string) => {
    await sleep(500);
    localStorage.setItem(key, username);
    set({ user: username, isAuthenticated: true });
  },

  logout: async () => {
    await sleep(250);
    localStorage.removeItem(key);
    set({ user: null, isAuthenticated: false });
  },
}));

export function getAuthState() {
  // Use Zustand's store to get the auth state
  const { isAuthenticated } = useAuthStore.getState();
  console.log("isAuthenticated Zustand:", isAuthenticated);
  return isAuthenticated;
}