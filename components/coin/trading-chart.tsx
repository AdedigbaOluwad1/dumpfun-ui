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
import { useCallback, useEffect, useRef } from "react";

// Constants moved outside component to prevent recreation
const CHART_INTERVAL = 2;
const CHART_HEIGHT = 480;

// Chart configuration objects as constants
const CHART_OPTIONS: TimeChartOptions = {
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
} as unknown as TimeChartOptions;

const CANDLESTICK_OPTIONS = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
} as const;

type ChartSeries = ISeriesApi<
  "Candlestick",
  Time,
  CandlestickData<Time> | WhitespaceData<Time>,
  CandlestickSeriesOptions,
  DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>
>;

interface TradingChartProps {
  coin: iCoin;
}

export function TradingChart({ coin }: TradingChartProps) {
  const { solPrice: appSolPrice } = useAppStore();
  const { getChartData, getSolPrice } = useOnchainDataStore();

  // Refs for chart management
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const candlestickSeriesRef = useRef<ChartSeries | null>(null);
  const lastCandlestickRef = useRef<iChartData | null>(null);
  const solPriceRef = useRef<number>(appSolPrice || 0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  const currentMintRef = useRef<string>(coin.mint);

  // Performance optimization: debounced resize
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize expensive calculations
  const coinMint = coin.mint;
  const coinMarketCap = coin.marketCap;
  const coinBlockchainCreatedAt = coin.blockchainCreatedAt;

  // Optimized resize handler with debouncing
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (chartRef.current && chartContainerRef.current) {
        const { clientWidth } = chartContainerRef.current;
        chartRef.current.applyOptions({ width: clientWidth });
      }
    }, 16); // ~60fps
  }, []);

  // Process chart data with better memory efficiency
  const processChartData = useCallback(
    (data: iChartData[], solPrice: number): iChartData[] => {
      if (!data.length) return [];

      const result: iChartData[] = [];
      let lastClose = data[0].close;

      // Use for...of for better performance with large arrays
      for (const item of data) {
        result.push({
          close: item.close * solPrice,
          high: item.high * solPrice,
          low: item.low * solPrice,
          open: lastClose * solPrice,
          time: item.time,
        });
        lastClose = item.close;
      }

      return result;
    },
    [],
  );

  // Optimized trade event handler
  const handleTradeEvent = useCallback((event: CustomEvent<OnTradeEvent>) => {
    const {
      detail: { marketCap: MCapSOL, mint, blockchainCreatedAt },
    } = event;

    // Early returns for performance
    if (mint !== currentMintRef.current || !candlestickSeriesRef.current)
      return;

    const MCapUSD = MCapSOL * solPriceRef.current;
    const lastCandle = lastCandlestickRef.current;

    if (!lastCandle) {
      // Initialize first candle
      const newCandle: iChartData = {
        time: blockchainCreatedAt,
        close: MCapUSD,
        open: MCapUSD,
        high: MCapUSD,
        low: MCapUSD,
      };

      candlestickSeriesRef.current.update(newCandle as CandlestickData);
      lastCandlestickRef.current = newCandle;
      return;
    }

    const timeDiff = blockchainCreatedAt - lastCandle.time;
    const intervalSeconds = CHART_INTERVAL * 60;

    if (timeDiff <= intervalSeconds) {
      // Update current interval - minimize object creation
      lastCandle.close = MCapUSD;
      lastCandle.high = Math.max(MCapUSD, lastCandle.high);
      lastCandle.low = Math.min(MCapUSD, lastCandle.low);

      candlestickSeriesRef.current.update(lastCandle as CandlestickData);
    } else {
      // Create new interval
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
  }, []);

  // Initialize chart data with error handling
  const initializeChart = useCallback(() => {
    if (isInitializedRef.current) return;

    getSolPrice((status, _solPrice) => {
      if (!status || !_solPrice) {
        console.warn("Failed to get SOL price");
        return;
      }

      solPriceRef.current = _solPrice;

      getChartData(coinMint, CHART_INTERVAL, (status, data) => {
        if (!candlestickSeriesRef.current) return;

        if (status && data?.length) {
          const candleSticks = processChartData(data, solPriceRef.current);
          if (candleSticks.length > 0) {
            lastCandlestickRef.current = candleSticks[candleSticks.length - 1];
            candlestickSeriesRef.current.setData(
              candleSticks as CandlestickData[],
            );
          }
        } else {
          // Handle empty data case
          const MCapUSD = coinMarketCap * solPriceRef.current;
          const newCandle: iChartData = {
            time: Math.floor(
              new Date(coinBlockchainCreatedAt).getTime() / 1000,
            ),
            close: MCapUSD,
            open: 0,
            high: MCapUSD,
            low: MCapUSD,
          };

          candlestickSeriesRef.current.update(newCandle as CandlestickData);
          lastCandlestickRef.current = newCandle;
        }

        isInitializedRef.current = true;
      });
    });
  }, [
    coinMint,
    coinMarketCap,
    coinBlockchainCreatedAt,
    getChartData,
    getSolPrice,
    processChartData,
  ]);

  // Chart initialization effect
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // Create chart with explicit dimensions
    const chart = createChart(container, {
      ...CHART_OPTIONS,
      width: container.clientWidth,
      height: CHART_HEIGHT,
    });

    chartRef.current = chart;

    // Create candlestick series
    const candlestickSeries = chart.addSeries(
      CandlestickSeries,
      CANDLESTICK_OPTIONS,
    );
    candlestickSeriesRef.current = candlestickSeries;

    // Initialize data
    initializeChart();

    // Setup efficient resize observation
    if ("ResizeObserver" in window) {
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(container);
    } else {
      // Fallback for older browsers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).addEventListener("resize", handleResize);
    }

    // Add event listener
    EventBus.on("onTradeEvent", handleTradeEvent);

    return () => {
      // Cleanup
      EventBus.off("onTradeEvent", handleTradeEvent);

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }

      if (chartRef.current) {
        chartRef.current.remove();
      }

      // Reset refs
      chartRef.current = null;
      candlestickSeriesRef.current = null;
      lastCandlestickRef.current = null;
      isInitializedRef.current = false;
    };
  }, []); // Empty dependency array - only run once

  // Handle coin changes efficiently
  useEffect(() => {
    const mintChanged = currentMintRef.current !== coinMint;
    currentMintRef.current = coinMint;

    if (mintChanged && isInitializedRef.current) {
      // Reset and reinitialize for new coin
      lastCandlestickRef.current = null;
      isInitializedRef.current = false;
      initializeChart();
    }
  }, [coinMint, initializeChart]);

  // Update SOL price reference
  useEffect(() => {
    if (appSolPrice > 0) {
      solPriceRef.current = appSolPrice;
    }
  }, [appSolPrice]);

  return (
    <Card className="mb-6 border-gray-800 bg-gray-900/50 pb-0 max-md:pt-3">
      <CardContent className="pr-3 pl-3 max-md:pb-3 md:px-6 md:pr-2">
        <div
          ref={chartContainerRef}
          className="mb-0 flex items-center justify-center rounded-lg bg-gray-900/50"
          style={{ height: CHART_HEIGHT }}
          role="img"
          aria-label={`Trading chart for ${coinMint}`}
        />
      </CardContent>
    </Card>
  );
}
