import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface AppState {
  theme: null;
}

interface AppActions {
  setTheme: (theme: null) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        theme: null,
        setTheme: (theme) => {
          set({ theme });
        },
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          theme: state.theme,
        }),
      },
    ),
    { name: "AppStore" },
  ),
);
