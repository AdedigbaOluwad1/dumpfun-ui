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
  const patterns = [
    () =>
      `${getRandomItem(degenPrefixes)}${getRandomItem(degenCores)}${getRandomItem(degenSuffixes)}${getRandomItem(degenSymbols)}`,
    () => `${getRandomItem(degenCores)}${getRandomItem(degenSuffixes)}${getRandomItem(degenSymbols)}`,
    () => `${getRandomItem(degenPrefixes)}${getRandomItem(degenCores)}${getRandomItem(degenSymbols)}`,
    () =>
      `${getRandomItem(degenSymbols)}${getRandomItem(degenPrefixes)}${getRandomItem(degenCores)}`,
    () =>
      `${getRandomItem(degenCores)}_${getRandomItem(degenSuffixes)}${getRandomItem(degenSymbols)}`,

    () => `x${getRandomItem(degenCores)}${getRandomItem(degenSuffixes)}${getRandomItem(degenSymbols)}`,
    () =>
      `${getRandomItem(degenPrefixes)}${getRandomItem(degenCores)}${Math.floor(Math.random() * 10000)}${getRandomItem(degenSymbols)}`,
  ];

  function getRandomItem(array: (() => string)[] | string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const pattern = getRandomItem(patterns);
  return typeof pattern === "function" ? pattern() : pattern;
}
