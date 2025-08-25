/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/stores";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart, MessageCircle, Reply } from "lucide-react";
import { useSocket } from "@/hooks";
import { toast } from "sonner";
import { iCoin } from "@/types/onchain-data";
import { iChatMessage, iRoom } from "@/types";
import { MessageTypeEnum } from "@/consts";

dayjs.extend(relativeTime);

function CommentItem({
  comment,
  isReply = false,
  onLike,
  onReply,
}: {
  comment: iChatMessage & { isNew?: boolean; replies?: any[]; likes?: number };
  isReply?: boolean;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment?.likes || 0);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
    onLike(comment.id);
  };

  return (
    <div
      className={`group relative ${comment.isNew ? "animate-pulse-subtle" : ""}`}
    >
      {isReply && (
        <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-gray-600 to-transparent opacity-30" />
      )}

      <div
        className={`relative transition-all duration-200 md:rounded-xl md:hover:bg-gray-800/30 ${isReply ? "ml-4 border-l border-gray-700/50 pl-4 md:ml-8" : ""} ${comment.isNew ? "border-green-500/20 md:border md:bg-green-500/5" : ""} px-0 py-3 md:p-4`}
      >
        <div className="flex items-start space-x-3">
          <Avatar className="size-7 min-w-7 md:size-9 md:min-w-9">
            <AvatarImage
              src={comment.user.avatar}
              className="bg-gradient-to-br from-gray-600 to-gray-700"
            />
            <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-sm font-medium text-white">
              {comment.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center space-x-2">
              <span className="truncate text-sm font-semibold text-white">
                {comment.user.name}
              </span>

              <span className="text-xs font-medium text-gray-500">
                {dayjs(comment.timestamp).fromNow()}
              </span>
              {comment.isNew && (
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                  New
                </span>
              )}
            </div>

            <p className="mb-3 text-sm leading-relaxed break-words whitespace-pre-line text-gray-200 [&>*]:leading-tight [&>br+br]:hidden">
              {comment.message
                .replace(/\n\s*\n+/g, "\n\n")
                .replace(/^\s+|\s+$/g, "")
                .replace(/[ \t]+/g, " ")}
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isLiked
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-gray-700/50 text-gray-400 hover:bg-gray-700/70 hover:text-red-400"
                } `}
              >
                <Heart
                  className={`size-3.5 transition-all duration-200 ${isLiked ? "scale-110 fill-current" : ""}`}
                />
                <span>{likeCount}</span>
              </button>

              {!isReply && (
                <button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="flex items-center space-x-1.5 rounded-full bg-gray-700/50 px-3 py-1.5 text-xs font-medium text-gray-400 transition-all duration-200 hover:scale-105 hover:bg-gray-700/70 hover:text-blue-400 active:scale-95"
                >
                  <Reply className="size-3.5" />
                  <span>Reply</span>
                </button>
              )}

              {/* <button className="rounded-full p-1.5 text-gray-500 transition-all duration-200 hover:bg-gray-700/50 hover:text-gray-300">
                <MoreHorizontal className="size-3.5" />
              </button> */}
            </div>

            {showReplyBox && (
              <div className="mt-4 rounded-lg border border-gray-700/30 bg-gray-800/30 p-3">
                <Textarea
                  placeholder="Write a reply..."
                  className="min-h-[60px] resize-none border-gray-600/30 bg-transparent text-sm text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-0"
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyBox(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isReply={true}
                onLike={onLike}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TokenComments({
  coin,
  replies,
}: {
  coin: iCoin;
  replies: iRoom | null;
}) {
  const { userProfile, publicKey, setIsLoginModalOpen } = useAuthStore();
  const { sendMessage } = useSocket();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <TabsContent value="replies" className="space-y-4">
      <div className="flex items-start space-x-3">
        <Avatar className="hidden size-8 min-w-8 md:flex md:size-10 md:min-w-10">
          <AvatarImage src={userProfile?.avatar} className="bg-gray-700" />
          <AvatarFallback className="bg-gray-700 text-xs">A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Degens only, start yapping..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (publicKey) {
                  setLoading(true);
                  sendMessage(coin.id, input.trim())
                    .then(() => {
                      setInput("");
                    })
                    .catch((error) => {
                      console.error("Error sending message:", error);
                      toast.error("Bruh, failed to send 😭");
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }
              }
            }}
            className="min-h-[80px] resize-none rounded-lg border-gray-600/50 bg-transparent! text-sm! text-white placeholder:text-gray-400 focus:border-green-500/50! focus:ring-[0] md:text-base!"
          />
          <div className="mt-2 flex items-start justify-between md:mt-2">
            <span className="text-sm text-gray-500">
              Keep it degen, not toxic 🤝
            </span>

            <Button
              disabled={!input}
              onClick={() => {
                if (publicKey) {
                  setLoading(true);
                  sendMessage(coin.id, input.trim())
                    .then(() => {
                      setInput("");
                    })
                    .catch((error) => {
                      console.error("Error sending message:", error);
                      toast.error("Bruh, failed to send 😭");
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                } else {
                  toast.error("Connect your wallet to shill");
                  setIsLoginModalOpen(true);
                }
              }}
              className="mt-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-xs! text-white hover:bg-green-700 hover:from-green-600 hover:to-emerald-700 max-md:h-8 md:px-8 md:text-sm!"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Shillingg..
                </>
              ) : publicKey ? (
                "Shill It 🚀"
              ) : (
                "Connect or Stay Mute 😭"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-gray-700/50 pt-4">
        {replies?.messages &&
        replies?.messages?.filter((e) => e.type === MessageTypeEnum.TEXT)
          .length > 0 ? (
          replies.messages
            .filter((e) => e.type === MessageTypeEnum.TEXT)
            .map((comment, index) => (
              <CommentItem
                key={comment.id}
                comment={{
                  ...comment,
                  isNew: !index,
                }}
                onLike={() => null}
                onReply={() => null}
              />
            ))
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-gray-800/50">
              <MessageCircle className="size-6 text-gray-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              No comments yet
            </h3>
            <p className="text-sm text-gray-400">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </TabsContent>
  );
}
