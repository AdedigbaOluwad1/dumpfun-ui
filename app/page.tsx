"use client";
import { OnboardingModal } from "@/components/common";
import { FilterBar, TokenFeed, TrendingTokens } from "@/components/home";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="w-full p-5 px-4 md:p-6 md:px-6">
      <TrendingTokens />
      <FilterBar />
      <TokenFeed />

      <OnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
