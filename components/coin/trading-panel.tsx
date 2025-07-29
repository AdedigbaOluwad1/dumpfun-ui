"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function TradingPanel() {
  return (
    <Card className="sticky top-8 gap-0 border-gray-800 bg-gray-900/50">
      <CardContent className="space-y-6">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid h-fit w-full grid-cols-2 bg-gray-700!">
            <TabsTrigger
              value="buy"
              className="py-1.5 text-sm data-[state=active]:bg-green-600! data-[state=active]:text-white md:text-base"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="py-1.5 text-sm data-[state=active]:bg-red-600! data-[state=active]:text-white! md:text-base"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-6 space-y-4">
            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                className="border-green-500 bg-transparent text-green-400 hover:bg-green-500! hover:text-white"
              >
                Switch to KRYPT
              </Button>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">You pay</span>
                <span className="text-xs text-gray-500">Balance: 0 SOL</span>
              </div>
              <div className="relative">
                <Input
                  placeholder="0"
                  className="h-12 rounded-lg border-gray-600/50! bg-transparent! pr-16 pl-4 text-left text-xl! text-white/80!"
                />
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  <Badge className="bg-gray-600 text-white">SOL</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(65px,1fr))] gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                0.1 SOL
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                0.5 SOL
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                Max
              </Button>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Set max slippage</span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(65px,1fr))] gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  Auto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  5%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  10%
                </Button>
              </div>
            </div>

            <Button
              className="h-11 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-7 text-sm font-semibold text-white hover:from-green-600 hover:to-emerald-700 md:h-12 md:text-base"
              // disabled
            >
              Log in to trade
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">You pay</span>
                <span className="text-xs text-gray-500">Balance: 0 SOL</span>
              </div>
              <div className="relative">
                <Input
                  placeholder="0"
                  className="h-12 rounded-lg border-gray-600/50! bg-transparent! pr-16 pl-4 text-left text-xl! text-white"
                />
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  <Badge className="bg-gray-600 text-white">SOL</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(65px,1fr))] gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                25%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-gray-600 bg-transparent text-xs"
              >
                100%
              </Button>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Set max slippage</span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(65px,1fr))] gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  Auto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  5%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-gray-600 bg-transparent text-xs"
                >
                  10%
                </Button>
              </div>
            </div>

            <Button
              className="h-11 w-full rounded-lg bg-gradient-to-r from-rose-500 to-red-600 px-7 text-sm font-semibold text-white hover:from-rose-600 hover:to-red-700 md:h-12 md:text-base"
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
