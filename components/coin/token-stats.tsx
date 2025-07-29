"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TokenStats() {
  const holders = [
    { rank: 1, address: "bonding curve", percentage: "99.58%" },
    { rank: 2, address: "2E8a03", percentage: "0.34%" },
    { rank: 3, address: "634ZpA", percentage: "0.05%", isCreator: true },
    { rank: 4, address: "6Wh4uK", percentage: "0.02%" },
    { rank: 5, address: "BMuBoE", percentage: "0.00%" },
    { rank: 6, address: "EJr4su", percentage: "0.00%" },
    { rank: 7, address: "7xkTx5", percentage: "0.00%" },
    { rank: 8, address: "6Gxwg2", percentage: "0.00%" },
    { rank: 9, address: "7wcGYm", percentage: "0.00%" },
  ];

  return (
    <Card className="mb-6 gap-0 border-gray-800 bg-gray-900/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Top holders</CardTitle>
          <button className="text-xs text-gray-400 hover:text-white">
            Generate bubble map
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {holders.map((holder) => (
          <div
            key={holder.rank}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center space-x-2">
              <span className="w-4 text-xs text-gray-500">{holder.rank}.</span>
              <span className="font-mono text-sm text-gray-300">
                {holder.address}
                {holder.isCreator && (
                  <Badge className="ml-2 border-blue-500/30 bg-blue-500/20 text-xs text-blue-400">
                    dev
                  </Badge>
                )}
              </span>
            </div>
            <span className="text-sm font-medium text-white">
              {holder.percentage}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
