"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Rocket, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/consts/config";
import { DialogTitle } from "../ui/dialog";

interface MobileSidebarProps {
  children: React.ReactNode;
}

export function MobileSidebar({ children }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 border-none bg-transparent p-0 shadow-none"
      >
        <DialogTitle className="hidden"></DialogTitle>
        <div className="h-full p-4">
          <div className="h-full overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/5 shadow-2xl backdrop-blur-md">
            <div className="flex h-full w-full flex-col">
              <div className="flex h-15 items-center border-b border-gray-800 p-6 py-0 pr-2">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="rounded-lg p-0 backdrop-blur-3xl">
                    <Image
                      src={"/pepe-sm.png"}
                      width={1000}
                      height={1000}
                      className="w-7"
                      alt=""
                    />
                  </div>
                  <span className="text-xl font-bold">dump.fun</span>
                </Link>

                <SheetClose asChild>
                  <Button className="ml-auto" variant={"ghost"}>
                    <X />
                  </Button>
                </SheetClose>
              </div>

              <nav className="w-full flex-1 p-4 py-2">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        className={`flex h-12 items-center space-x-3 rounded-lg px-2 py-2 text-sm transition-colors ${
                          pathname === item.href
                            ? "border-0 border-green-500/30 bg-transparent text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        <item.icon className="size-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-gray-800 p-4">
                <Link href="/create">
                  <Button className="h-10 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-xs font-semibold text-white hover:from-green-600 hover:to-emerald-700">
                    <Rocket className="size-4" />
                    Create Coin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
