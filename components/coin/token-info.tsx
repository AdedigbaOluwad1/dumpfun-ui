import { iCoin } from "@/types/onchain-data";
import React from "react";
import { TabsContent } from "../ui/tabs";

export function TokenInfo({ coin: initCoinInfo }: { coin: iCoin }) {
  return (
    <TabsContent value="coin-info" className="space-y-4">
      <div className="flex items-start space-x-3"></div>
    </TabsContent>
  );
}
