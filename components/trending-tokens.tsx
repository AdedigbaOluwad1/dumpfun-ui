"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, FlameIcon as Fire } from "lucide-react"
import Image from "next/image"

export function TrendingTokens() {
  const trendingTokens = [
    {
      name: "DOGE2.0",
      symbol: "DOGE2",
      price: "$0.0045",
      change: "+156.7%",
      positive: true,
      marketCap: "$2.4M",
      image: "/placeholder.svg?height=40&width=40&text=DOGE2",
    },
    {
      name: "PepeCoin",
      symbol: "PEPE",
      price: "$0.0012",
      change: "+89.3%",
      positive: true,
      marketCap: "$1.8M",
      image: "/placeholder.svg?height=40&width=40&text=PEPE",
    },
    {
      name: "MoonShiba",
      symbol: "MSHIB",
      price: "$0.0089",
      change: "+67.2%",
      positive: true,
      marketCap: "$3.1M",
      image: "/placeholder.svg?height=40&width=40&text=MSHIB",
    },
  ]

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Fire className="h-8 w-8 text-orange-500 mr-3" />
            Trending Now
          </h2>
          <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            Hot 🔥
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trendingTokens.map((token, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 backdrop-blur hover:bg-gray-800/70 transition-all cursor-pointer group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={"/tipzy.png"}
                      alt={token.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-white text-lg">{token.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{token.symbol}</p>
                    </div>
                  </div>
                  {token.positive ? (
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-white">{token.price}</span>
                  <span className={`font-medium ${token.positive ? "text-green-400" : "text-red-400"}`}>
                    {token.change}
                  </span>
                </div>
                <div className="text-sm text-gray-400">Market Cap: {token.marketCap}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
