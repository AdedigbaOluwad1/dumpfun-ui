/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicKey } from "@solana/web3.js";

interface WalletProvider {
  isPhantom?: boolean;
  isSolflare?: boolean;
  isBackpack?: boolean;
  isCoinbaseWallet?: boolean;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connect(opts?: {
    onlyIfTrusted?: boolean;
  }): Promise<{ publicKey: PublicKey }>;
  disconnect(): Promise<void>;
  signMessage(
    message: Uint8Array,
    display?: string,
  ): Promise<{ signature: Uint8Array; publicKey: PublicKey }>;
  on(
    event: "connect" | "disconnect" | "accountChanged",
    handler: (args: any) => void,
  ): void;
  off(
    event: "connect" | "disconnect" | "accountChanged",
    handler: (args: any) => void,
  ): void;
}

declare global {
  interface Window {
    solana?: WalletProvider;
    solflare?: WalletProvider;
    backpack?: WalletProvider;
    coinbaseWalletExtension?: WalletProvider;
  }
}

interface WalletError extends Error {
  code?: number;
  message: string;
}

export type WalletTypes = "Phantom" | "Solflare" | "Backpack" | "Trust";
