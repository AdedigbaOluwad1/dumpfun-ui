import { useAuthStore } from "@/stores";
import { WalletError, WalletTypes } from "@/types/auth";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export function useAuth() {
  const {
    isConnecting,
    setIsConnecting,
    setPublicKey,
    user,
    setShowUserOnboardingModal,
    setIsProfileSyncModalOpen,
  } = useAuthStore();
  const [shouldAwaitPublicKey, setShouldAwaitPublicKey] = useState<{
    value: boolean;
    callback?: () => void;
    adapterName: string;
  }>({
    value: false,
    callback: () => null,
    adapterName: "",
  });

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
      if (shouldAwaitPublicKey.value) {
        shouldAwaitPublicKey.callback?.();
        // Newly registered users
        if (publicKey.toString() !== user?.walletAddress) {
          if (!user?.walletAddress) {
            toast.info("Welcome fren, let's get you cooking 👨‍🍳");
            setShowUserOnboardingModal(true);
          } else if (!!user?.walletAddress) {
            setIsProfileSyncModalOpen(true);
          } else {
            toast.success(
              `Connected to ${shouldAwaitPublicKey.adapterName.toLowerCase()} wallet successfully`,
            );
          }
        }
      }
      setPublicKey(publicKey.toString());
    } else {
      setPublicKey(null);
    }
  }, [
    connected,
    publicKey,
    shouldAwaitPublicKey,
    setPublicKey,
    user,
    setShowUserOnboardingModal,
    setIsProfileSyncModalOpen,
  ]);

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
      setShouldAwaitPublicKey({
        callback: () => {
          callback?.();
          setIsConnecting(null);
          setShouldAwaitPublicKey({
            adapterName,
            value: false,
            callback: undefined,
          });
        },
        value: true,
        adapterName,
      });
    } catch (err) {
      const error = err as WalletError;
      toast.error(error?.message || "Failed to connect wallet");
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
