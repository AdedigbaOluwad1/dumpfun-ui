/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  FlameIcon as Fire,
  ChevronLeft,
  ChevronRight,
  Snowflake,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { iRunner } from "@/types/onchain-data";
import { useAppStore, useOnchainDataStore } from "@/stores";
import { EventBus, formatters } from "@/lib/utils";
import { OnTradeEvent } from "@/types/events";

export function TrendingTokens({ data: initData }: { data: iRunner[] }) {
  const { getRunners } = useOnchainDataStore();
  const { solPrice } = useAppStore();
  const [data, setData] = useState<iRunner[]>(initData);
  const swiperRef = useRef<any | null>(null);

  useEffect(() => {
    const handleTradeEvent = ({
      detail: { currentPrice, marketCap, mint },
    }: CustomEvent<OnTradeEvent>) => {
      setData((prev) => {
        // Check if token exists in current state (avoid stale closure)
        const tokenExists = prev.find((token) => token.mint === mint);
        if (!tokenExists) return prev;

        return prev.map((token) =>
          token.mint === mint
            ? {
                ...token,
                currentPrice,
                marketCap,
              }
            : token,
        );
      });
    };

    EventBus.on("onTradeEvent", handleTradeEvent);

    const intervalId = setInterval(() => {
      getRunners((status, data) => {
        if (status && data !== undefined) setData(data);
      });
    }, 30 * 1000);

    return () => {
      clearInterval(intervalId);
      EventBus.off("onTradeEvent", handleTradeEvent);
    };
  }, [getRunners]);
  return (
    <section className="pb-12">
      <div className="mx-auto w-full">
        <div className="mb-4 flex items-center justify-between md:mb-8">
          <h2 className="flex items-center text-xl font-bold text-white md:text-2xl lg:text-2xl">
            <Fire className="mr-2 size-6 text-orange-500 md:mr-2 md:size-7" />
            Trending Now
          </h2>

          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => swiperRef.current?.slidePrev()}
              className="border-gray-600 bg-transparent text-gray-400 hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => swiperRef.current?.slideNext()}
              className="border-gray-600 bg-transparent text-gray-400 hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={"auto"}
          modules={[Navigation, Autoplay]}
          freeMode={true}
          slidesPerGroup={1}
          allowTouchMove={true}
          simulateTouch={true}
          touchRatio={1}
          threshold={5}
          speed={500}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
          className="swiper-wrapper flex gap-4 md:gap-6"
        >
          {data.map((token, index) => (
            <SwiperSlide key={index} className="mr-4! !w-auto md:mr-6!">
              <Card className="swiper-slide group min-w-[80vw] cursor-pointer gap-0 rounded-xl border-gray-800 bg-gray-900/50 backdrop-blur transition-all hover:bg-gray-900/70 max-md:py-4 sm:min-w-[320px] md:rounded-2xl xl:min-w-[340px]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative size-fit">
                        <Image
                          src={token.avatar}
                          alt={token.name}
                          width={40}
                          height={40}
                          className="aspect-square rounded-full object-cover object-center"
                        />
                        <Image
                          src={
                            "https://img-v1.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                          }
                          alt="SOL"
                          width={40}
                          height={40}
                          className="absolute -right-1 -bottom-1 size-5 rounded-full border border-gray-700 md:size-6"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-sm text-white md:text-lg">
                          {token.name}
                        </CardTitle>
                        <p className="flex items-center gap-1 text-xs text-gray-400 md:text-sm">
                          {token.symbol}
                        </p>
                      </div>
                    </div>
                    {Number(token.priceChange24hPercent) > 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : Number(token.priceChange24hPercent) < 0 ? (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    ) : (
                      <Snowflake className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-white md:text-2xl">
                      ${(token.currentPrice * solPrice).toFixed(8)}
                    </span>
                    <span
                      className={`text-sm font-medium md:text-base ${
                        Number(token.priceChange24hPercent) > 0
                          ? "text-green-400"
                          : Number(token.priceChange24hPercent) < 0
                            ? "text-red-400"
                            : "text-blue-400"
                      }`}
                    >
                      {Number(token.priceChange24hPercent) > 0
                        ? "+"
                        : Number(token.priceChange24hPercent) === 0
                          ? ""
                          : "-"}
                      {Math.abs(Number(token.priceChange24hPercent))}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 md:text-sm">
                    Market Cap: $
                    {formatters.formatCompactNumber(token.marketCap * solPrice)}
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
