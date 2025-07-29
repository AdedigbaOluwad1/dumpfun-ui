/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { Connection, PublicKey, AccountInfo } from "@solana/web3.js";
import { useAuth } from "./use-auth";
import { useAuthStore } from "@/stores";

export const useBlockchain = () => {
  const { publicKey, connected } = useAuth();
  const { updateUserBalance } = useAuthStore();
  const connection = useRef(
    new Connection(process.env.NEXT_PUBLIC_RPC_URL!),
  )?.current;
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

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
    if (!publicKey) return;

    const pubKey = new PublicKey(publicKey);
    fetchBalance(pubKey);

    const id = connection.onAccountChange(
      pubKey,
      (info: AccountInfo<Buffer>) => {
        updateUserBalance(info.lamports / 1e9);
      },
      "confirmed",
    );

    setSubscriptionId(id);

    return () => {
      if (subscriptionId !== null) {
        connection
          .removeAccountChangeListener(subscriptionId)
          .catch(console.error);
      }
    };
  }, [publicKey]);

  return {
    connection,
    publicKey,
    connected,
    fetchBalance,
  };
};
