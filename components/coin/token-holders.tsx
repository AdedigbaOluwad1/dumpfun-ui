import React from "react";
import { TabsContent } from "../ui/tabs";
import { iCoin } from "@/types/onchain-data";

export function TokenHolders({ coin }: { coin: iCoin }) {
  return (
    <TabsContent value="top-holders" className="space-y-4">
      <div className="py-8 text-center">
        <p className="text-gray-400">No token holders yet</p>
      </div>
    </TabsContent>
  );
}
