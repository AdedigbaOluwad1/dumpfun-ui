import { Dumpfun } from "@/types/idl";
import { Program } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import idl from "@/idl.json";
import { iApiResponse } from "@/types";
import dumpfunApi from "@/lib/utils";

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
        showConfetti: false,

        initializeProgram: () => {
          set((state) => ({
            program: new Program<Dumpfun>(idl, {
              connection: state.connection,
            }),
          }));
        },
        fetchSolPrice: () => {
          dumpfunApi
            .get<iApiResponse<number>>(`/onchain-data/sol-price-usd`)
            .then(({ data }) => {
              set({ solPrice: data.data });
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
          solPrice: state.solPrice,
        }),
      },
    ),
    { name: "AppStore" },
  ),
);
