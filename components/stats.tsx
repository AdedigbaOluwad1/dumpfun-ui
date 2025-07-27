"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"

export function Stats() {
  const stats = [
    {
      icon: DollarSign,
      label: "24h Volume",
      value: "$2.4M",
      change: "+12.5%",
      positive: true,
    },
    {
      icon: Users,
      label: "Active Traders",
      value: "15.2K",
      change: "+8.3%",
      positive: true,
    },
    {
      icon: Zap,
      label: "Tokens Created",
      value: "1,247",
      change: "+23.1%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Market Cap",
      value: "$45.8M",
      change: "+5.7%",
      positive: true,
    },
  ]

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-purple-400" />
                  <span className={`text-sm font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
