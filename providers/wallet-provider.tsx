// providers/WalletProvider.tsx
"use client";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { clusterApiUrl } from "@solana/web3.js";
import { MotionConfig } from "motion/react";
import { useAppStore } from "@/stores";

interface Props {
  children: React.ReactNode;
}

export function WalletContextProvider({ children }: Props) {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const { isAnimationEnabled } = useAppStore();

  const wallets = useMemo(
    () => [
      new TrustWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <MotionConfig reducedMotion={!isAnimationEnabled ? "always" : "never"}>
          {children}
        </MotionConfig>
      </WalletProvider>
    </ConnectionProvider>
  );
}
