import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();

export function getAuthState() {
  const isAuthenticated = store.get(isAuthenticatedAtom);
  const user = store.get(userAtom);
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated;
}
// Define user atom to hold authentication state
export const userAtom = atomWithStorage<string | null>(
  "tanstack.auth.user",
  null,
);

export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Define login/logout functions as atoms
// Atom for logging in and out
export const loginAtom = atom(null, async (get, set, username: string) => {
  // Simulate an async login operation (e.g., API call)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Set the user atom with the username
  set(userAtom, username);
});

export const logoutAtom = atom(null, async (get, set) => {
  // Optionally, simulate an async logout operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Clear the user atom (log out)
  set(userAtom, null);
});

// Getter for stored user (optional, to restore from localStorage on load)
export const getStoredUserAtom = atom(
  (get) => {
    const storedUser = localStorage.getItem("tanstack.auth.user");
    if (storedUser) {
      return storedUser;
    }
    return null;
  },
  (get, set) => {
    // The write function to sync the userAtom with localStorage
    const storedUser = localStorage.getItem("tanstack.auth.user");
    if (storedUser) {
      set(userAtom, storedUser); // Update userAtom
    }
  },
);
