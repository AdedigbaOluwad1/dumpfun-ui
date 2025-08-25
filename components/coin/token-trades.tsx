import React from "react";
import { TabsContent } from "../ui/tabs";
import { iCoin } from "@/types/onchain-data";

export function TokenTrades({ coin }: { coin: iCoin }) {
  return (
    <TabsContent value="trades" className="space-y-4">
      <div className="py-8 text-center">
        <p className="text-gray-400">No trades yet</p>
      </div>
    </TabsContent>
  );
}
