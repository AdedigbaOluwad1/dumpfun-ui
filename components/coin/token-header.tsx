/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Icon } from "@iconify/react";
import { iCoin } from "@/types/onchain-data";
import { useEffect, useState } from "react";
import { copyToClipboard, EventBus, formatPublicKey } from "@/lib/utils";
import { useAppStore } from "@/stores";
import dayjs from "dayjs";
import { OnTradeEvent } from "@/types/events";

export function TokenHeader({ coin: initCoinInfo }: { coin: iCoin }) {
  const { solPrice } = useAppStore();
  const [{ coin }, setWidgetState] = useState({
    coin: initCoinInfo,
  });

  useEffect(() => {
    const handleTradeEvent = (event: CustomEvent<OnTradeEvent>) => {
      const {
        detail: { marketCap, currentPrice, mint },
      } = event;

      if (mint === coin.mint) {
        setWidgetState((prev) => ({
          ...prev,
          coin: {
            ...prev.coin,
            marketCap,
            currentPrice,
          },
        }));
      }
    };

    EventBus.on("onTradeEvent", handleTradeEvent);

    return () => {
      EventBus.off("onTradeEvent", handleTradeEvent);
    };
  }, []);
  return (
    <div className="mb-8 flex flex-col gap-8">
      <div className="flex items-center gap-3 md:gap-5">
        <Image
          src={coin.image}
          alt=""
          width={100}
          height={100}
          className="aspect-square size-20! rounded-full border-3 border-gray-700 md:size-25!"
        />

        <div className="flex flex-col">
          <h4 className="text-base font-semibold md:text-xl lg:text-2xl">
            {coin.name}
          </h4>
          <h5 className="text-xs font-medium text-gray-400 md:text-base">
            {coin.symbol}
          </h5>
          <h4 className="flex items-center gap-2 text-xs md:text-base">
            Created by:
            <Avatar className="size-4 min-w-4 md:ml-1 md:size-5 md:min-w-5">
              <AvatarImage src={coin.creatorAvatar} className="bg-gray-700" />
              <AvatarFallback className="bg-gray-700 text-xs">C</AvatarFallback>
            </Avatar>
            <span className="text-green-400">{coin.creator}</span>
          </h4>
        </div>
      </div>

      <ScrollArea className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs whitespace-nowrap md:gap-4 md:text-sm">
          <div className="flex items-center rounded-full border border-gray-800/60 bg-gray-900/50 p-1.75 px-4 text-gray-300 md:gap-2 md:p-2.5 md:px-6">
            <p className="flex items-center gap-2">
              Contract Address:
              <span className="mr-2 font-mono">
                {formatPublicKey(coin.mint)}
              </span>
            </p>
            <Icon
              icon={"lucide:copy"}
              className="cursor-pointer"
              onClick={() =>
                copyToClipboard(coin.mint, "Address Copied to Clipboard!")
              }
            />
          </div>

          <div className="flex items-center rounded-full border border-gray-800/60 bg-gray-900/50 p-1.75 px-4 text-gray-300 md:gap-2 md:p-2.5 md:px-6">
            <p className="flex items-center gap-2">
              Market Cap:
              <span className="">
                $
                {Number(
                  (coin.marketCap * solPrice).toFixed(2),
                ).toLocaleString()}
              </span>
            </p>
          </div>

          <div className="flex items-center rounded-full border border-gray-800/60 bg-gray-900/50 p-1.75 px-4 text-gray-300 md:gap-2 md:p-2.5 md:px-6">
            <p className="flex items-center gap-2">
              Created At:
              <span className="">
                {dayjs(coin.blockchainCreatedAt).format("M/D/YYYY, h:mm:ss A")}
              </span>
            </p>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
