import dumpfunApi from "@/lib/utils";
import { iApiResponse } from "@/types";
import { iTokenTraderInfo } from "@/types/onchain-data";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface OnchainDataState {
  theme: null;
}

interface OnchainDataActions {
  getTokenTraderInfo: (
    address: string,
    mint: string,
    callback: (status: boolean, data?: iTokenTraderInfo) => void,
  ) => void;
}

export const useOnchainDataStore = create<
  OnchainDataState & OnchainDataActions
>()(
  devtools(
    persist(
      (set) => ({
        theme: null,

        getTokenTraderInfo: async (address, mint, callback) => {
          return dumpfunApi
            .get<iApiResponse<iTokenTraderInfo>>(
              `/onchain-data/token/${mint}/trader/${address}`,
            )
            .then(({ data }) => {
              callback(true, data.data);
            })
            .catch((err) => {
              toast.error(err?.message || "Oops, the chain rejected you");
              callback(false);
            });
        },
      }),
      {
        name: "onchain-data-storage",
        partialize: (state) => ({
          theme: state.theme,
        }),
      },
    ),
    { name: "OnchainDataState" },
  ),
);
