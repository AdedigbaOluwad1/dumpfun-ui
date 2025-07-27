"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, MessageCircle, Heart, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function TokenGrid() {
  const tokens = [
    {
      id: "1",
      name: "SafeMoon2.0",
      symbol: "SAFE2",
      price: "$0.0023",
      change: "+45.6%",
      positive: true,
      marketCap: "$890K",
      volume: "$156K",
      holders: "2.3K",
      description: "The next generation of SafeMoon with improved tokenomics",
      image: "/placeholder.svg?height=60&width=60&text=SAFE2",
      likes: 234,
      comments: 67,
      isNew: true,
    },
    {
      id: "2",
      name: "ElonDoge",
      symbol: "EDOG",
      price: "$0.0156",
      change: "+23.4%",
      positive: true,
      marketCap: "$1.2M",
      volume: "$89K",
      holders: "1.8K",
      description: "Elon's favorite dog coin for Mars missions",
      image: "/placeholder.svg?height=60&width=60&text=EDOG",
      likes: 189,
      comments: 43,
      isNew: false,
    },
    {
      id: "3",
      name: "DiamondHands",
      symbol: "DIAMOND",
      price: "$0.0078",
      change: "-12.3%",
      positive: false,
      marketCap: "$567K",
      volume: "$34K",
      holders: "956",
      description: "For true diamond hands only 💎🙌",
      image: "/placeholder.svg?height=60&width=60&text=DIAMOND",
      likes: 145,
      comments: 28,
      isNew: false,
    },
    {
      id: "4",
      name: "RocketShiba",
      symbol: "RSHIB",
      price: "$0.0034",
      change: "+67.8%",
      positive: true,
      marketCap: "$2.1M",
      volume: "$234K",
      holders: "3.4K",
      description: "Shiba Inu going to the moon 🚀",
      image: "/placeholder.svg?height=60&width=60&text=RSHIB",
      likes: 456,
      comments: 89,
      isNew: true,
    },
    {
      id: "5",
      name: "MemeLord",
      symbol: "MLORD",
      price: "$0.0091",
      change: "+34.5%",
      positive: true,
      marketCap: "$1.5M",
      volume: "$123K",
      holders: "2.1K",
      description: "The ultimate meme token for meme lords",
      image: "/placeholder.svg?height=60&width=60&text=MLORD",
      likes: 312,
      comments: 56,
      isNew: false,
    },
    {
      id: "6",
      name: "ToTheMoon",
      symbol: "MOON",
      price: "$0.0067",
      change: "+89.2%",
      positive: true,
      marketCap: "$3.2M",
      volume: "$456K",
      holders: "4.7K",
      description: "Destination: Moon 🌙",
      image: "/placeholder.svg?height=60&width=60&text=MOON",
      likes: 678,
      comments: 134,
      isNew: true,
    },
  ]

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">All Tokens</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
              New
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
              Trending
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
              Volume
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <Card
              key={token.id}
              className="bg-gray-800/50 border-gray-700 backdrop-blur hover:bg-gray-800/70 transition-all group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={"/tipzy.png"}
                      alt={token.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-white text-lg">{token.name}</CardTitle>
                        {token.isNew && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">NEW</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{token.symbol}</p>
                    </div>
                  </div>
                  <Link href={`/token/${token.id}`}>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{token.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-white">{token.price}</div>
                    <div className="flex items-center space-x-1">
                      {token.positive ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${token.positive ? "text-green-400" : "text-red-400"}`}>
                        {token.change}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-400">Market Cap</div>
                    <div className="text-white font-medium">{token.marketCap}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Volume 24h</div>
                    <div className="text-white">{token.volume}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Holders</div>
                    <div className="text-white">{token.holders}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-pink-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{token.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{token.comments}</span>
                    </button>
                  </div>

                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Trade
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Load More Tokens
          </Button>
        </div>
      </div>
    </section>
  )
}
