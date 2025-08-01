/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { PublicKey, AccountInfo } from "@solana/web3.js";
import { useAuth } from "./use-auth";
import { useAppStore, useAuthStore } from "@/stores";

export const useBlockchain = () => {
  const { publicKey, connected } = useAuth();
  const { connection, initializeProgram } = useAppStore();
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

  useEffect(() => {
    initializeProgram();

    if (!publicKey) return;

    const pubKey = new PublicKey(publicKey);
    fetchBalance(pubKey);
    const accountChangeEventId = connection.onAccountChange(
      pubKey,
      (info: AccountInfo<Buffer>) => {
        updateUserBalance(info.lamports / 1e9);
      },
      "confirmed",
    );

    return () => {
      connection
        .removeAccountChangeListener(accountChangeEventId)
        .catch(console.error);
    };
  }, [publicKey]);

  return {
    connection,
    publicKey,
    connected,
    fetchBalance,
  };
};
