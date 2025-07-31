import { defUserProfile } from "@/consts";
import dumpfunApi from "@/lib/utils";
import {
  iApiResponse,
  iCreateUserProfile,
  iCreateWallet,
  iUserProfile,
  iWallet,
} from "@/types";
import { WalletProvider, WalletTypes } from "@/types/auth";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface AuthState {
  wallet: WalletProvider | null;
  publicKey: string | null;
  isConnecting: WalletTypes | null;
  showUserOnboardingModal: boolean;
  isLoginModalOpen: boolean;
  isProfileSyncModalOpen: boolean;
  userBalance: number;
  userProfile: iUserProfile | null;
  showLoginToast: boolean;
}

interface AuthActions {
  setWallet: (wallet: WalletProvider | null) => void;
  setPublicKey: (key: string | null) => void;
  setIsConnecting: (status: WalletTypes | null) => void;
  setShowUserOnboardingModal: (status: boolean) => void;
  setIsLoginModalOpen: (status: boolean) => void;
  setShowLoginToast: (status: boolean) => void;
  setIsProfileSyncModalOpen: (status: boolean) => void;
  updateUserBalance: (balance: number) => void;
  setUserProfile: (payload: iUserProfile | null) => void;
  getUserProfile: (
    address: string,
    callback: (status: boolean, data?: iUserProfile) => void,
  ) => void;
  createUserProfile: (
    payload: iCreateUserProfile,
    callback: (status: boolean) => void,
  ) => void;
  addNewWallet: (
    payload: iCreateWallet,
    callback: (status: boolean) => void,
  ) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        wallet: null,
        publicKey: null,
        isConnecting: null,
        showUserOnboardingModal: false,
        isLoginModalOpen: false,
        userBalance: 0.0,
        isProfileSyncModalOpen: false,
        userProfile: defUserProfile,
        showLoginToast: false,

        setWallet: (wallet) => {
          set({ wallet });
        },
        setPublicKey: (key) => {
          set({ publicKey: key });
        },
        setIsConnecting: (status) => {
          set({ isConnecting: status });
        },
        setShowUserOnboardingModal: (status) => {
          set({ showUserOnboardingModal: status });
        },
        setIsLoginModalOpen: (status) => {
          set({ isLoginModalOpen: status });
        },
        setShowLoginToast: (status) => {
          set({ isLoginModalOpen: status });
        },
        updateUserBalance: (balance) => {
          set({ userBalance: balance });
        },
        setIsProfileSyncModalOpen: (status) => {
          set({ isProfileSyncModalOpen: status });
        },
        setUserProfile: (payload) => {
          set({ userProfile: payload });
        },
        getUserProfile: async (
          address: string,
          callback: (status: boolean, data?: iUserProfile) => void,
        ) => {
          return dumpfunApi
            .get<iApiResponse<iUserProfile>>(
              `/wallets/address/${address}/profile`,
            )
            .then(({ data }) => callback(true, data.data))
            .catch(() => callback(false));
        },
        createUserProfile: async (
          payload: iCreateUserProfile,
          callback: (status: boolean) => void,
        ) => {
          set({ showUserOnboardingModal: false });
          return toast.promise<AxiosResponse<iApiResponse<iUserProfile>>>(
            dumpfunApi.post(`/profile`, payload),
            {
              loading: `🛠 Forging your degen passport, anon...`,
              success: ({ data }) => {
                callback(true);
                set({ userProfile: data.data });
                return `🐒 Welcome to the Dumpfun jungle..`;
              },
              error: () => {
                set({ showUserOnboardingModal: true });
                callback(false);
                return `The chain rejected your vibes. Try again..`;
              },
            },
          );
        },
        addNewWallet: async (
          payload: iCreateWallet,
          callback: (status: boolean) => void,
        ) => {
          return toast.promise<AxiosResponse<iApiResponse<iWallet>>>(
            dumpfunApi.post(
              `/wallets/profiles/${get().userProfile?.id}`,
              payload,
            ),
            {
              loading: `🔗 Linking your degen wallet, anon...`,
              success: ({ data }) => {
                callback(true);
                set((state) => ({
                  userProfile: {
                    ...state.userProfile,
                    wallets: [...(state.userProfile?.wallets || []), data.data],
                  } as iUserProfile,
                  isProfileSyncModalOpen: false,
                }));
                return `🐒 Wallet added — welcome deeper into the jungle`;
              },
              error: () => {
                callback(false);
                return `🚫 The chain rugged you. Try again`;
              },
            },
          );
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          userProfile: state.userProfile,
        }),
      },
    ),
    { name: "AuthStore" },
  ),
);
