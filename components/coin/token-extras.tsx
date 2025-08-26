/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, BarChart3, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks";
import { iCoin } from "@/types/onchain-data";
import { useAuthStore } from "@/stores";
import { ChatEventEnum } from "@/consts";
import { iChatMessage, iChatParticipant, iRoom } from "@/types";
import { TokenComments,  TokenInfo, TokenTrades } from ".";

export function TokenExtras({ coin }: { coin: iCoin }) {
  const { userProfile } = useAuthStore();
  const { isConnected, joinRoom, watchRoom, leaveRoom, on, off } = useSocket();
  const [replies, setReplies] = useState<iRoom | null>(null);

  useEffect(() => {
    if (isConnected) {
      if (userProfile?.id) {
        joinRoom(coin.id).then((data) => {
          setReplies(data as iRoom);
        });
      } else {
        watchRoom(coin.id).then((data) => {
          setReplies(data as iRoom);
        });
      }

      on(ChatEventEnum.NEW_MESSAGE, (message: iChatMessage) => {
        setReplies((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            messages: [message, ...prev.messages],
          };
        });
      });

      on(ChatEventEnum.USER_JOINED, (message: iChatParticipant) => {
        setReplies((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            users: [message, ...prev.users],
          };
        });
      });

      on(ChatEventEnum.USER_LEFT, (message: iChatParticipant) => {
        setReplies((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            users: prev.users.filter((user) => user.userId !== message.userId),
          };
        });
      });
    }

    return () => {
      off(ChatEventEnum.NEW_MESSAGE);
      off(ChatEventEnum.USER_JOINED);
      off(ChatEventEnum.USER_LEFT);
      if (userProfile?.id) leaveRoom(coin.id);
    };
  }, [isConnected, userProfile, coin]);
  return (
    <Card className="gap-0 border-gray-800 bg-gray-900/50">
      <Tabs defaultValue="replies" className="w-full">
        <CardHeader className="pb-3">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="replies" className="flex items-center">
              <MessageCircle className="size-3.5! md:size-4!" />
              Replies
            </TabsTrigger>
            <TabsTrigger value="coin-info" className="flex items-center">
              <Info className="size-3.5! md:size-4!" />
              Coin Info
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center">
              <BarChart3 className="size-3.5! md:size-4!" />
              Trades
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="px-4">
          <TokenComments coin={coin} replies={replies} />
          <TokenInfo coin={coin} />
          <TokenTrades coin={coin} />
        </CardContent>
      </Tabs>
    </Card>
  );
}
