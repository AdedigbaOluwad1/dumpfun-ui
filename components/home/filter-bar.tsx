"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search } from "lucide-react";
import { Switch } from "../common";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useAppStore } from "@/stores";

export function FilterBar() {
  const { isAnimationEnabled, toggleAnimation } = useAppStore();

  const categories = [
    { name: "All", emoji: "🙊", active: true },
    { name: "Doggo Mania", emoji: "🐕", active: false },
    { name: "Pump Vibes", emoji: "🔥", active: false },
    { name: "Finance Frenzy", emoji: "💰", active: false },
    { name: "Absurd Humor", emoji: "😂", active: false },
    { name: "Cat Craze", emoji: "🐱", active: false },
    { name: "Anime Aura", emoji: "✨", active: false },
    { name: "Frogverse", emoji: "🐸", active: false },
    { name: "Cosmic Journey", emoji: "🚀", active: false },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-y-3">
        <div className="flex flex-wrap items-center space-x-6 gap-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">sort:</span>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-800 bg-transparent text-gray-300"
            >
              creation time
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">order:</span>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-800 bg-transparent text-gray-300"
            >
              desc
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search..."
              className="h-8 w-60 rounded-lg border-gray-800 bg-gray-900/50 pl-10 text-xs text-white shadow-none! outline-0! placeholder:text-gray-400 focus:border-green-500/50! focus:ring-[0]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">show animations:</span>
            <Switch
              checked={isAnimationEnabled}
              onCheckedChange={toggleAnimation}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">include nsfw:</span>
            <Switch />
          </div>
        </div>
      </div>

      <ScrollArea className="overflow-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={category.active ? "default" : "secondary"}
              className={`cursor-pointer rounded-xl px-4 py-1.25 transition-colors ${
                category.active
                  ? "border-green-500/30 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  : "border-gray-800 bg-gray-900/50 text-sm text-gray-400 hover:bg-gray-900/70"
              }`}
            >
              <span className="mr-1">{category.emoji}</span>
              {category.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
