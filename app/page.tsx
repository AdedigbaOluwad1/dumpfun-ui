"use client";
import { FilterBar, TokenFeed, TrendingTokens } from "@/components/home";

export default function Home() {
  return (
    <div className="w-full p-5 px-4 md:p-6 md:px-6">
      <TrendingTokens />
      <FilterBar />
      <TokenFeed />
    </div>
  );
}
