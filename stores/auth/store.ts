import { iUser } from "@/types";
import { WalletProvider, WalletTypes } from "@/types/auth";
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
  user: iUser | null;
}

interface AuthActions {
  setWallet: (wallet: WalletProvider | null) => void;
  setPublicKey: (key: string | null) => void;
  setIsConnecting: (status: WalletTypes | null) => void;
  setShowUserOnboardingModal: (status: boolean) => void;
  setIsLoginModalOpen: (status: boolean) => void;
  setIsProfileSyncModalOpen: (status: boolean) => void;
  updateUserBalance: (balance: number) => void;
  setUser: (payload: iUser | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        wallet: null,
        publicKey: null,
        isConnecting: null,
        showUserOnboardingModal: false,
        isLoginModalOpen: false,
        userBalance: 0.0,
        isProfileSyncModalOpen: false,
        user: {
          name: "DegenKing",
          avatar: "/avatars/degen-ape.png",
          walletAddress: "",
          traderType: "Diamond Hands",
          description: "",
        },

        setWallet: (wallet) => set({ wallet }),
        setPublicKey: (key) => {
          set({ publicKey: key });
        },
        setIsConnecting: (status) => set({ isConnecting: status }),
        setShowUserOnboardingModal: (status) => {
          set({ showUserOnboardingModal: status });
        },
        setIsLoginModalOpen: (status) => set({ isLoginModalOpen: status }),
        updateUserBalance: (balance) => set({ userBalance: balance }),
        setIsProfileSyncModalOpen: (status) =>
          set({ isProfileSyncModalOpen: status }),
        setUser: (payload) => set({ user: payload }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
        }),
      },
    ),
    { name: "AuthStore" },
  ),
);
