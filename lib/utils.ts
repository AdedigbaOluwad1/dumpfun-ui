import {
  degenCores,
  degenSuffixes,
  degenPrefixes,
  degenSymbols,
} from "@/consts";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

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

export const formatPublicKey = (key: string | null) => {
  if (!key) return "";
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
};

export const copyToClipboard = (content: string, message?: string) => {
  navigator.clipboard.writeText(content);
  toast.success(message || "Content copied successfully! 📋");
};

export function generateDegenName() {
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
}
