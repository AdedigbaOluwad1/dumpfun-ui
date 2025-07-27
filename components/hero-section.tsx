"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Trade Memecoins
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Like a Pro
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover, create, and trade the hottest memecoins. Join the community-driven revolution of decentralized
            finance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8"
            >
              <Zap className="h-5 w-5 mr-2" />
              Start Trading
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 bg-transparent"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              View Trending
            </Button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
    </section>
  )
}
