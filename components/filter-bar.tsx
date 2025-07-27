"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ChevronDown } from "lucide-react"

export function FilterBar() {
  const categories = [
    { name: "Doggo Mania", emoji: "🐕", active: true },
    { name: "Pump Vibes", emoji: "🔥", active: false },
    { name: "Finance Frenzy", emoji: "💰", active: false },
    { name: "Absurd Humor", emoji: "😂", active: false },
    { name: "Cat Craze", emoji: "🐱", active: false },
    { name: "Anime Aura", emoji: "✨", active: false },
    { name: "Frogverse", emoji: "🐸", active: false },
    { name: "Cosmic Journey", emoji: "🚀", active: false },
  ]

  return (
    <div className="mb-6 space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">sort:</span>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
              creation time
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">order:</span>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
              desc
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">show animations:</span>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">include nsfw:</span>
            <Switch />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.name}
            variant={category.active ? "default" : "secondary"}
            className={`px-3 py-1 cursor-pointer transition-colors ${
              category.active
                ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
            }`}
          >
            <span className="mr-1">{category.emoji}</span>
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
