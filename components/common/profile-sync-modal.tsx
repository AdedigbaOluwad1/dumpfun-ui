"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Wallet, Link, PencilLine } from "lucide-react";
import { formatPublicKey, generateWalletAlias } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/stores";
import { defUserProfile } from "@/consts";

export function ProfileSyncModal() {
  const { publicKey } = useAuth();
  const {
    isProfileSyncModalOpen,
    setIsProfileSyncModalOpen,
    setIsLoginModalOpen,
    setUserProfile,
    userProfile,
    addNewWallet,
  } = useAuthStore();
  const [walletName, setWalletName] = useState(generateWalletAlias());
  const [loading, setLoading] = useState(false);

  if (!userProfile) return null;

  const handleSync = () => {
    setLoading(true);
    addNewWallet(
      {
        address: publicKey!,
        isPrimary: false,
        label: walletName,
      },
      () => {
        setLoading(false);
      },
    );
  };

  return (
    <Dialog open={isProfileSyncModalOpen}>
      <DialogContent className="rounded-2xl border-gray-700/50 bg-gray-900/5 shadow-2xl backdrop-blur-xl sm:max-w-lg">
        <div className="relative max-h-[90vh] overflow-y-auto text-center">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-white sm:text-2xl">
              Profile Found! 🎉
            </DialogTitle>
            <p className="text-gray-400">
              It looks like you have an existing profile. Would you like to sync
              this wallet?
            </p>
          </DialogHeader>

          <div className="mb-6 space-y-5">
            <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-800/30 p-4">
              <div className="flex flex-col items-center space-y-3 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-700">
                  <Image
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt="Found profile avatar"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-white">
                    {userProfile.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="mt-1 border-green-500/30 bg-green-500/20 text-xs text-green-400"
                  >
                    {userProfile.traderType}
                  </Badge>
                </div>
              </div>
              <div className="h-px w-full bg-gray-700/50" />
              <div className="flex flex-col items-center space-y-2 text-sm text-gray-400 sm:items-start">
                <Label className="flex items-center text-gray-300">
                  <Wallet className="h-4 w-4 text-green-400" />
                  New Wallet Address
                </Label>
                <div className="flex w-full items-center justify-between">
                  <span className="font-jetbrains-mono text-xs text-white sm:text-sm">
                    {formatPublicKey(publicKey)}
                  </span>
                  <Link className="ml-2 h-4 w-4 flex-shrink-0 text-green-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label
                htmlFor="wallet-name"
                className="flex items-center text-gray-300"
              >
                <PencilLine className="h-4 w-4 text-gray-400" />
                Wallet Name
              </Label>
              <Input
                id="wallet-name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder={`e.g., My Main Wallet, ${publicKey?.slice(0, 6)}...`}
                className="h-11 rounded-lg border-gray-700/60 bg-transparent! text-sm text-white/80 placeholder:text-white/60 focus:border-green-500/50! md:text-base"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleSync}
              disabled={!walletName.length || loading}
              className="flex h-10 flex-1 items-center justify-center rounded-lg border-0 bg-green-500 py-3 text-sm text-white hover:bg-green-600"
            >
              {loading ? "Syncing.." : "Sync Wallet"}
            </Button>
            <Button
              onClick={() => {
                setIsProfileSyncModalOpen(false);
                setIsLoginModalOpen(true);
                setUserProfile(defUserProfile);
              }}
              disabled={loading}
              variant="outline"
              className="flex h-10 flex-1 items-center justify-center rounded-lg border-gray-800 bg-transparent py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white"
            >
              Start New Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
