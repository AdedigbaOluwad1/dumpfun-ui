"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart3, Activity, EyeOff, Settings, Maximize2 } from "lucide-react"

export function TradingChart() {
  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"]
  const chartTools = [
    { icon: Activity, label: "Line" },
    { icon: BarChart3, label: "Candles" },
    { icon: TrendingUp, label: "Trend" },
    { icon: Settings, label: "Indicators" },
  ]

  return (
    <Card className="bg-gray-800/50 border-gray-700 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Tabs defaultValue="chart" className="w-auto">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="trades">Trade Display</TabsTrigger>
                <TabsTrigger value="bubbles" className="relative">
                  Hide All Bubbles
                  <EyeOff className="w-3 h-3 ml-1" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Price/MCap</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-400 bg-transparent">
                USD/SOL
              </Badge>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Chart Tools */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {chartTools.map((tool, index) => (
              <Button key={index} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <tool.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={timeframe === "1m" ? "default" : "ghost"}
                size="sm"
                className={timeframe === "1m" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white"}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Chart Area */}
        <div className="h-96 bg-gray-900/50 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Trading Chart</p>
            <p className="text-sm text-gray-500">KRYPT/SOL Market Cap (USD) • 1 • Pump</p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
              <span className="text-green-400">O: 5.3K</span>
              <span className="text-blue-400">H: 5.3K</span>
              <span className="text-red-400">L: 5.2K</span>
              <span className="text-yellow-400">C: 5.3K</span>
              <span className="text-purple-400">Vol: 15.68</span>
            </div>
          </div>
        </div>

        {/* Price Stats */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400">Vol 24h</div>
            <div className="text-white font-medium">$22</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Price</div>
            <div className="text-white font-medium">$0.00000528</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">5m</div>
            <div className="text-green-400 font-medium">+0.63%</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">1h</div>
            <div className="text-green-400 font-medium">+0.63%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
