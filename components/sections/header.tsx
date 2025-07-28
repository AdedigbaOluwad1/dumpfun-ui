/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, Rocket, UserRound } from "lucide-react";
import Link from "next/link";
import { LoginModal } from "@/components/common";
import { useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activities = [
    {
      user: "727qPs",
      action: "bought",
      amount: "0.5467 SOL",
      token: "DEVLIN",
      value: "$179K",
      avatar: "/placeholder.svg?height=24&width=24&text=7",
    },
    {
      user: "9b6TD7",
      action: "created",
      token: "CACA",
      avatar: "/placeholder.svg?height=24&width=24&text=9",
    },
  ];

  return (
    <div className="sticky top-0 flex h-full items-center border-b border-gray-800 bg-gray-900 px-4 md:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-fit items-center space-x-4">
          <div className="flex items-center gap-2 px-1 lg:hidden">
            <MobileSidebar>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="text-foreground/80 -ml-2"
              >
                <Menu className="size-5 md:size-6 md:min-w-6" />
              </Button>
            </MobileSidebar>
            <img
              src={"https://dumpdotfun.vercel.app/pepe-sm.png"}
              className="w-7"
              alt=""
            />
          </div>
          {activities.map((activity, index) => (
            <div
              key={index}
              className="hidden items-center space-x-2 rounded-full bg-gray-800 px-4 py-2 md:flex"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {activity.user[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-300">
                <span className="font-medium text-green-400">
                  {activity.user}
                </span>
                {` ${activity.action} `}
                {activity.amount && (
                  <span className="text-yellow-400">{activity.amount}</span>
                )}

                {activity.amount && " of "}

                <span className="font-medium text-blue-400">
                  {activity.token}
                </span>

                {activity.value && (
                  <>
                    <Badge
                      variant="secondary"
                      className="ml-1 bg-green-500/20 text-green-400"
                    >
                      {activity.value}
                    </Badge>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link href={"/create"}>
            <Button className="h-8 w-fit rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-7 text-xs font-semibold text-white hover:from-green-600 hover:to-emerald-700 md:h-9 md:text-sm">
              <Rocket className="size-3.5 md:size-4" />
              Create Coin
            </Button>
          </Link>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-8 w-fit rounded-lg border border-green-600 bg-transparent px-7 text-xs font-semibold text-green-600 hover:bg-transparent md:h-9 md:text-sm"
          >
            <UserRound className="size-3.5 md:size-4" />
            Login
          </Button>
        </div>
      </div>

      <LoginModal onOpenChange={setIsModalOpen} open={isModalOpen} />
    </div>
  );
}
