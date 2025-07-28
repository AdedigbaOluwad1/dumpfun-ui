"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, BarChart3, ExternalLink } from "lucide-react";

export function TokenComments() {
  return (
    <Card className="gap-0 border-gray-700 bg-gray-800/50">
      <Tabs defaultValue="comments" className="w-full">
        <CardHeader className="pb-3">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="comments" className="flex items-center">
              <MessageCircle className="h-4 w-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center">
              <BarChart3 className="h-4 w-4" />
              Trades
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="size-10 min-w-10">
                <AvatarFallback className="bg-gray-700 text-xs">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[80px] resize-none rounded-lg border-gray-600 bg-gray-700 text-base! text-white placeholder:text-gray-400"
                />
                <div className="mt-1 flex items-start justify-between">
                  <span className="text-sm text-gray-500">
                    Be respectful and constructive
                  </span>
                  <Button className="mt-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 text-white hover:bg-green-700 hover:from-green-600 hover:to-emerald-700">
                    Post
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-orange-600 text-sm">
                    B
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="text-base font-medium text-white">
                      Boringgg
                    </span>
                    <span className="text-xs text-gray-500">😴</span>
                  </div>
                  <p className="mb-2 text-base text-gray-300">
                    Get the conversation started by posting the first comment!
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-4 text-sm">
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
