"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, BarChart3, ExternalLink } from "lucide-react";

export function TokenComments() {
  return (
    <Card className="gap-0 border-gray-800 bg-gray-900/50">
      <Tabs defaultValue="comments" className="w-full">
        <CardHeader className="pb-3">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="comments" className="flex items-center">
              <MessageCircle className="size-3.5! md:size-4!" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center">
              <BarChart3 className="size-3.5! md:size-4!" />
              Trades
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="px-5">
          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="hidden size-8! min-w-8! md:flex md:size-10 md:min-w-10">
                <AvatarFallback className="bg-gray-700 text-xs">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[80px] resize-none rounded-lg border-gray-600/50 bg-transparent! text-sm! text-white placeholder:text-gray-400 focus:border-green-500/50! focus:ring-[0] md:text-base!"
                />
                <div className="mt-2 flex items-start justify-between md:mt-1">
                  <span className="text-sm text-gray-500">
                    Be respectful and constructive
                  </span>
                  <Button className="mt-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 text-xs! text-white hover:bg-green-700 hover:from-green-600 hover:to-emerald-700 max-md:h-8 md:text-sm!">
                    Post
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-start space-x-3">
                <Avatar className="size-7! min-w-7! md:size-8! md:min-w-8!">
                  <AvatarFallback className="bg-orange-600 text-xs md:text-sm">
                    B
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="text-xs font-medium text-white md:text-base">
                      Boringgg
                    </span>
                    <span className="text-xs text-gray-500">😴</span>
                  </div>
                  <p className="mb-2 text-sm text-gray-300 md:text-base">
                    Get the conversation started by posting the first comment!
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-4 text-xs md:text-sm">
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  View on Advanced.si
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Trade on MEXC
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Trade on OKX
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trades" className="space-y-4">
            <div className="py-8 text-center">
              <p className="text-gray-400">No trades yet</p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
