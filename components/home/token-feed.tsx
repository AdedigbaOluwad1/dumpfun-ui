"use client";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { cn, formatters } from "@/lib/utils";
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
import { useAppStore } from "@/stores";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  creator: string;
  createdAt: string;
  marketCap: string;
  replies: number;
  image: string;
  description: string;
  isNew?: boolean;
}

interface TokenFeedCardProps {
  token: iCoin;
  setTokens: React.Dispatch<React.SetStateAction<iCoin[]>>;
  solPrice: number;
}

// const initialTokens = [
//   {
//     id: "1",
//     name: "Keir Sucks",
//     symbol: "KeirSass",
//     creator: "Mediocre",
//     createdAt: "28s ago",
//     marketCap: "$5.5K",
//     replies: 0,
//     image: "/placeholder.svg?height=80&width=80&text=KS",
//     description:
//       "Fuck Keir Starmer. Bring awareness to his destructiveness in UK and kick him out.",
//     isNew: false,
//   },
//   {
//     id: "2",
//     name: "Pump Vibes Coin",
//     symbol: "SPVC",
//     creator: "7xYWk8",
//     createdAt: "1m ago",
//     marketCap: "$5.8K",
//     replies: 0,
//     image: "/placeholder.svg?height=80&width=80&text=PV",
//     description:
//       "Signal $PUMP Vibes coin, The party vibes and PUMPFEST token on the Solana blockchain. All in want green candle to do is pump memes and spread good vibes.",
//   },
//   {
//     id: "3",
//     name: "URPENIS",
//     symbol: "URPENIS",
//     creator: "EwTHM3",
//     createdAt: "3m ago",
//     marketCap: "$5.4K",
//     replies: 0,
//     image: "/placeholder.svg?height=80&width=80&text=UP",
//     description: "URANUS FOR URPENIS",
//   },
//   {
//     id: "4",
//     name: "aspirin",
//     symbol: "aspirin",
//     creator: "F4QgvC",
//     createdAt: "5m ago",
//     marketCap: "$5.3K",
//     replies: 0,
//     image: "/placeholder.svg?height=80&width=80&text=ASP",
//     description: "get the right treatment! $aspirin",
//   },
//   {
//     id: "5",
//     name: "Escobar Coin",
//     symbol: "SPLATA",
//     creator: "4ndrgE",
//     createdAt: "5m ago",
//     marketCap: "$5.4K",
//     replies: 0,
//     image: "/placeholder.svg?height=80&width=80&text=ESC",
//     description:
//       "Once a 'Kingpin' in the banana republic of Memelandia, SPLATA founder 'El Patrón' lost his entire fortune betting on Dogecoin shorts in 2021. Now he's back — legally this time (we swear) — to conquer DeFi with a new motto: 'Plata o Hodl!' TOKENOMICS (100% LEGIT & RIDICULOUS): Supply: 1 Escobillion tokens (69% burned in a 'pool party incident') Tax: 0% rug pulls, 10% funds Narwhal Conservation (to atone for past sins 🐋) Utility: Stake to earn 'Snow Globe' NFTs (it's just glitter, folks 😂)",
//   },
//   {
//     id: "6",
//     name: "Place your bets",
//     symbol: "Beta",
//     creator: "BbxPS5",
//     createdAt: "6m ago",
//     marketCap: "$5.2K",
//     replies: 0,
//     image: "/placeholder.svg?height=80&width=80&text=BET",
//     description: "Place your bets (Beta):",
//   },
// ];
export function TokenFeed({ data }: { data: iPaginatedResponse<iCoin> }) {
  const [tokens, setTokens] = useState<iCoin[]>(data.data || []);
  const { solPrice } = useAppStore();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTokens((prev) => [...prev]);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newTokens = [
  //       {
  //         id: Date.now().toString(),
  //         name: "Moon Rocket" + Math.random().toFixed(2),
  //         symbol: "MOON",
  //         creator: "CryptoApe",
  //         createdAt: "Now",
  //         marketCap: "$1.2K",
  //         replies: 0,
  //         image: "/placeholder.svg?height=80&width=80&text=MR",
  //         description: "🚀 TO THE MOON! New memecoin just launched!",
  //         isNew: true,
  //       },
  //     ];

  //     setTokens((prev) => [...newTokens, ...prev.slice(0, 17)]);

  //     setTimeout(() => {
  //       setTokens((prev) => prev.map((token) => ({ ...token, isNew: false })));
  //     }, 5000);
  //   }, 8000);

  //   return () => clearInterval(interval);
  // }, []);

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
