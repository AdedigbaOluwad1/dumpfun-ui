import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header, Sidebar } from "@/components/sections";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CSRWrapper } from "@/components/app-layout";
import { WalletContextProvider } from "@/providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dumpfun",
  description:
    "A chaotic crypto playground where memes, market madness, and volatility collide — chart, trade, and vibe like it’s all a joke... until it isn’t.",
  icons: {
    icon: "https://dumpdotfun.vercel.app/pepe-sm.png",
    shortcut: "https://dumpdotfun.vercel.app/pepe.png",
    apple: "https://dumpdotfun.vercel.app/pepe-sm.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${nunito.variable} dark grid h-dvh w-screen bg-gray-950 antialiased md:h-screen lg:grid-cols-[16rem_1fr]`}
      >
        <WalletContextProvider>
          <Sidebar />
          <main className="grid h-dvh w-full grid-rows-[3.75rem_1fr] overflow-hidden md:h-screen md:grid-rows-[4.5rem_1fr]">
            <Header />
            <div className="flex h-full w-full overflow-hidden px-0.5 py-1">
              <ScrollArea className="h-full flex-1 overflow-auto">
                {children}
              </ScrollArea>
            </div>
            <CSRWrapper />
          </main>
        </WalletContextProvider>
      </body>
    </html>
  );
}
