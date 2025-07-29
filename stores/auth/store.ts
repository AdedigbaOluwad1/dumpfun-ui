import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface AuthState {
  theme: null;
}

interface AuthActions {
  setTheme: (theme: null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        theme: null,
        setTheme: (theme) => {
          set({ theme });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          theme: state.theme,
        }),
      },
    ),
    { name: "AuthStore" },
  ),
);
