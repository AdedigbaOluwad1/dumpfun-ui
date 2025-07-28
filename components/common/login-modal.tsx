/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Wallet, ChevronRight, Shield, ArrowRight } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showMoreWallets, setShowMoreWallets] = useState(false);

  const handleConnect = async (method: string) => {
    setIsConnecting(method);
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(null);
    onOpenChange(false);
  };

  const wallets = [
    {
      name: "Phantom",
      icon: "https://phantom.app/img/phantom-logo.svg",
      description: "Most popular Solana wallet",
      installed: true,
    },
    {
      name: "Solflare",
      icon: "https://solflare.com/wp-content/uploads/2024/11/App-Icon.svg",
      description: "Secure & user-friendly",
      installed: false,
    },
    {
      name: "Backpack",
      icon: "https://backpack.exchange/favicon-64x64.png",
      description: "Built for DeFi",
      installed: false,
    },
    {
      name: "Coinbase Wallet",
      icon: "https://coinbase.com/assets/sw-cache/a_DVA0h2KN.png",
      description: "Connect with Coinbase",
      installed: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-2xl border-gray-700/50 bg-gray-900/5 shadow-2xl backdrop-blur-xl sm:max-w-md"
      >
        <DialogTitle className="hidden"></DialogTitle>
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-8 py-4 pb-0">
          <div className="space-y-4 text-center">
            <div className="relative mx-auto h-16 w-16">
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-green-400 to-green-600 opacity-20"></div>
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <div className="relative h-4 w-8 overflow-hidden rounded-full bg-white">
                  <div className="absolute top-1 left-1 h-2 w-2 animate-bounce rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold text-white">
                Connect or Create Wallet
              </h2>
              <p className="text-sm text-gray-400">
                Choose your preferred method to get started
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="group h-16 w-full rounded-lg border-gray-700 bg-gray-800/50 transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800"
              onClick={() => handleConnect("phantom")}
              disabled={isConnecting !== null}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                    {isConnecting === "phantom" ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                        <div className="h-4 w-4 rounded bg-gradient-to-r from-purple-500 to-purple-600"></div>
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center space-x-2 font-medium text-white">
                      <span>Phantom</span>
                      {wallets[0].installed && (
                        <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      Most popular Solana wallet
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-green-400" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="group h-14 w-full rounded-lg border-gray-700/50 bg-gray-800/30 transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/50"
              onClick={() => setShowMoreWallets(!showMoreWallets)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-700">
                    <Wallet className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-300">
                    More Wallets
                  </span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    showMoreWallets ? "rotate-90" : ""
                  }`}
                />
              </div>
            </Button>

            {showMoreWallets && (
              <div className="animate-in slide-in-from-top-2 space-y-2 duration-300">
                {wallets.slice(1).map((wallet) => (
                  <Button
                    key={wallet.name}
                    variant="outline"
                    className="group h-14 w-full border-gray-700/30 bg-gray-800/30 transition-all duration-300 hover:border-green-500/30 hover:bg-gray-800/50"
                    onClick={() => handleConnect(wallet.name.toLowerCase())}
                    disabled={isConnecting !== null}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-700">
                          <img
                            src={wallet.icon || "/placeholder.svg"}
                            alt={wallet.name}
                            className="size-5 rounded"
                          />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center space-x-2 text-sm font-medium text-white">
                            <span>{wallet.name}</span>
                            {!wallet.installed && (
                              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
                                Install
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {wallet.description}
                          </div>
                        </div>
                      </div>
                      {isConnecting === wallet.name.toLowerCase() ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-400 border-t-transparent"></div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-gray-500 transition-colors group-hover:text-green-400" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/20">
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-white">
                  Secure Connection
                </h4>
                <p className="text-xs leading-relaxed text-gray-400">
                  Your wallet connection is encrypted and secure. We never store
                  your private keys or seed phrases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
