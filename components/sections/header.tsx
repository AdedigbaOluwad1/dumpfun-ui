/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Menu, Rocket, UserRound } from "lucide-react";
import Link from "next/link";
import {
  ActivityIndicator,
  LoginModal,
  ParticleRenderer,
  particleStyles,
} from "@/components/common";
import { useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { useDisintegrationParticles } from "@/hooks";
import { Activity } from "@/types";
import { AnimatePresence, motion } from "motion/react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { particles, containerRef, onElementDisintegrate } =
    useDisintegrationParticles();

  const [activities, setActivities] = useState<React.ReactNode[]>([]);

  const addActivity = (activity: Activity) => {
    const node = (
      <ActivityIndicator
        key={activity.id}
        {...activity}
        onExpiration={(element) => {
          onElementDisintegrate(element, () => {
            setActivities((prev) =>
              prev.filter((ind) => (ind as any)?.key !== activity.id),
            );
          });
        }}
      />
    );

    setActivities((prev) => [node, ...prev]);
  };

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
          <button
            className="hidden md:block"
            onClick={() =>
              !!(activities.length % 2)
                ? addActivity({
                    id: `activity-${Date.now().toString()}`,
                    user: "727qPs",
                    action: "bought",
                    amount: "0.5467 SOL",
                    token: "DEVLIN",
                    value: "$179K",
                    avatar: "/placeholder.svg?height=24&width=24&text=7",
                  })
                : addActivity({
                    id: `activity-${Date.now().toString()}`,
                    user: "9b6TD7",
                    action: "created",
                    token: "CACA",
                    avatar: "/placeholder.svg?height=24&width=24&text=9",
                  })
            }
          >
            Add Elements
          </button>
          <AnimatePresence>
            <motion.div
              ref={containerRef}
              layout
              className="relative flex items-center gap-4"
            >
              <ParticleRenderer particles={particles} />

              {activities}

              <style jsx>{particleStyles}</style>
            </motion.div>
          </AnimatePresence>
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
