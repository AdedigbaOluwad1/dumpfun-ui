"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ExternalLink,
  Copy,
  CheckCircle,
  ArrowRight,
  MoreHorizontal,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn, copyToClipboard } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";

interface ImprovedTokenLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  tokenUrl: string;
  contractAddress?: string;
}

function SubtleBackgroundEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full bg-green-400/15 blur-xl" />
      <div
        className="absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-full bg-emerald-400/10 blur-2xl"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
}

function SuccessMetrics() {
  return (
    <div className="flex items-center justify-center gap-6 text-xs md:text-sm">
      <div className="flex items-center gap-2 text-green-400">
        <Icon icon={"lucide:rocket"} className="h-4 w-4" />
        <span className="font-medium">Contract Deployed</span>
      </div>
      <div className="flex items-center gap-2 text-blue-400">
        <Globe className="h-4 w-4" />
        <span className="font-medium">Live on Chain</span>
      </div>
    </div>
  );
}

function TwitterPreview({
  tweetContent,
  onContentChange,
}: {
  tweetContent: string;
  onContentChange: (content: string) => void;
}) {
  const { userProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const characterLimit = 280;
  const charactersUsed = tweetContent.length;
  const charactersRemaining = characterLimit - charactersUsed;

  const twitterActions = [
    {
      icon: "lucide:message-circle",
      count: "500",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-400/10",
      className: "size-3.5 md:size-4",
    },
    {
      icon: "lucide:repeat-2",
      count: "295",
      color: "hover:text-green-400",
      bg: "hover:bg-green-400/10",
      className: "size-5 md:size-5.5",
    },
    {
      icon: "si:heart-line",
      count: "34.5k",
      color: "hover:text-red-400",
      bg: "hover:bg-red-400/10",
    },
    {
      icon: "bx:bar-chart",
      count: "105.4k",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-400/10",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-black md:rounded-2xl">
      <div className="border-b border-gray-800 px-4 py-2 md:py-3">
        <div className="flex items-center gap-2">
          <Icon
            icon={"hugeicons:new-twitter"}
            className="size-4 text-white md:size-5"
          />
          <span className="text-xs font-semibold text-white md:text-sm">
            Post Preview
          </span>
          <Badge
            variant="secondary"
            className="border-blue-400/30 bg-blue-500/20 text-xs text-blue-300 max-md:text-[0.625rem]"
          >
            Draft
          </Badge>
        </div>
      </div>

      <div className="px-4 pt-3 pb-1 md:p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 max-[380px]:hidden">
            <Image
              src={"/crypto-trader-avatar.png"}
              alt=""
              className="size-10 rounded-full object-cover object-center md:size-12"
              width={40}
              height={40}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-white md:text-base">
                Satoshi
              </span>
              <Icon
                icon={"ph:seal-check-fill"}
                className="size-3.5 text-blue-400 md:size-4.5"
              />
              <span className="text-xs text-gray-500 md:text-base">
                @{userProfile?.name || "KryptoDegen"}
              </span>
              <span className="text-sm text-gray-500 md:text-base">·</span>
              <span className="text-xs text-gray-500 md:text-base">now</span>
              <MoreHorizontal className="ml-auto h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-300" />
            </div>

            <div className="">
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={tweetContent}
                    onChange={(e) => onContentChange(e.target.value)}
                    className="min-h-25 resize-none border-gray-600 bg-transparent text-sm leading-5 text-white focus:border-blue-400 md:text-base"
                    placeholder="What's happening?"
                    maxLength={characterLimit}
                  />
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-xs md:text-sm ${charactersRemaining < 20 ? "text-red-400" : "text-gray-400"}`}
                    >
                      {charactersRemaining} characters remaining
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="text-xs! text-gray-400 hover:text-white md:text-sm"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="-m-2 cursor-pointer rounded-md p-2 text-sm leading-5 whitespace-pre-line text-white transition-colors md:text-base"
                  onClick={() => setIsEditing(true)}
                >
                  <div className="group-hover whitespace-pre-line">
                    {tweetContent.split(/(\s+)/).map((segment, index) => {
                      // If segment is whitespace (including line breaks)
                      if (/\s/.test(segment)) {
                        return segment; // This preserves \r\n, \n, spaces, etc.
                      }

                      // Process non-whitespace words
                      if (segment.startsWith("#")) {
                        return (
                          <span key={index} className="text-blue-400">
                            {segment}
                          </span>
                        );
                      }
                      if (segment.startsWith("@")) {
                        return (
                          <span key={index} className="text-blue-400">
                            {segment}
                          </span>
                        );
                      }
                      if (segment.startsWith("http")) {
                        return (
                          <span
                            key={index}
                            className="inline-block max-w-8/10 truncate text-blue-400"
                          >
                            {segment}
                          </span>
                        );
                      }
                      return <span key={index}>{segment}</span>;
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex max-w-md items-center justify-between text-gray-500 min-[380px]:-ml-2">
              {twitterActions.map((action, index) => (
                <div
                  key={index}
                  className={`group flex cursor-pointer items-center ${action.color}`}
                >
                  <div
                    className={`rounded-full p-2 transition-colors ${action.bg}`}
                  >
                    <Icon
                      icon={action.icon}
                      className={cn("size-4 md:size-5", action?.className)}
                    />
                  </div>
                  <span className="-ml-0.5 hidden text-xs md:-ml-1 md:block md:text-sm">
                    {action.count}
                  </span>
                  <span className="-ml-0.5 text-xs md:-ml-1 md:hidden md:text-sm">
                    0
                  </span>
                </div>
              ))}

              <div className="max-md: flex items-center">
                <div className="cursor-pointer rounded-full p-1 hover:bg-blue-400/10 md:p-2">
                  <Icon
                    icon="fluent:bookmark-20-regular"
                    className="size-4 hover:text-blue-400 md:size-5"
                  />
                </div>
                <div className="cursor-pointer rounded-full p-1 hover:bg-blue-400/10 md:p-2">
                  <Icon
                    icon="solar:share-outline"
                    className="size-4 hover:text-blue-400 md:size-4.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TokenLaunchModal({
  isOpen,
  onClose,
  tokenName,
  tokenUrl,
  contractAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590e4265",
}: ImprovedTokenLaunchModalProps) {
  const [copied, setCopied] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const { push } = useRouter();

  useEffect(() => {
    const defaultTweet = `🚀 Just launched $${tokenName} on @dumpfun! 
    
Early bird gets the worm 🐦
Join the community before we moon! 🌙
    
${tokenUrl}
    
#memecoin #crypto #${tokenName} #DeFi #ToTheMoon`;
    setTweetContent(defaultTweet);
  }, [tokenName, tokenUrl]);

  const handleTweet = () => {
    if (tweetContent.length > 280) {
      toast.error("Tweet is too long! Please edit to under 280 characters.");
      return;
    }

    const tweetText = encodeURIComponent(tweetContent);
    window.open(`https://x.com/intent/post?text=${tweetText}`, "_blank");
    toast.success("Opening X to share your launch! 🐦");
  };

  const handleCopyAddress = async () => {
    await copyToClipboard(contractAddress, "Contract address copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewToken = () => {
    toast.info("Opening your token page 📈");
    push(`/coin/${contractAddress}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden overflow-y-auto rounded-2xl border-gray-700/50 bg-gray-900/5 p-0! shadow-2xl backdrop-blur-xs sm:max-w-xl!">
        <ScrollArea className="max-h-[90vh] overflow-auto">
          <SubtleBackgroundEffect />

          <div className="relative z-10 p-5 md:p-8">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-xl font-bold text-white md:text-2xl">
                Launch Successful!
              </h1>

              <div className="mb-3 flex items-center justify-center gap-2">
                <Badge
                  variant="secondary"
                  className="border-green-400/30 bg-green-500/20 text-green-300 max-md:text-[0.625rem]!"
                >
                  ${tokenName}
                </Badge>
                <span className="text-sm text-gray-400">is now live</span>
              </div>

              <SuccessMetrics />
            </div>

            <div className="mb-6 rounded-xl border border-gray-700/50 bg-gray-800/30 p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs text-gray-400">Contract Address</p>
                  <p className="truncate font-mono text-sm text-white">
                    {contractAddress}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="ml-2 h-8 w-8 flex-shrink-0 p-0"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <TwitterPreview
                tweetContent={tweetContent}
                onContentChange={setTweetContent}
              />
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleTweet}
                disabled={tweetContent.length > 280}
                className="min-h-10 w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 py-3 text-xs! font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:from-gray-600 disabled:to-gray-700 disabled:hover:scale-100 md:text-sm!"
              >
                <Icon icon="hugeicons:new-twitter" className="size-md:size-5" />
                {tweetContent.length > 280 ? "Post Too Long" : "Post This"}
                <ArrowRight className="size-4 md:size-4.5" />
              </Button>

              <Button
                onClick={handleViewToken}
                variant="outline"
                className="min-h-10 w-full rounded-full border-gray-600 py-3 text-xs! text-gray-300 hover:bg-gray-800 md:text-sm!"
              >
                <ExternalLink className="size-4 md:size-4.5" />
                View Coin
              </Button>
            </div>

            <div className="mt-6 rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 backdrop-blur-xs">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                  <span className="text-xs font-bold text-blue-400">💡</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-300">Pro Tip</p>
                  <p className="text-xs text-blue-200/80 md:text-sm">
                    Click on the tweet preview to customize your message. Add
                    your own flair to stand out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
