/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EventBus, formatters } from "@/lib/utils";
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
  PriceFormatCustom,
} from "lightweight-charts";
import { useCallback, useEffect, useMemo, useRef } from "react";

export function TradingChart({ coin }: { coin: iCoin }) {
  const { solPrice: appSolPrice } = useAppStore();
  const { getChartData, getSolPrice } = useOnchainDataStore();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
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
  const solPriceRef = useRef(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isInitializedRef = useRef(false);

  // Memoize chart options to prevent recreation
  const chartOptions = useMemo<TimeChartOptions>(
    () =>
      ({
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
      }) as unknown as TimeChartOptions,
    [],
  );

  // Memoize candlestick series options
  const candlestickOptions = useMemo(
    () => ({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      priceFormat: {
        type: "custom",
        minMove: 0.01,
        formatter: (price: number) => formatters.formatCompactNumber(price),
      } as DeepPartial<PriceFormatCustom>,
    }),
    [],
  );

  const interval = 2;

  // Debounced resize handler using ResizeObserver
  const handleResize = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      const { clientWidth } = chartContainerRef.current;
      chartRef.current.applyOptions({ width: clientWidth });
    }
  }, []);

  // Optimized trade event handler with early returns
  const handleTradeEvent = useCallback(
    (event: CustomEvent<OnTradeEvent>) => {
      const {
        detail: { marketCap: MCapSOL, mint, blockchainCreatedAt },
      } = event;

      // Early return if not relevant to this coin
      if (mint !== coin.mint || !candlestickSeriesRef.current) return;

      const MCapUSD = MCapSOL * solPriceRef.current;
      const lastCandle = lastCandlestickRef.current;

      if (lastCandle) {
        const timeDiff = blockchainCreatedAt - lastCandle.time;

        if (timeDiff <= interval * 60) {
          // Update current interval - batch update object creation
          const updatedCandle = {
            ...lastCandle,
            close: MCapUSD,
            high: Math.max(MCapUSD, lastCandle.high),
            low: Math.min(MCapUSD, lastCandle.low),
          };

          candlestickSeriesRef.current.update(updatedCandle as CandlestickData);
          lastCandlestickRef.current = updatedCandle;
        } else {
          // Start new interval
          const newCandle: iChartData = {
            time: blockchainCreatedAt,
            close: MCapUSD,
            open: lastCandle.close,
            high: MCapUSD,
            low: MCapUSD,
          };

          candlestickSeriesRef.current.update(newCandle as CandlestickData);
          lastCandlestickRef.current = newCandle;
        }
      } else {
        // Initialize new chart
        const newCandle: iChartData = {
          time: blockchainCreatedAt,
          close: MCapUSD,
          open: MCapUSD,
          high: MCapUSD,
          low: MCapUSD,
        };

        candlestickSeriesRef.current.update(newCandle as CandlestickData);
        lastCandlestickRef.current = newCandle;
      }
    },
    [coin.mint, interval],
  );

  // Optimized chart data processing
  const processChartData = useCallback(
    (data: iChartData[], solPrice: number) => {
      const candleSticks: iChartData[] = new Array(data.length);
      let lastClose = data[0].close;

      for (let i = 0; i < data.length; i++) {
        const { close, high, low, time } = data[i];
        candleSticks[i] = {
          close: close * solPrice,
          high: high * solPrice,
          low: low * solPrice,
          open: lastClose * solPrice,
          time,
        };
        lastClose = close;
      }

      return candleSticks;
    },
    [],
  );

  // Initialize chart data
  const initializeChart = useCallback(() => {
    if (isInitializedRef.current) return;

    getSolPrice((status, _solPrice) => {
      if (!status || !_solPrice) return;

      solPriceRef.current = _solPrice;

      getChartData(coin.mint, interval, (status, data) => {
        if (status && data?.length) {
          const candleSticks = processChartData(data, solPriceRef.current);
          lastCandlestickRef.current = candleSticks[candleSticks.length - 1];
          candlestickSeriesRef.current?.setData(
            candleSticks as CandlestickData[],
          );
        } else {
          // Handle empty data case
          const MCapUSD = coin.marketCap * solPriceRef.current;
          const newCandle: iChartData = {
            time: new Date(coin.blockchainCreatedAt).getTime() / 1000,
            close: MCapUSD,
            open: 0,
            high: MCapUSD,
            low: MCapUSD,
          };

          candlestickSeriesRef.current?.update(newCandle as CandlestickData);
          lastCandlestickRef.current = newCandle;
        }

        isInitializedRef.current = true;
      });
    });
  }, [
    coin.mint,
    coin.marketCap,
    coin.blockchainCreatedAt,
    interval,
    getChartData,
    getSolPrice,
    processChartData,
  ]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart only once
    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    // Create candlestick series
    const candlestickSeries = chart.addSeries(
      CandlestickSeries,
      candlestickOptions,
    );
    candlestickSeriesRef.current = candlestickSeries;

    // Initialize data
    initializeChart();

    // Setup ResizeObserver for better performance than window resize
    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(() => {
        // Debounce resize calls
        requestAnimationFrame(handleResize);
      });
      resizeObserverRef.current.observe(chartContainerRef.current);
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize);
    }

    // Add event listener
    EventBus.on("onTradeEvent", handleTradeEvent);

    return () => {
      // Cleanup
      EventBus.off("onTradeEvent", handleTradeEvent);

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }

      candlestickSeriesRef.current = null;
      lastCandlestickRef.current = null;
      isInitializedRef.current = false;
    };
  }, []);

  // Handle coin changes
  useEffect(() => {
    if (isInitializedRef.current && candlestickSeriesRef.current) {
      // Reset chart data when coin changes
      lastCandlestickRef.current = null;
      isInitializedRef.current = false;
      initializeChart();
    }
  }, [coin.mint, initializeChart]);

  useEffect(() => {
    if (!!appSolPrice) {
      solPriceRef.current = appSolPrice;
    }
  }, [appSolPrice]);

  return (
    <Card className="mb-6 border-gray-800 bg-gray-900/50 pb-0 max-md:pt-3">
      <CardContent className="pr-3 pl-3 max-md:pb-3 md:px-6! md:pr-2!">
        <div
          className="mb-0 flex h-120 items-center justify-center rounded-lg bg-gray-900/50"
          ref={chartContainerRef}
        />
      </CardContent>
    </Card>
  );
}
