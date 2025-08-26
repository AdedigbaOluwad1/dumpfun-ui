/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useAppStore, useAuthStore } from "@/stores";
import { iCoin } from "@/types/onchain-data";
import {
  calculateBondingCurveProgress,
  cn,
  EventBus,
  formatters,
  formatWithCommas,
  getTokenBalance,
  sanitizeDecimal,
} from "@/lib/utils";
import { OnTradeEvent } from "@/types/events";
import Image from "next/image";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import {
  AccountLayout,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

interface WidgetState {
  tradeType: "buy" | "sell";
  coin: iCoin;
  solPurchaseAmount: string;
  tokenSaleAmount: string;
  buySlippageBPS: number;
  sellSlippageBPS: number;
  isLoading: boolean;
  bondingCurveProgress: number;
  userTokenBalance: number;
}

export function TradingPanel({ coin: initCoinData }: { coin: iCoin }) {
  const { signTransaction } = useWallet();
  const { solPrice, program, connection } = useAppStore();
  const { userBalance, publicKey, setIsLoginModalOpen } = useAuthStore();
  const [
    {
      coin,
      solPurchaseAmount,
      buySlippageBPS,
      isLoading,
      bondingCurveProgress,
      sellSlippageBPS,
      userTokenBalance,
      tokenSaleAmount,
    },
    setWidgetState,
  ] = useState<WidgetState>({
    tradeType: "buy",
    coin: initCoinData,
    solPurchaseAmount: "",
    tokenSaleAmount: "",
    isLoading: false,
    buySlippageBPS: 1,
    sellSlippageBPS: 1,
    userTokenBalance: 0,
    bondingCurveProgress: parseFloat(
      calculateBondingCurveProgress(
        formatters.formatTokenAmount(initCoinData.realTokenReserves),
      ).toFixed(1),
    ),
  });
  const mintPubKey = new PublicKey(coin.mint);

  const handleInputChange = (e?: string, isToken?: boolean) => {
    // First sanitize
    let cleanValue = sanitizeDecimal(e ?? "", 6);

    // Then format with commas
    if (cleanValue) {
      cleanValue = formatWithCommas(cleanValue);
    }

    setWidgetState((prev) => ({
      ...prev,
      ...(isToken
        ? { tokenSaleAmount: cleanValue }
        : { solPurchaseAmount: cleanValue }),
    }));
  };

  const solPresetPrices = [
    {
      label: "Reset",
      onClick: () => {
        toast.info("Formulating poverty restoration sequence...");
        setWidgetState((prev) => ({
          ...prev,
          solPurchaseAmount: "",
        }));
      },
    },
    {
      label: "0.1 SOL",
      onClick: () => {
        if (userBalance < 0.1)
          return toast.error("Not enough SOL, peasant. Touch grass.");
        toast.info("Deploying baby whale strategy 🐳");
        setWidgetState((prev) => ({
          ...prev,
          solPurchaseAmount: "0.1",
        }));
      },
    },
    {
      label: "0.5 SOL",
      onClick: () => {
        if (userBalance < 0.5)
          return toast.error("Insufficient funds. McDonald's is hiring 🍟");
        toast.info("Deploying medium degen strategy ⚡");
        setWidgetState((prev) => ({
          ...prev,
          solPurchaseAmount: "0.5",
        }));
      },
    },
    {
      label: "Max",
      onClick: () => {
        if (userBalance <= 0)
          return toast.error("Max what? You're broke, my friend.");
        toast.info("All-in mode engaged. Moon or bust 🚀");
        setWidgetState((prev) => ({
          ...prev,
          solPurchaseAmount: userBalance.toFixed(3),
        }));
      },
    },
  ];

  const tokenPresetPrices = [
    {
      label: "Reset",
      onClick: () => {
        toast.info("Initiating manual rug strategy configuration...");
        setWidgetState((prev) => ({
          ...prev,
          tokenSaleAmount: "",
        }));
      },
    },
    {
      label: "25%",
      onClick: () => {
        if (userTokenBalance <= 0)
          return toast.error(
            "Can’t sell 25% of nothing, math ain’t mathing 🧮💀",
          );
        toast.info("Quarter dump initiated — testing the market waters 🌊");
        handleInputChange((userTokenBalance * 0.25).toFixed(3), true);
      },
    },
    {
      label: "50%",
      onClick: () => {
        if (userTokenBalance <= 0)
          return toast.error("Bro… selling air now? 🫠");
        toast.info("Half dump — you’re either smart or halfway to regret 🤷‍♂️");
        handleInputChange((userTokenBalance * 0.5).toFixed(3), true);
      },
    },
    {
      label: "75%",
      onClick: () => {
        if (userTokenBalance <= 0)
          return toast.error("NGMI chief — you’re already at zero 📉💀");
        toast.info("Three-quarters out — market makers shaking 😬");
        handleInputChange((userTokenBalance * 0.75).toFixed(3), true);
      },
    },
    {
      label: "100%",
      onClick: () => {
        if (userTokenBalance <= 0)
          return toast.error("Full send? Bro you’re already at zero 💀");
        toast.info("All-out liquidation — goodbye hopium, hello rent money 🏚️");
        handleInputChange(userTokenBalance.toFixed(3), true);
      },
    },
  ];

  const buySlippagePercentage = [
    {
      label: "Auto",
      onClick: () => {
        toast.info("Auto mode: Let the code gamble for you 🤖");
        setWidgetState((prev) => ({ ...prev, buySlippageBPS: 5 }));
      },
      isActive: buySlippageBPS === 5,
    },
    {
      label: "0.1%",
      onClick: () => {
        toast.info("0.1%? Playing it safer than grandma.");
        setWidgetState((prev) => ({ ...prev, buySlippageBPS: 0.1 }));
      },
      isActive: buySlippageBPS === 0.1,
    },
    {
      label: "0.5%",
      onClick: () => {
        toast.info("0.5% — spicy, but not full degen.");
        setWidgetState((prev) => ({ ...prev, buySlippageBPS: 0.5 }));
      },
      isActive: buySlippageBPS === 0.5,
    },
    {
      label: "1%",
      onClick: () => {
        toast.info("1% — now we’re talking moon mission.");
        setWidgetState((prev) => ({ ...prev, buySlippageBPS: 1 }));
      },
      isActive: buySlippageBPS === 1,
    },
  ];

  const sellSlippagePercentage = [
    {
      label: "Auto",
      onClick: () => {
        toast.info("Auto mode: AI decides your fate, ser 🤖🎲");
        setWidgetState((prev) => ({ ...prev, sellSlippageBPS: 5 }));
      },
      isActive: sellSlippageBPS === 5,
    },
    {
      label: "0.1%",
      onClick: () => {
        toast.info("0.1% — paper hands detected, retreating to safety 🏳️");
        setWidgetState((prev) => ({ ...prev, sellSlippageBPS: 0.1 }));
      },
      isActive: sellSlippageBPS === 0.1,
    },
    {
      label: "0.5%",
      onClick: () => {
        toast.info("0.5% — just enough spice to make the exit interesting 🌶️");
        setWidgetState((prev) => ({ ...prev, sellSlippageBPS: 0.5 }));
      },
      isActive: sellSlippageBPS === 0.5,
    },
    {
      label: "1%",
      onClick: () => {
        toast.info("1% — rug or riches, spin the wheel 🎡💀");
        setWidgetState((prev) => ({ ...prev, sellSlippageBPS: 1 }));
      },
      isActive: sellSlippageBPS === 1,
    },
  ];

  const handleTokenPurchase = async () => {
    try {
      const userPubkey = new PublicKey(publicKey || "");

      const purchaseAmount = parseFloat(solPurchaseAmount.replaceAll(",", ""));

      if (userBalance < purchaseAmount || purchaseAmount <= 0) {
        return toast.error("Purchase aborted — go earn some SOL 🌱");
      }

      setWidgetState((prev) => ({ ...prev, isLoading: true }));

      const ix = await program!.methods
        .buy(
          new BN(purchaseAmount * LAMPORTS_PER_SOL),
          new BN(buySlippageBPS * 100),
        )
        .accounts({
          mint: mintPubKey,
          buyer: userPubkey,
          program: program!.programId,
        })
        .instruction();

      toast.info("Consulting the pump gods for blessings... 🙏");

      const tx = new Transaction().add(ix);

      const { blockhash } = await connection.getLatestBlockhash();

      tx.recentBlockhash = blockhash;
      tx.feePayer = userPubkey;

      const signed = await signTransaction?.(tx);

      toast.info("Slapping that transaction into the mempool... 🔥");

      const signature = await connection.sendRawTransaction(
        signed!.serialize(),
        {
          skipPreflight: true,
          preflightCommitment: "confirmed",
          maxRetries: 5,
        },
      );

      const {
        blockhash: recentBlockhash,
        lastValidBlockHeight: recentLastValidBlockHeight,
      } = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          signature,
          blockhash: recentBlockhash,
          lastValidBlockHeight: recentLastValidBlockHeight,
        },
        "finalized",
      );

      toast.success("Bag secured — moon mission initiated 🌕🚀");

      setWidgetState((prev) => ({
        ...prev,
        isLoading: false,
        solPurchaseAmount: "",
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setWidgetState((prev) => ({ ...prev, isLoading: false }));

      toast.error(
        err?.message || "Oops, the chain just fudged your vibes 🤡💀",
      );
    }
  };

  const handleTokenSale = async () => {
    try {
      const userPubkey = new PublicKey(publicKey || "");

      const saleAmount = parseFloat(tokenSaleAmount.replaceAll(",", ""));

      if (userTokenBalance < saleAmount || saleAmount <= 0) {
        return toast.error(
          "Not enough bags to dump — touch grass and come back 🌾",
        );
      }

      setWidgetState((prev) => ({ ...prev, isLoading: true }));

      const ix = await program!.methods
        .sell(
          new BN(saleAmount * 1_000_000),
          false,
          new BN(sellSlippageBPS * 100),
        )
        .accounts({
          mint: mintPubKey,
          seller: userPubkey,
          program: program!.programId,
        })
        .instruction();

      toast.info("Consulting the dump gods for permission... 🗿📉");

      const tx = new Transaction().add(ix);

      const { blockhash } = await connection.getLatestBlockhash();

      tx.recentBlockhash = blockhash;
      tx.feePayer = userPubkey;

      const signed = await signTransaction?.(tx);

      toast.info("Yeeting those bags straight into the mempool... 💨");

      const signature = await connection.sendRawTransaction(
        signed!.serialize(),
        {
          skipPreflight: true,
          preflightCommitment: "confirmed",
          maxRetries: 5,
        },
      );

      const {
        blockhash: recentBlockhash,
        lastValidBlockHeight: recentLastValidBlockHeight,
      } = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          signature,
          blockhash: recentBlockhash,
          lastValidBlockHeight: recentLastValidBlockHeight,
        },
        "finalized",
      );

      setWidgetState((prev) => ({
        ...prev,
        isLoading: false,
        tokenSaleAmount: "",
      }));

      toast.success("Dump complete — enjoy your exit liquidity 💰🪂");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setWidgetState((prev) => ({ ...prev, isLoading: false }));

      toast.error(
        err?.message || "Rug pulled by the chain — bags still stuck 🪤💀",
      );
    }
  };

  useEffect(() => {
    let tokenAccountChangeEventId = 1000;

    const handleTradeEvent = (event: CustomEvent<OnTradeEvent>) => {
      const {
        detail: { marketCap, currentPrice, mint, realTokenReserves },
      } = event;

      if (mint === coin.mint) {
        setWidgetState((prev) => ({
          ...prev,
          coin: {
            ...prev.coin,
            marketCap,
            currentPrice,
          },
          bondingCurveProgress: parseFloat(
            calculateBondingCurveProgress(
              formatters.formatTokenAmount(realTokenReserves),
            ).toFixed(1),
          ),
        }));
      }
    };

    if (publicKey) {
      const ata = getAssociatedTokenAddressSync(
        new PublicKey(coin.mint),
        new PublicKey(publicKey),
      );
      getTokenBalance(ata, connection, (balance) =>
        setWidgetState((prev) => ({ ...prev, userTokenBalance: balance })),
      );

      tokenAccountChangeEventId = connection.onAccountChange(
        ata,
        (accountInfo) => {
          const data = accountInfo.data;
          const tokenAccount = AccountLayout.decode(data);

          const balance = formatters.formatTokenAmount(
            Number(tokenAccount.amount),
            6,
          );

          setWidgetState((prev) => ({ ...prev, userTokenBalance: balance }));
        },
        { commitment: "confirmed" },
      );
    }

    EventBus.on("onTradeEvent", handleTradeEvent);

    return () => {
      EventBus.off("onTradeEvent", handleTradeEvent);
      connection.removeAccountChangeListener(tokenAccountChangeEventId);
    };
  }, [publicKey]);

  return (
    <Card className="gap-0 border-gray-800 bg-gray-900/50">
      <CardContent className="space-y-6">
        <div className="mb-5 flex flex-col gap-3 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 md:text-base">
              Market Cap: $
              {formatters.formatCompactNumber(coin.marketCap * solPrice)}
            </span>
            <span className="text-xs font-medium text-blue-400 md:text-sm">
              ATH: ${formatters.formatCompactNumber(coin.marketCap * solPrice)}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700 md:h-2.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-400 to-emerald-400 transition-all duration-400"
                style={{
                  width: `${bondingCurveProgress}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-400 md:text-base">
              <span>Bonding Curve Progress:</span>
              <span>{`${bondingCurveProgress}%`}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <div className="px-3">
            <TabsList className="mx-auto grid h-fit w-full grid-cols-2 rounded-full bg-gray-950! p-0">
              <TabsTrigger
                value="buy"
                onClick={() =>
                  setWidgetState((prev) => ({ ...prev, tradeType: "buy" }))
                }
                disabled={isLoading}
                className="rounded-full from-green-500 to-emerald-600 py-2 text-sm text-white/80! data-[state=active]:bg-gradient-to-r! data-[state=active]:text-white md:text-base"
              >
                Buy
              </TabsTrigger>

              <TabsTrigger
                value="sell"
                disabled={isLoading}
                onClick={() =>
                  setWidgetState((prev) => ({ ...prev, tradeType: "sell" }))
                }
                className="rounded-full from-rose-500 to-red-600 py-2 text-sm text-white/80! data-[state=active]:bg-gradient-to-r! data-[state=active]:text-white! md:text-base"
              >
                Sell
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="buy" className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="text-xs text-gray-500">
                  Balance: {`${!!publicKey ? userBalance.toFixed(2) : 0} SOL`}
                </span>
              </div>
              <div className="relative">
                <Input
                  placeholder="0.00"
                  onChange={(e) => handleInputChange(e.target.value)}
                  value={solPurchaseAmount}
                  className="font-semibld h-13 rounded-full border-gray-600/50! bg-transparent! pr-20 pl-4 text-left font-mono text-xl text-white/80! md:h-14 md:pl-5 md:text-2xl!"
                />

                <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
                  <Badge className="flex gap-2 rounded-full bg-gray-700 p-1.5 px-1.5 pr-3 text-sm text-white md:text-base!">
                    <Image
                      src={
                        "https://img-v1.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                      }
                      className="size-5 rounded-full md:size-6"
                      alt=""
                      width={20}
                      height={20}
                    />
                    SOL
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {solPresetPrices.map(({ label, onClick }) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={label}
                  onClick={onClick}
                  className="rounded-full border-gray-600 bg-transparent text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Set max slippage</span>
              </div>
              <div className="flex items-center gap-2">
                {buySlippagePercentage.map(({ isActive, label, onClick }) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={`buy.${label}`}
                    onClick={onClick}
                    className={cn(
                      "min-w-12 rounded-full text-xs",
                      isActive && "border-green-600/70! bg-green-500/20!",
                    )}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              className="h-10.5 w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-7 text-sm font-semibold text-white hover:from-green-600 hover:to-emerald-700 md:h-12 md:text-base"
              disabled={isLoading}
              onClick={() => {
                if (publicKey) {
                  handleTokenPurchase();
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  YOLO-ing your SOL 🚀
                </>
              ) : publicKey ? (
                `Buy ${coin.symbol}`
              ) : (
                "Log in to trade"
              )}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="text-xs text-gray-500">
                  Balance:{" "}
                  {`${!!publicKey ? formatters.formatCompactNumber(userTokenBalance) : 0} ${coin.symbol}`}
                </span>
              </div>
              <div className="relative">
                <Input
                  placeholder="0.00"
                  onChange={(e) => handleInputChange(e.target.value, true)}
                  value={tokenSaleAmount}
                  className="font-semibld h-13 rounded-full border-gray-600/50! bg-transparent! pr-20 pl-4 text-left font-mono text-xl! text-white/80! md:h-14 md:pl-5 md:text-2xl!"
                />
                <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
                  <Badge className="flex gap-2 rounded-full bg-gray-700 p-1.5 px-1.5 pr-3 text-sm text-white md:text-base!">
                    <Image
                      src={coin.image}
                      className="size-5 rounded-full md:size-6"
                      alt=""
                      width={20}
                      height={20}
                    />
                    {coin.symbol}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {tokenPresetPrices.map(({ label, onClick }) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={label}
                  onClick={onClick}
                  className="rounded-full border-gray-600 bg-transparent text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Set max slippage</span>
              </div>
              <div className="flex items-center gap-2">
                {sellSlippagePercentage.map(({ isActive, label, onClick }) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={`buy.${label}`}
                    onClick={onClick}
                    className={cn(
                      "min-w-12 rounded-full text-xs",
                      isActive && "border-rose-500/70! bg-rose-500/20!",
                    )}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              className="h-10.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-7 text-sm font-semibold text-white hover:from-rose-600 hover:to-red-700 md:h-12 md:text-base"
              disabled={isLoading}
              onClick={() => {
                if (publicKey) {
                  handleTokenSale();
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Yeeting your bags 🚀📉
                </>
              ) : publicKey ? (
                `Sell ${coin.symbol}`
              ) : (
                "Log in to trade"
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
