/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EventBus } from "@/lib/utils";
import { useAppStore, useOnchainDataStore } from "@/stores";
import { iChartData } from "@/types";
import { OnTradeEvent } from "@/types/events";
import { iCoin } from "@/types/onchain-data";
import {
  CandlestickSeries,
  createChart,
  TimeChartOptions,
  LineStyle,
  ColorType,
  Time,
  CandlestickData,
  ISeriesApi,
  WhitespaceData,
  CandlestickSeriesOptions,
  DeepPartial,
  CandlestickStyleOptions,
  SeriesOptionsCommon,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export function TradingChart({ coin }: { coin: iCoin }) {
  const { getChartData } = useOnchainDataStore();
  const { solPrice } = useAppStore();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const lastCandlestickRef = useRef<iChartData | null>(null);
  const candlestickSeriesRef =
    useRef<
      ISeriesApi<
        "Candlestick",
        Time,
        CandlestickData<Time> | WhitespaceData<Time>,
        CandlestickSeriesOptions,
        DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>
      >
    >(null);

  const chartOptions = {
    layout: {
      textColor: "#99a1af",
      background: { type: ColorType.Solid, color: "rgba(0,0,0,0.0)" },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
      barSpacing: 8,
      rightOffset: 12,
      fixedRangeEnabled: false,
      tickMarkFormatter: (time: Time): string => {
        const date = new Date((time as number) * 1000);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
    },
    grid: {
      vertLines: {
        color: "rgba(255, 255, 255, 0.05)",
        style: LineStyle.Dotted,
        visible: true,
      },
      horzLines: {
        color: "rgba(255, 255, 255, 0.05)",
        style: LineStyle.Dotted,
        visible: true,
      },
    },
  };

  // function generateVolatileData() {
  //   const data = [];
  //   const startTime = new Date("2025-01-28T00:00:00Z").getTime();
  //   const interval = 5 * 60 * 1000;
  //   let lastClose = 100;

  //   for (let i = 0; i < 200; i++) {
  //     const time = Math.floor((startTime + i * interval) / 1000) as Time;

  //     // Simulate volatility by random swings
  //     const open = lastClose;

  //     // Generate a random close price first
  //     const volatility = 0.05; // 5% max change per candle
  //     const randomChange = (Math.random() - 0.5) * 2 * volatility;
  //     const close = open * (1 + randomChange);

  //     // Ensure high is at least the max of open and close, plus some upward movement
  //     const maxPrice = Math.max(open, close);
  //     const high = maxPrice * (1 + Math.random() * 0.02); // Up to 2% higher

  //     // Ensure low is at most the min of open and close, minus some downward movement
  //     const minPrice = Math.min(open, close);
  //     const low = minPrice * (1 - Math.random() * 0.02); // Up to 2% lower

  //     data.push({
  //       time,
  //       open: Number(open.toFixed(2)),
  //       high: Number(high.toFixed(2)),
  //       low: Number(low.toFixed(2)),
  //       close: Number(close.toFixed(2)),
  //     });

  //     lastClose = close;
  //   }
  //   return data;
  // }

  const handleTradeEvent = (event: CustomEvent<OnTradeEvent>) => {
    const {
      detail: { marketCap: MCapSOL, mint, blockchainCreatedAt },
    } = event;

    if (mint !== coin.mint) return;
    if (lastCandlestickRef.current) {
      if (
        blockchainCreatedAt - lastCandlestickRef.current.time <
        5 * 60 * 1000
      ) {
        // if current interval ain't complete
        const MCapUSD = MCapSOL * solPrice;
        candlestickSeriesRef.current?.update({
          ...lastCandlestickRef.current,
          close: MCapUSD,
          high:
            MCapUSD > lastCandlestickRef.current.high
              ? MCapUSD
              : lastCandlestickRef.current.high,
          low:
            MCapUSD < lastCandlestickRef.current.low
              ? MCapUSD
              : lastCandlestickRef.current.low,
        } as CandlestickData);
      } else {
        // current interal is complete, start new interval
        const MCapUSD = MCapSOL * solPrice;
        const newCandleStickData: iChartData = {
          time: blockchainCreatedAt,
          close: MCapUSD,
          open: lastCandlestickRef.current.close,
          high: MCapUSD,
          low: MCapUSD,
        };

        candlestickSeriesRef.current?.update(
          newCandleStickData as CandlestickData,
        );
        lastCandlestickRef.current = newCandleStickData;
      }
    } else {
      //handle new chart
      const MCapUSD = MCapSOL * solPrice;
      const newCandleStickData: iChartData = {
        time: blockchainCreatedAt,
        close: MCapUSD,
        open: MCapUSD,
        high: MCapUSD,
        low: MCapUSD,
      };

      candlestickSeriesRef.current?.update(
        newCandleStickData as CandlestickData,
      );
      lastCandlestickRef.current = newCandleStickData;
    }
  };

  useEffect(() => {
    const chart = createChart(
      chartContainerRef?.current || "",
      chartOptions as unknown as TimeChartOptions,
    );

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeriesRef.current = candlestickSeries;

    getChartData(coin.mint, (status, data) => {
      if (status && data) {
        const candleSticks: iChartData[] = [];
        let lastClose = data[0].close;

        for (const { close, high, low, time } of data) {
          candleSticks.push({
            close: close * solPrice,
            high: high * solPrice,
            low: low * solPrice,
            open: lastClose * solPrice,
            time,
          });

          lastClose = close;
        }
        lastCandlestickRef.current = candleSticks[candleSticks.length - 1];
        candlestickSeries.setData(candleSticks as CandlestickData[]);
      }
    });

    EventBus.on("onTradeEvent", handleTradeEvent);
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef?.current?.clientWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      EventBus.off("onTradeEvent", handleTradeEvent);
      chart.remove();
    };
  }, [solPrice]);
  return (
    <Card className="mb-6 border-gray-800 bg-gray-900/50 pb-0 max-md:pt-3">
      <CardContent className="pr-3 pl-3 max-md:pb-3 md:px-6! md:pr-2!">
        <div
          className="mb-0 flex h-120 items-center justify-center rounded-lg bg-gray-900/50"
          ref={chartContainerRef}
        ></div>
      </CardContent>
    </Card>
  );
}
