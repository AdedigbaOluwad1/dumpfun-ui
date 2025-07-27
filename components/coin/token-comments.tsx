"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, BarChart3, ExternalLink } from "lucide-react"

export function TokenComments() {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-3">
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="comments" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Trades
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="comments" className="w-full">
          <TabsContent value="comments" className="space-y-4">
            {/* Comment Input */}
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-700 text-xs">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none min-h-[80px]"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Be respectful and constructive</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Post
                  </Button>
                </div>
              </div>
            </div>

            {/* Sample Comment */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-orange-600 text-xs">B</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-white text-sm">Boringgg</span>
                    <span className="text-xs text-gray-500">😴</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Get the conversation started by posting the first comment!
                  </p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View on Advanced.si
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Trade on MEXC
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Trade on OKX
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trades" className="space-y-4">
            <div className="text-center py-8">
              <p className="text-gray-400">No trades yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
