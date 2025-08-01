import {
  degenCores,
  degenSuffixes,
  degenPrefixes,
  degenSymbols,
} from "@/consts";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return "$" + (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return "$" + (num / 1000).toFixed(0) + "K";
  }
  return "$" + num.toLocaleString();
};

export const formatPrice = (price: number) => {
  return "$" + price.toFixed(6);
};

export const isUserAgentMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const formatPublicKey = (key: PublicKey | string | null) => {
  if (!key) return "";

  const address = typeof key === "string" ? key : key.toString();
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const copyToClipboard = (content: string, message?: string) => {
  navigator.clipboard.writeText(content);
  toast.success(message || "Content copied successfully! 📋");
};

export const generateDegenName = () => {
  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function maybe<T>(value: T, chance = 0.5): T | "" {
    return Math.random() < chance ? value : "";
  }

  const patterns = [
    // Classic format
    () =>
      `${pick(degenPrefixes)}${pick(degenCores)}${pick(degenSuffixes)}${pick(degenSymbols)}`,

    // Prefix-Core-Symbol only
    () => `${pick(degenPrefixes)}${pick(degenCores)}${pick(degenSymbols)}`,

    // Symbol + Core + Suffix
    () => `${pick(degenSymbols)}${pick(degenCores)}${pick(degenSuffixes)}`,

    // Core + underscore + Suffix + optional symbol
    () =>
      `${pick(degenCores)}_${pick(degenSuffixes)}${maybe(pick(degenSymbols), 0.7)}`,

    // xCoreSuffix[Symbol]
    () =>
      `x${pick(degenCores)}${pick(degenSuffixes)}${maybe(pick(degenSymbols), 0.8)}`,

    // Prefixed name with numeric flair
    () =>
      `${pick(degenPrefixes)}${pick(degenCores)}${Math.floor(Math.random() * 9999)}${pick(degenSymbols)}`,

    // Hyphenated chaos
    () =>
      `${pick(degenSymbols)}-${pick(degenPrefixes)}-${pick(degenCores)}-${pick(degenSuffixes)}`,

    // Full emoji name
    () =>
      `${pick(degenSymbols)}${pick(degenSymbols)}${pick(degenSymbols)}${maybe(pick(degenSymbols), 0.3)}`,

    // Screaming all-caps version
    () =>
      `${pick(degenPrefixes).toUpperCase()}${pick(degenCores).toUpperCase()}${pick(degenSuffixes)}${maybe(pick(degenSymbols))}`,
  ];

  const pattern = pick(patterns);
  return pattern();
};

export const generateWalletAlias = () => {
  const adjectives = [
    "shadow",
    "meta",
    "crypto",
    "chain",
    "block",
    "stealth",
    "rugged",
    "pump",
    "dump",
    "moon",
    "gas",
    "dust",
    "hidden",
    "dark",
    "anon",
    "cold",
    "hot",
  ];

  const nouns = [
    "ape",
    "whale",
    "frog",
    "ninja",
    "degen",
    "sniper",
    "miner",
    "pirate",
    "lord",
    "hunter",
    "shiller",
    "hodler",
    "trader",
    "wizard",
    "farmer",
  ];

  const numbers = () => Math.floor(Math.random() * 9999);

  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return `${pick(adjectives)}-${pick(nouns)}-${numbers()}`;
};

export function truncateText(text: string, length: number, suffix?: string) {
  return text.length > length
    ? `${text.slice(0, length).trim()}${suffix || ".."}`
    : text;
}

const dumpfunApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
  },
});

dumpfunApi.interceptors.request.use((config) => {
  return config;
});

dumpfunApi.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);

export default dumpfunApi;

const LAMPORTS_PER_SOL = 1_000_000_000; // 1e9
const DEFAULT_TOKEN_DECIMALS = 6; // Most tokens use 6 decimals

export const formatters = {
  lamportsToSol: (lamports: BN | number | string): number => {
    const value =
      typeof lamports === "string"
        ? new BN(lamports)
        : typeof lamports === "number"
          ? new BN(lamports)
          : lamports;
    const sol = value.toNumber() / LAMPORTS_PER_SOL;
    return parseFloat(sol.toFixed(3));
  },

  formatTokenAmount: (
    amount: BN | number | string,
    decimals: number = DEFAULT_TOKEN_DECIMALS,
  ): number => {
    const value =
      typeof amount === "string"
        ? new BN(amount)
        : typeof amount === "number"
          ? new BN(amount)
          : amount;
    const divisor = Math.pow(10, decimals);
    const formatted = value.toNumber() / divisor;
    return parseFloat(formatted.toFixed(3));
  },

  formatTimestamp: (timestamp: BN | number | string): string => {
    const value =
      typeof timestamp === "string"
        ? parseInt(timestamp)
        : typeof timestamp === "number"
          ? timestamp
          : timestamp.toNumber();

    const date = new Date(value > 1e12 ? value : value * 1000);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  },

  formatPercentage: (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  },

  formatCompactNumber: (value: number): string => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;

    return value.toFixed(2);
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (timeSinceLastExec >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - timeSinceLastExec);
    }
  };
}
