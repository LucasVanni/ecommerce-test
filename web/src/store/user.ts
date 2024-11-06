import { StateCreator } from "zustand";

interface User {
  name: string;
  email: string;
}

export interface UserStore {
  user: User | null;
  setUser: (payload: User | null) => void;
}

const getUserFromLocalStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const setUserToLocalStorage = (user: User | null) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }
};

export const user: StateCreator<UserStore> = (set) => ({
  user: getUserFromLocalStorage(),
  setUser: (payload) => {
    setUserToLocalStorage(payload);
    set({ user: payload });
  },
});
