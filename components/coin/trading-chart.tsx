/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  CandlestickSeries,
  createChart,
  TimeChartOptions,
  LineStyle,
  ColorType,
  Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const chartOptions = {
    layout: {
      textColor: "#99a1af",
      background: { type: ColorType.Solid, color: "transparent" },
      attributionLogo: false,
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

  function generateVolatileData() {
    const data = [];
    const startTime = new Date("2025-01-28T00:00:00Z").getTime();
    const interval = 5 * 60 * 1000;
    let lastClose = 100;

    for (let i = 0; i < 200; i++) {
      const time = Math.floor((startTime + i * interval) / 1000) as Time;

      // Simulate volatility by random swings
      const open = lastClose;

      // Generate a random close price first
      const volatility = 0.05; // 5% max change per candle
      const randomChange = (Math.random() - 0.5) * 2 * volatility;
      const close = open * (1 + randomChange);

      // Ensure high is at least the max of open and close, plus some upward movement
      const maxPrice = Math.max(open, close);
      const high = maxPrice * (1 + Math.random() * 0.02); // Up to 2% higher

      // Ensure low is at most the min of open and close, minus some downward movement
      const minPrice = Math.min(open, close);
      const low = minPrice * (1 - Math.random() * 0.02); // Up to 2% lower

      data.push({
        time,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
      });

      lastClose = close;
    }
    return data;
  }

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

    candlestickSeries.setData(generateVolatileData());

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef?.current?.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);
  return (
    <Card className="mb-6 border-gray-700 bg-gray-800/50 pb-0">
      <CardContent className="px-6 pr-2">
        <div
          className="mb-4 flex h-96 items-center justify-center rounded-lg bg-gray-900/50"
          ref={chartContainerRef}
        ></div>
      </CardContent>
    </Card>
  );
}
