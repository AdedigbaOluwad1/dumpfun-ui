"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Copy } from "lucide-react";
import Image from "next/image";

export function TokenInfo() {
  return (
    <Card className="mb-6 rounded-2xl border-gray-700 bg-gray-800/50 pt-2 pb-0">
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <div className="relative mb-4 inline-block">
            <Image
              src="/tipzy.png"
              alt="KRYPTONIT"
              width={100}
              height={100}
              className="mx-auto rounded-2xl"
            />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-white">KRYPTONIT</h1>
          <p className="mb-2 text-gray-400">KRYPT</p>

          <div className="mb-4 flex items-center justify-center space-x-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="bg-gray-700 text-xs">8</AvatarFallback>
            </Avatar>
            <span className="text-sm text-green-400">86vECv</span>
            <span className="text-xs text-gray-500">40s ago</span>
            <Badge className="border-orange-500/30 bg-orange-500/20 text-xs text-orange-400">
              1.0% bonded
            </Badge>
          </div>

          <p className="text-sm text-gray-300">© BruG_dump</p>
        </div>

        {/* Market Cap */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-400">Market Cap</span>
            <span className="text-sm font-medium text-orange-400">
              ATH $5.3K
            </span>
          </div>
          <div className="mb-2 text-3xl font-bold text-white">$5.3K</div>
          <div className="text-sm text-green-400">+$33 (+0.63%) 24hr</div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>Bonding Curve Progress</span>
              <span>1.0%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-700">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: "1%" }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-400">
              0.117 SOL in bonding curve • $77,534 to graduate
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Contract</span>
              <code className="font-mono text-xs break-all text-gray-300">
                BruG_dump...xyz123
              </code>
            </div>
            <Button variant="ghost" size="sm" className="p-1">
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
