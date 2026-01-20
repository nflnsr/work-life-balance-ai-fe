import { create } from "zustand";
import { IProfile } from "@/types/api/profile";

type TAuthStore = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  user: IProfile | null;
  setUser: (user: IProfile | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
  clearAuthStore: () => void;
};

const useAuthStore = create<TAuthStore>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => {
    set({ isLoading: true });
    set({ accessToken });
    set({ isLoading: false });
  },
  user: null,
  setUser: (user) => {
    set({ isLoading: true });
    set({ user });
    set({ isLoading: false });
  },
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoading: true });
    set({ isLoggedIn });
    set({ isLoading: false });
  },
  isLoading: true,
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
  clearAuthStore: () => {
    set({ accessToken: null, user: null, isLoggedIn: false });
  },
}));

export { useAuthStore, type TAuthStore };
