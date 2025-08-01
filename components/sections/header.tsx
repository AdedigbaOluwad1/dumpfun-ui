/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Copy,
  ExternalLink,
  LogOut,
  Menu,
  Rocket,
  Settings,
  TrendingUp,
  User,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  ActivityIndicator,
  ParticleRenderer,
  particleStyles,
} from "@/components/common";
import { useCallback, useEffect, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { useDisintegrationParticles, usePageVisibility } from "@/hooks";
import { Activity } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useAppStore, useAuthStore } from "@/stores";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  copyToClipboard,
  formatPublicKey,
  formatters,
  throttle,
  truncateText,
} from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useBlockchain } from "@/hooks/use-blockchain";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";

export function Header() {
  const pageVisibility = usePageVisibility();
  const { program, fetchSolPrice, toggleAnimation } = useAppStore();
  const { publicKey, connected } = useWallet();
  const {
    publicKey: storePublicKey,
    userBalance,
    userProfile,
    showLoginToast,
    setShowLoginToast,
    setIsLoginModalOpen,
    setIsProfileSyncModalOpen,
    setShowUserOnboardingModal,
    setPublicKey,
    setUserProfile,
    getUserProfile,
    setIsConnecting,
  } = useAuthStore();
  const { disconnectWallet } = useAuth();
  const { particles, containerRef, onElementDisintegrate } =
    useDisintegrationParticles();
  useBlockchain();

  const [createActivity, setCreateActivity] = useState<React.ReactNode | null>(
    null,
  );
  const [tradingActivity, setTradingActivity] =
    useState<React.ReactNode | null>(null);

  const addCreateActivity = useCallback(
    (activity: Activity) => {
      if (createActivity) {
        const existingElement = document.querySelector(
          `[data-activity-id="${(createActivity as any)?.key}"]`,
        );
        if (existingElement) {
          onElementDisintegrate(existingElement as HTMLElement, () => {});
        }
      }

      const node = <ActivityIndicator key={activity.id} {...activity} />;

      setCreateActivity(node);
    },
    [onElementDisintegrate, createActivity],
  );

  const addTradingActivity = useCallback(
    (activity: Activity) => {
      if (tradingActivity) {
        const existingElement = document.querySelector(
          `[data-activity-id="${(tradingActivity as any)?.key}"]`,
        );
        if (existingElement) {
          onElementDisintegrate(existingElement as HTMLElement, () => {});
        }
      }

      const node = <ActivityIndicator key={activity.id} {...activity} />;

      setTradingActivity(node);
    },
    [onElementDisintegrate, tradingActivity],
  );

  const handleInitializeEvent = throttle(
    (creator: string, tokenSymbol: string) => {
      getUserProfile(creator, (status, data) => {
        if (!status || !data) return;

        addCreateActivity({
          id: `create-activity-${Date.now().toString()}`,
          user: truncateText(data.name, 25),
          action: "created",
          token: tokenSymbol,
          avatar: data.avatar,
        });
      });
    },
    5000,
  );

  const handleBuyEvent = throttle(
    (
      buyer: string,
      tokenSymbol: string,
      amount: number,
      numberOfTokens: string,
    ) => {
      const currentSolPrice = useAppStore.getState().solPrice;

      getUserProfile(buyer, (status, data) => {
        if (!status || !data) return;

        addTradingActivity({
          id: `buy-activity-${Date.now()}`,
          user: truncateText(data.name, 25),
          action: "bought",
          amount: numberOfTokens,
          token: tokenSymbol,
          value: `$${formatters.formatCompactNumber(amount * currentSolPrice)}`,
          avatar: data.avatar,
        });
      });
    },
    5000,
  );

  const handleSellEvent = throttle(
    (
      seller: string,
      tokenSymbol: string,
      amount: number,
      numberOfTokens: string,
    ) => {
      const currentSolPrice = useAppStore.getState().solPrice;

      getUserProfile(seller, (status, data) => {
        if (!status || !data) return;

        addTradingActivity({
          id: `sell-activity-${Date.now()}`,
          user: truncateText(data.name, 25),
          action: "sold",
          amount: numberOfTokens,
          token: tokenSymbol,
          value: `$${formatters.formatCompactNumber(amount * currentSolPrice)}`,
          avatar: data.avatar,
        });
      });
    },
    5000,
  );

  useEffect(() => {
    if (connected && publicKey) {
      setIsLoginModalOpen(false);

      setIsConnecting(null);
      getUserProfile(publicKey.toBase58(), (status, data) => {
        if (!status && !userProfile?.wallets.length) {
          if (showLoginToast) {
            toast.info("Welcome here fren, let's mint your identity 🪙");
          } else {
            toast.info("🛠 Hey anon, let's spin up your degen ID 🪙");
          }
          setShowLoginToast(false);
          setShowUserOnboardingModal(true);
        }

        if (!status && userProfile?.wallets.length) {
          setIsProfileSyncModalOpen(true);
          toast.info("📡 Let's align your moon coords, anon 🌕🛰️");
        }

        if (data) {
          if (showLoginToast)
            toast.info(`🔥 Welcome back, do dump harder and run 🤑`);
          setUserProfile(data);
        }

        return setShowLoginToast(false);
      });
      setPublicKey(publicKey.toString());
    } else {
      setPublicKey(null);
    }
  }, [publicKey?.toString()]);

  useEffect(() => {
    if (!program) return;

    const initializeEventId = program.addEventListener(
      "onInitializeEvent",
      (data) => handleInitializeEvent(data.creator.toBase58(), data.symbol),
    );

    const buyEventId = program.addEventListener("onBuyEvent", (data) =>
      handleBuyEvent(
        data.buyer.toBase58(),
        "GOLDSOL",
        formatters.lamportsToSol(data.solSpent),
        formatters.formatCompactNumber(
          formatters.formatTokenAmount(data.tokensReceived, 6),
        ),
      ),
    );

    const sellEventId = program.addEventListener("onSellEvent", (data) =>
      handleSellEvent(
        data.seller.toBase58(),
        "GOLDSOL",
        formatters.lamportsToSol(data.solReceived),
        formatters.formatCompactNumber(
          formatters.formatTokenAmount(data.tokensSold, 6),
        ),
      ),
    );

    const intervalId = setInterval(fetchSolPrice, 30 * 1000);

    return () => {
      if (!program) return;
      program?.removeEventListener(initializeEventId).catch(console.error);
      program?.removeEventListener(buyEventId).catch(console.error);
      program?.removeEventListener(sellEventId).catch(console.error);
      clearInterval(intervalId);
    };
  }, [program]);

  useEffect(() => {
    if (pageVisibility) return toggleAnimation(true);
    else toggleAnimation(false);
  }, [pageVisibility]);

  const activities = [tradingActivity, createActivity].filter(Boolean);
  return (
    <AnimatePresence>
      <div
        key={"header"}
        className="sticky top-0 flex h-full items-center border-b border-gray-800 bg-gray-900/50 px-4 md:px-6"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex w-fit items-center space-x-4">
            <div className="flex items-center px-1 lg:hidden">
              <MobileSidebar>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="text-foreground/80 -ml-2"
                >
                  <Menu className="size-5 md:size-6 md:min-w-6" />
                </Button>
              </MobileSidebar>

              <Image
                src={"/avatars/degen-ape.png"}
                width={1000}
                height={1000}
                className="h-9.25 w-10 max-[360px]:hidden"
                alt=""
              />
            </div>

            <motion.div
              ref={containerRef}
              layout
              className="relative flex items-center gap-4"
            >
              <ParticleRenderer particles={particles} />

              {activities}

              <style jsx>{particleStyles}</style>
            </motion.div>
          </div>

          <motion.div layout="position" className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "center", scale: 1 }}
            >
              <Link href={"/create"}>
                <Button className="h-8 w-fit rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-7 text-xs font-semibold text-white hover:from-green-600 hover:to-emerald-700 md:h-9 md:text-sm">
                  <Rocket className="size-3.5 max-[360px]:hidden md:size-4" />
                  Create Coin
                </Button>
              </Link>
            </motion.div>

            {!!storePublicKey ? (
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "center", scale: 1 }}
              >
                <Card className="h-8.5! items-center justify-center rounded-lg! border-gray-800 bg-gray-800/50 py-0! md:h-9! md:py-0!">
                  <CardContent className="px-3!">
                    <div className="flex items-center space-x-2">
                      <Wallet className="size-3.5 text-green-400 max-[360px]:hidden md:size-4" />
                      <span className="text-xs font-medium text-white md:text-sm">
                        {userBalance.toFixed(2).toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">SOL</span>
                    </div>
                  </CardContent>
                </Card>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-fit! items-center p-2 px-0! hover:bg-transparent! focus:ring-0! md:space-x-3!"
                    >
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-700">
                        <Image
                          src={userProfile?.avatar || ""}
                          alt={"avatar"}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="hidden text-left sm:block">
                        <div className="text-sm font-medium text-white">
                          {truncateText(userProfile?.name || "", 18)}
                        </div>
                        <div className="font-mono text-xs text-gray-400">
                          {formatPublicKey(storePublicKey)}
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="mt-1 w-80 border-gray-800 bg-gray-900/15 p-0 backdrop-blur-lg md:mt-3"
                  >
                    <div className="border-b border-gray-700 p-3 md:p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-700">
                          <Image
                            src={userProfile?.avatar || ""}
                            alt={"avatar"}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">
                            {truncateText(userProfile?.name || "", 18)}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="mt-1 border-green-500/30 bg-green-500/20 text-xs text-green-400"
                          >
                            {userProfile?.traderType}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg border border-gray-700 bg-gray-800/50 p-2 pl-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-400">
                              Wallet Address
                            </div>
                            <div className="font-mono text-sm text-white">
                              {formatPublicKey(storePublicKey)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(storePublicKey)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="px-1 py-2 md:p-2">
                      <DropdownMenuItem className="cursor-pointer text-white">
                        <User className="h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer text-white">
                        <TrendingUp className="h-4 w-4" />
                        Trading History
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer text-white">
                        <Wallet className="h-4 w-4" />
                        Wallet Settings
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer text-white">
                        <Settings className="h-4 w-4" />
                        Preferences
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-gray-700" />

                      <DropdownMenuItem className="cursor-pointer text-white">
                        <ExternalLink className="h-4 w-4" />
                        View on Explorer
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-gray-700" />

                      <DropdownMenuItem
                        className="cursor-pointer text-red-500/80! hover:bg-red-500/10! hover:text-red-500/80!"
                        onClick={disconnectWallet}
                      >
                        <LogOut className="h-4 w-4 text-red-500/80!" />
                        Disconnect Wallet
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "center", scale: 1 }}
              >
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="h-8 w-fit rounded-lg border border-green-600 bg-transparent px-7 text-xs font-semibold text-green-600 hover:bg-transparent md:h-9 md:text-sm"
                >
                  <UserRound className="size-3.5 md:size-4" />
                  Login
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
