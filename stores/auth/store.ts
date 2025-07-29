import { WalletProvider, WalletTypes } from "@/types/auth";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface AuthState {
  wallet: WalletProvider | null;
  publicKey: string | null;
  isConnecting: WalletTypes | null;
  showUserOnboardingModal: boolean;
  isLoginModalOpen: boolean;
  userBalance: number;
}

interface AuthActions {
  setWallet: (wallet: WalletProvider | null) => void;
  setPublicKey: (key: string | null) => void;
  setIsConnecting: (status: WalletTypes | null) => void;
  setShowUserOnboardingModal: (status: boolean) => void;
  setIsLoginModalOpen: (status: boolean) => void;
  updateUserBalance: (balance: number) => void;
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
        userBalance: 0.00,

        setWallet: (wallet) => set({ wallet }),
        setPublicKey: (key) => {
          set({ publicKey: key, showUserOnboardingModal: false });
        },
        setIsConnecting: (status) => set({ isConnecting: status }),
        setShowUserOnboardingModal: (status) =>
          set({ showUserOnboardingModal: status }),
        setIsLoginModalOpen: (status) => set({ isLoginModalOpen: status }),
        updateUserBalance: (balance) => set({ userBalance: balance }),
      }),
      {
        name: "auth-storage",
        partialize: () => ({}),
      },
    ),
    { name: "AuthStore" },
  ),
);
