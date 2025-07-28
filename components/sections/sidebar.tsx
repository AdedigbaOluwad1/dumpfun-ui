/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { navItems } from "@/consts/config";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden h-full w-full flex-col border-r border-gray-800 bg-gray-900 lg:flex">
      <div className="flex h-18 items-center border-b border-gray-800 p-6 py-0">
        <Link href="/" className="flex items-center space-x-3">
          <div className="rounded-lg p-1 backdrop-blur-3xl">
            <img
              src={"https://dumpdotfun.vercel.app/pepe-sm.png"}
              className="w-8"
              alt=""
            />
          </div>
          <span className="text-xl font-bold">dump.fun</span>
        </Link>
      </div>

      <nav className="w-full flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex h-12 items-center space-x-3 rounded-lg px-4 py-2 transition-colors ${
                  pathname === item.href
                    ? "border-0 border-green-500/30 bg-transparent text-green-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <Link href="/create">
          <Button className="h-10 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 font-semibold text-white hover:from-green-600 hover:to-emerald-700">
            <Rocket className="size-5" />
            Create Coin
          </Button>
        </Link>
      </div>
    </div>
  );
}
