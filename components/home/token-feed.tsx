/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { cn, EventBus, formatters } from "@/lib/utils";
import clsx from "clsx";
import {
  Clock,
  ExternalLink,
  Heart,
  MessageCircle,
  Rocket,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { iCoin, iPaginatedResponse } from "@/types/onchain-data";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useAppStore, useOnchainDataStore } from "@/stores";

interface TokenFeedCardProps {
  token: iCoin;
  setTokens: React.Dispatch<React.SetStateAction<iCoin[]>>;
  solPrice: number;
}

export function TokenFeed({ data }: { data: iPaginatedResponse<iCoin> }) {
  const [tokens, setTokens] = useState<iCoin[]>(data.data || []);
  const { solPrice } = useAppStore();
  const { getCoinInfo } = useOnchainDataStore();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTokens((prev) => [...prev]);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    EventBus.on("onInitializeEvent", (data) => {
      // Wait for 3 secs before calling the server.. Buffer time
      return setTimeout(() => {
        return getCoinInfo(data.detail.mint, (status, data) => {
          if (status && data) {
            setTokens((prev) => [
              { ...data, isNew: true },
              ...prev.slice(0, 29),
            ]);
            setTimeout(() => {
              setTokens((prev) =>
                prev.map((token) =>
                  token.id === data.id ? { ...token, isNew: false } : token,
                ),
              );
            }, 5000);
          }
        });
      }, 3000);
    });

    EventBus.on(
      "onTradeEvent",
      ({ detail: { currentPrice, marketCap, mint } }) => {
        // Update only if data contains emitted event mint
        if (tokens.find((e) => e.mint === mint))
          setTokens((prev) =>
            prev.map((token) =>
              token.mint === mint
                ? {
                    ...token,
                    currentPrice,
                    marketCap,
                  }
                : token,
            ),
          );
      },
    );

    return () => {
      EventBus.off("onInitializeEvent", () => {});
      EventBus.off("onTradeEvent", () => {});
    };
  }, [getCoinInfo]);

  return (
    <motion.div className="grid gap-6 overflow-y-hidden min-[1700px]:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]! sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      <AnimatePresence mode="popLayout">
        {tokens.map((token) => (
          <TokenFeedCard
            key={token.id}
            setTokens={setTokens}
            solPrice={solPrice}
            token={token}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

const TokenFeedCard = memo(function TokenFeedCard({
  token,
  setTokens,
  solPrice,
}: TokenFeedCardProps) {
  return (
    <motion.div
      key={token.id}
      layout
      initial={
        token.isNew
          ? {
              scale: 0.8,
              opacity: 0,
              y: -20,
            }
          : false
      }
      animate={
        token.isNew
          ? {
              scale: 1,
              opacity: 1,
              y: 0,
              x: [0, -2, 2, -2, 2, -1, 1, 0],
            }
          : {
              scale: 1,
              opacity: 1,
              y: 0,
            }
      }
      transition={
        token.isNew
          ? {
              duration: 0.6,
              x: {
                duration: 0.5,
                delay: 0.3,
                repeat: 3,
                repeatType: "reverse",
              },
            }
          : { layout: { duration: 0.3 } }
      }
      onAnimationComplete={() => {
        if (token.isNew) {
          setTokens((prev) =>
            prev.map((t) => (t.id === token.id ? { ...t, isNew: false } : t)),
          );
        }
      }}
      className="relative h-full"
    >
      {token.isNew && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0.6, 0],
              scale: [0, 1, 1.2, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <motion.div
              initial={{ x: -50, y: 100 }}
              animate={{ x: 500, y: -30 }}
              transition={{
                duration: 2,
                delay: 0.4,
                ease: "easeOut",
              }}
              className="absolute h-1 w-20 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"
              style={{
                filter: "blur(1px)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{
              x: -30,
              y: 80,
              opacity: 0,
              rotate: -35,
              scale: 0.8,
            }}
            animate={{
              x: 300,
              y: -20,
              opacity: [0, 1, 1, 1, 0],
              rotate: -35,
              scale: [0.8, 1, 1, 1, 0.8],
            }}
            transition={{
              duration: 2,
              delay: 0.4,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute top-0 left-0 z-30"
          >
            <div className="relative">
              <Rocket className="h-5 w-5 text-orange-400 drop-shadow-lg" />
              <div className="absolute inset-0 h-5 w-5">
                <Rocket className="h-5 w-5 text-orange-300 opacity-50 blur-sm" />
              </div>
            </div>
          </motion.div>

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 60 - 30],
              }}
              transition={{
                duration: 2,
                delay: 0.6 + i * 0.1,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute top-1/2 left-1/2 z-25"
            >
              <div className="h-1 w-1 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
            </motion.div>
          ))}
        </>
      )}
      <Card
        key={token.id}
        className={cn(
          clsx(
            "group h-full w-full rounded-2xl border-gray-800 bg-gray-900/50 py-0! transition-all hover:bg-gray-900/70 md:rounded-3xl",
            token.isNew
              ? "border-green-400/50 shadow-lg shadow-green-400/10"
              : "",
          ),
        )}
      >
        <CardContent className="flex h-full flex-col p-4 md:p-5">
          {token.isNew && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 6,
                repeat: 4,
                delay: 0.2,
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-sm md:rounded-3xl"
            />
          )}

          {token.isNew && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="absolute top-5 right-5 z-20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: 3,
                  delay: 1,
                }}
                className="rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white md:text-[0.625rem]"
              >
                NEW
              </motion.div>
            </motion.div>
          )}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={token.isNew ? { rotate: 0 } : false}
                animate={token.isNew ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: token.isNew ? 1 : 0,
                  delay: token.isNew ? 0.5 : 0,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={token.image}
                  alt={token.name}
                  width={60}
                  height={60}
                  className="aspect-square size-13 rounded-xl object-cover object-center md:size-15"
                />
              </motion.div>
              <div>
                <motion.h3
                  initial={token.isNew ? { x: -20, opacity: 0 } : false}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: token.isNew ? 0.6 : 0,
                    duration: token.isNew ? 0.5 : 0.1,
                  }}
                  className="text-base font-semibold text-white md:text-lg"
                >
                  {token.name}
                </motion.h3>

                <motion.p
                  initial={token.isNew ? { x: -20, opacity: 0 } : false}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: token.isNew ? 0.7 : 0,
                    duration: token.isNew ? 0.5 : 0.1,
                  }}
                  className="text-xs text-gray-400 md:text-sm"
                >
                  ({token.symbol})
                </motion.p>
              </div>
            </div>
            <Link href={`/coin/${token.mint}`}>
              <Button
                size="sm"
                variant="ghost"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mb-3 flex items-center space-x-2">
            <span className="text-xs text-gray-400 md:text-sm">Creator</span>
            <Avatar className="h-5 w-5">
              <AvatarImage src={token.creatorAvatar} className="bg-gray-700" />
              <AvatarFallback className="bg-gray-700 text-xs">C</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-green-400 md:text-sm">
              {token.creator}
            </span>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-3 w-3" />
              <span className="text-xs">
                {dayjs().to(dayjs(token.blockchainCreatedAt))}
              </span>
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
              MC: {formatters.formatCompactNumber(token.marketCap * solPrice)}
            </Badge>
            <span className="text-xs text-gray-500">Replies: 0</span>
          </div>

          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-300 md:text-sm">
            {token.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-gray-700 pt-3">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-400 transition-colors hover:text-pink-400">
                <Heart className="h-4 w-4" />
                <span className="text-sm">0</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 transition-colors hover:text-blue-400">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{/* {token.replies} */}0</span>
              </button>
            </div>
            <Link href={`/coin/${token.mint}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-xs text-white hover:from-green-600 hover:to-emerald-700 md:text-sm"
              >
                <Zap className="size-3.5 md:size-4" />
                Trade
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});
