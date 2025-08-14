/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { useAuth } from "./use-auth";
import { useAppStore, useAuthStore } from "@/stores";

export const useBlockchain = () => {
  const { publicKey, connected } = useAuth();
  const { connection } = useAppStore();
  const { updateUserBalance } = useAuthStore();

  const fetchBalance = useCallback(
    async (pubkey: PublicKey) => {
      try {
        const lamports = await connection.getBalance(pubkey);
        updateUserBalance(lamports / 1e9);
      } catch (err) {
        console.error("Error fetching balance:", err);
      } finally {
      }
    },
    [connection],
  );

  return {
    connection,
    publicKey,
    connected,
    fetchBalance,
  };
};
