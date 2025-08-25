"use client";

import { Copy, Info, Zap, User, Link, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { iCoin } from "@/types/onchain-data";
import { copyToClipboard, formatPublicKey } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Icon } from "@iconify/react";

dayjs.extend(relativeTime);

export function TokenInfo({ coin }: { coin: iCoin }) {
  const formatDate = (date: string) => {
    const dayJsDate = dayjs(date);
    const now = dayjs();
    const diffInDays = now.diff(dayJsDate, "day");

    if (diffInDays < 7) {
      return dayJsDate.fromNow();
    }
    return dayJsDate.format("MMM D, YYYY");
  };

  return (
    <TabsContent value="coin-info" className="space-x-2 md:space-y-6">
      <TooltipProvider>
        <Card className="gap-4 rounded-xl border-gray-800 bg-transparent md:gap-6 md:rounded-2xl md:border">
          <CardHeader className="">
            <div className="-mt-1 flex items-center justify-between">
              <CardTitle className="text-foreground/70 text-base font-semibold md:text-xl">
                Coin Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-1.5 text-gray-400 md:gap-2">
                <Info className="size-3 max-md:mb-0.5 md:size-4" />
                <span className="text-xs font-medium text-gray-400 md:text-sm">
                  Description
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 md:pl-6">
                {coin.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-muted/20 border-border/50 rounded-lg py-3 md:rounded-xl">
                <CardContent className="px-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Icon
                        icon="lucide:coins"
                        className="size-3.5 md:size-4"
                      />
                      <span className="text-xs font-medium md:text-sm">
                        Circulating Supply
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-3 text-gray-400/70 max-md:mb-0.5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total number of tokens currently in circulation</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-base font-semibold text-gray-300 md:text-lg">
                      1B tokens
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/20 border-border/50 rounded-lg py-3 md:rounded-xl">
                <CardContent className="px-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Icon
                        icon="lucide:calendar"
                        className="size-3.5 max-md:mb-0.5 md:size-4"
                      />
                      <span className="text-xs font-medium md:text-sm">
                        Created
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-base font-semibold text-gray-300 md:text-lg">
                      {formatDate(coin.blockchainCreatedAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-muted/20 rounded-lg py-3 md:rounded-xl">
                <CardContent className="px-3">
                  <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Icon
                        icon="lucide:chart-candlestick"
                        className="size-3.5 md:size-4"
                      />
                      <span className="text-xs font-medium md:text-sm">
                        Current Price
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-base font-semibold text-gray-300 md:text-lg">
                      {coin.currentPrice}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <div className="bg-muted/20 border-border/50 flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Zap className="size-3.5 text-gray-500 md:size-4" />
                    <span className="text-xs font-medium text-gray-400 md:text-sm">
                      Trade Fees
                    </span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="text-muted-foreground size-3 max-md:mb-0.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage fee charged on each trade transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <p className="text-xs text-gray-400 md:text-sm">1%</p>
                </div>

                <div className="bg-muted/20 border-border/50 space-y-1 rounded-lg border p-3 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Link className="size-3.5 text-gray-400 md:size-4" />
                    <span className="text-xs font-medium text-gray-300 md:text-sm">
                      Contract Address
                    </span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="size-3 text-gray-400 max-md:mb-0.25" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Smart contract address on the blockchain. Click to
                          copy full address.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-between pl-5.5 md:pl-7">
                    <div className="flex items-center gap-1 md:gap-2">
                      <code className="font-mono text-xs text-gray-400 md:text-sm">
                        {formatPublicKey(coin.mint)}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-secondary/20 flex size-5 items-center justify-center p-0 md:size-7"
                        onClick={() =>
                          copyToClipboard(coin.mint, "Contract address copied!")
                        }
                      >
                        <Copy className="size-3" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-xs max-md:h-fit max-md:p-1.5 max-md:px-1.5!"
                      onClick={() =>
                        window.open(
                          `https://solscan.io/token/${coin.mint}`,
                          "_blank",
                        )
                      }
                    >
                      <ExternalLink className="size-3 md:mr-1" />
                      <span className="hidden md:block">View on Explorer</span>
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/20 border-border/50 space-y-1 rounded-lg border p-3 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <User className="size-3.5 text-gray-400 md:size-4" />
                    <span className="text-xs font-medium text-gray-300 md:text-sm">
                      Developer Address
                    </span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="size-3 text-gray-400 max-md:mb-0.25" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Address of the token creator/developer. Click to copy
                          full address.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center justify-between pl-5.5 md:pl-7">
                    <div className="flex items-center gap-1 md:gap-2">
                      <code className="font-mono text-xs text-gray-400 md:text-sm">
                        {formatPublicKey(coin.creatorAddress)}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-secondary/20 flex size-5 items-center justify-center p-0 md:size-7"
                        onClick={() =>
                          copyToClipboard(
                            coin.creatorAddress,
                            "Developer address copied!",
                          )
                        }
                      >
                        <Copy className="size-3" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-xs max-md:h-fit max-md:p-1.5 max-md:px-1.5!"
                      onClick={() =>
                        window.open(
                          `https://solscan.io/account/${coin.creatorAddress}`,
                          "_blank",
                        )
                      }
                    >
                      <ExternalLink className="size-3 md:mr-1" />
                      <span className="hidden md:block">View Profile</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </TabsContent>
  );
}
