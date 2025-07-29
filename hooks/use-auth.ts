import { useAuthStore } from "@/stores";
import { WalletError, WalletTypes } from "@/types/auth";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export function useAuth() {
  const { isConnecting, setIsConnecting, setPublicKey } = useAuthStore();

  const {
    publicKey,
    connected,
    connecting,
    disconnect,
    connect,
    select,
    wallets,
    signMessage: adapterSignMessage,
  } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      setPublicKey(publicKey.toString());
    } else {
      setPublicKey(null);
    }
  }, [connected, publicKey, setPublicKey]);

  const connectWallet = async (
    adapterName: WalletTypes,
    callback?: () => void,
  ) => {
    const walletAdapter = wallets.find((w) => w.adapter.name === adapterName);

    if (!walletAdapter || walletAdapter.readyState !== "Installed") {
      toast.error(`${adapterName} wallet not found. Sure it's installed?`);
      return;
    }

    setIsConnecting(adapterName);

    try {
      select(walletAdapter.adapter.name);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await connect();
      toast.success(
        `Connected to ${adapterName.toLowerCase()} wallet successfully`,
      );
      callback?.();
    } catch (err) {
      const error = err as WalletError;
      console.log(error);
      toast.error(error?.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(null);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setPublicKey(null);
      toast.info("Wallet disconnected successfully!");
    } catch (err) {
      console.error("Disconnect error:", err);
      toast.error("Failed to disconnect wallet");
    }
  };

  const signMessage = async () => {
    if (!connected || !publicKey || !adapterSignMessage) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const message = `Sign this message to authenticate with our app.\n\nTimestamp: ${Date.now()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await adapterSignMessage(encodedMessage);

      console.log("Message signed:", {
        message,
        signature: Array.from(signature),
        publicKey: publicKey.toString(),
      });

      toast.success("Message signed successfully! Check console for details.");
    } catch (err) {
      const error = err as WalletError;
      toast.error(error.message || "Failed to sign message");
    }
  };

  const isWalletAvailable = (adapterName: WalletTypes): boolean => {
    const walletAdapter = wallets.find((w) => w.adapter.name === adapterName);

    return walletAdapter?.readyState === "Installed";
  };

  return {
    connectWallet,
    disconnectWallet,
    isConnecting: isConnecting || connecting,
    signMessage,
    connected,
    publicKey: publicKey?.toString() || null,
    isWalletAvailable,
  };
}
