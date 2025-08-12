/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuthStore } from "@/stores";
import { iCoin } from "@/types/onchain-data";

interface WidgetState {
  tradeType: "buy" | "sell";
  coin: iCoin;
}

export function TradingPanel({ coin: initCoinData }: { coin: iCoin }) {
  const { userBalance, publicKey } = useAuthStore();
  const [widgetState, setWidgetState] = useState<WidgetState>({
    tradeType: "buy",
    coin: initCoinData,
  });

  return (
    <Card className="sticky top-8 gap-0 border-gray-800 bg-gray-900/50">
      <CardContent className="space-y-6">
        <div className="mb-5 flex flex-col gap-3 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 md:text-base">
              Market Cap: $6.5k
            </span>
            <span className="text-xs font-medium text-blue-400 md:text-sm">
              ATH: $5.3K
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700 md:h-2.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-400 to-emerald-400 transition-all"
                style={{ width: "50%" }}
              ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-400 md:text-base">
              <span>Bonding Curve Progress:</span>
              <span>1.0%</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="mx-auto grid h-fit w-full max-w-8/10 grid-cols-2 rounded-full bg-gray-950! p-0">
            <TabsTrigger
              value="buy"
              onClick={() =>
                setWidgetState((prev) => ({ ...prev, tradeType: "buy" }))
              }
              className="rounded-full from-green-500 to-emerald-600 py-2.5 text-sm text-white/80! data-[state=active]:bg-gradient-to-r! data-[state=active]:text-white md:text-base"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              onClick={() =>
                setWidgetState((prev) => ({ ...prev, tradeType: "sell" }))
              }
              className="rounded-full from-rose-500 to-red-600 py-2.5 text-sm text-white/80! data-[state=active]:bg-gradient-to-r! data-[state=active]:text-white! md:text-base"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="text-xs text-gray-500">
                  Balance: {`${!!publicKey ? userBalance : 0} SOL`}
                </span>
              </div>
              <div className="relative">
                <Input
                  placeholder="0"
                  className="font-semibld h-13 rounded-full border-gray-600/50! bg-transparent! pr-20 pl-4 text-left font-mono text-xl text-white/80! md:h-14 md:pl-5 md:text-2xl!"
                />
                <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
                  <Badge className="flex gap-2 rounded-full bg-gray-700 p-1.5 px-1.5 pr-3 text-sm text-white md:text-base!">
                    <img
                      src={
                        "https://img-v1.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                      }
                      className="size-5 rounded-full md:size-6"
                      alt=""
                    />
                    SOL
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                0.1 SOL
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                0.5 SOL
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                Max
              </Button>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Set max slippage</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  Auto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  5%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  10%
                </Button>
              </div>
            </div>

            <Button
              className="h-10.5 w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-7 text-sm font-semibold text-white hover:from-green-600 hover:to-emerald-700 md:h-12 md:text-base"
              // disabled
            >
              Log in to trade
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="text-xs text-gray-500">
                  Balance: {`${!!publicKey ? "12.65M" : 0} KNOB`}
                </span>
              </div>
              <div className="relative">
                <Input
                  placeholder="0"
                  className="font-semibld h-13 rounded-full border-gray-600/50! bg-transparent! pr-20 pl-4 text-left font-mono text-xl! text-white/80! md:h-14 md:pl-5 md:text-2xl!"
                />
                <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
                  <Badge className="flex gap-2 rounded-full bg-gray-700 p-1.5 px-1.5 pr-3 text-sm text-white md:text-base!">
                    <img
                      src={"/tipzy.png"}
                      className="size-5 rounded-full md:size-6"
                      alt=""
                    />
                    KNOB
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                25%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                75%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-600 bg-transparent text-xs"
              >
                100%
              </Button>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Set max slippage</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  Auto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  5%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-12 rounded-full border-gray-600 bg-transparent text-xs"
                >
                  10%
                </Button>
              </div>
            </div>

            <Button
              className="h-10.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-7 text-sm font-semibold text-white hover:from-rose-600 hover:to-red-700 md:h-12 md:text-base"
              // disabled
            >
              Log in to trade
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
