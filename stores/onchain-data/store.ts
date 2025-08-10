import dumpfunApi from "@/lib/utils";
import { iApiResponse } from "@/types";
import { iCoin, iRunner, iTokenTraderInfo, iTrade } from "@/types/onchain-data";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OnchainDataState {}

interface OnchainDataActions {
  getTokenTraderInfo: (
    address: string,
    mint: string,
    callback: (status: boolean, data?: iTokenTraderInfo) => void,
  ) => void;
  getCoinInfo: (
    mint: string,
    callback: (status: boolean, data?: iCoin) => void,
  ) => void;
  getCoins: (
    limit: number,
    callback: (status: boolean, data?: iCoin[]) => void,
  ) => void;
  getRecentTrades: (
    limit: number,
    callback: (status: boolean, data?: iTrade[]) => void,
  ) => void;
  getRunners: (callback: (status: boolean, data?: iRunner[]) => void) => void;
}

export const useOnchainDataStore = create<
  OnchainDataState & OnchainDataActions
>()(
  devtools(
    persist(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (state) => ({
        getTokenTraderInfo: async (address, mint, callback) => {
          return dumpfunApi
            .get<iApiResponse<iTokenTraderInfo>>(
              `/onchain-data/token/${mint}/trader/${address}`,
            )
            .then(({ data }) => {
              callback(true, data.data);
            })
            .catch(() => {
              callback(false);
            });
        },
        getCoinInfo: async (mint, callback) => {
          return dumpfunApi
            .get<iApiResponse<iCoin>>(`/onchain-data/coin/${mint}`)
            .then(({ data }) => {
              callback(true, data.data);
            })
            .catch(() => {
              callback(false);
            });
        },
        getCoins: async (limit = 1, callback) => {
          return dumpfunApi
            .get<iApiResponse<iCoin[]>>(`/onchain-data/coins`, {
              params: { limit },
            })
            .then(({ data }) => {
              callback(true, data.data);
            })
            .catch(() => {
              callback(false);
            });
        },
        getRecentTrades: async (limit = 1, callback) => {
          return dumpfunApi
            .get<iApiResponse<iTrade[]>>(`/onchain-data/trades`, {
              params: { limit },
            })
            .then(({ data }) => {
              callback(true, data.data);
            })
            .catch(() => {
              callback(false);
            });
        },
        getRunners: async (callback) => {
          return dumpfunApi
            .get<iApiResponse<iRunner[]>>(`/onchain-data/runners`)
            .then(({ data }) => {
              callback(true, data.data);
            })
            .catch(() => {
              callback(false);
            });
        },
      }),
      {
        name: "onchain-data-storage",
        partialize: () => {},
      },
    ),
    { name: "OnchainDataState" },
  ),
);
