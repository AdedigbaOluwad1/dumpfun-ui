import { Dumpfun } from "@/types/idl";
import { Program } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import idl from "@/idl.json";
import axios from "axios";

export interface AppState {
  program: Program<Dumpfun> | null;
  connection: Connection;
  solPrice: number;
  isAnimationEnabled: boolean;
}

interface AppActions {
  initializeProgram: () => void;
  fetchSolPrice: () => void;
  toggleAnimation: (state: boolean) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        connection: new Connection(process.env.NEXT_PUBLIC_RPC_URL!),
        program: null,
        solPrice: 0,
        isAnimationEnabled: true,

        initializeProgram: () => {
          set((state) => ({
            program: new Program<Dumpfun>(idl, {
              connection: state.connection,
            }),
          }));
        },
        fetchSolPrice: () => {
          axios
            .get<{
              solana: { usd: number };
            }>("https://api.coingecko.com/api/v3/simple/price", {
              params: {
                ids: "solana",
                vs_currencies: "usd",
              },
            })
            .then(({ data }) => {
              set({ solPrice: data.solana.usd });
            })
            .catch(() => {});
        },
        toggleAnimation: (state) => {
          set({ isAnimationEnabled: state });
        },
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          isAnimationEnabled: state.isAnimationEnabled,
        }),
      },
    ),
    { name: "AppStore" },
  ),
);
