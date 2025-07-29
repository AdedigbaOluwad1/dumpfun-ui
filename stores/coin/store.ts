import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface CoinState {
  theme: null;
}

interface CoinActions {
  setTheme: (theme: null) => void;
}

export const useCoinStore = create<CoinState & CoinActions>()(
  devtools(
    persist(
      (set) => ({
        theme: null,
        setTheme: (theme) => {
          set({ theme });
        },
      }),
      {
        name: "coin-storage",
        partialize: (state) => ({
          theme: state.theme,
        }),
      },
    ),
    { name: "CoinStore" },
  ),
);
