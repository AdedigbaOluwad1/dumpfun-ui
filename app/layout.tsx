import type { Metadata } from "next";
import { Nunito, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header, Sidebar } from "@/components/sections";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WalletContextProvider } from "@/providers";
import {
  LoginModal,
  OnboardingModal,
  ProfileSyncModal,
} from "@/components/common";
import { Toaster } from "sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Dump.fun | The Ultimate Crypto Degen Playground",
  description:
    "Dive into Dump.fun — the unhinged crypto arena where memes rule, market chaos reigns, and volatility is just foreplay. Chart like a lunatic, trade like you stole it, and vibe like the bull run never ends. High-risk, high-reward, 100% pure on-chain entertainment for the fearless and the foolish. Welcome to the blockchain’s most dangerously addictive playground.",
  keywords: [
    "Dump.fun",
    "Dumpfun",
    "crypto memes",
    "degen trading",
    "shitcoins",
    "meme tokens",
    "pump and dump",
    "Solana degens",
    "crypto chaos",
    "meme coin launchpad",
    "on-chain fun",
    "crypto gambling",
    "volatile trading",
    "blockchain madness",
  ],
  icons: {
    icon: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
    shortcut: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
    apple: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
  },
  openGraph: {
    title: "Dump.fun | The Ultimate Crypto Degen Playground",
    description:
      "Where blockchain meets chaos — Dumpfun is your high-volatility, meme-fueled crypto playground. Launch, trade, chart, and lose your mind in the most unhinged on-chain experience alive.",
    url: "https://dumpfun.vercel.app",
    siteName: "Dumpfun",
    images: [
      {
        url: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
        width: 800,
        height: 800,
        alt: "Dumpfun Degen Ape",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dump.fun | The Ultimate Crypto Degen Playground",
    description:
      "Memes, market madness, and blockchain chaos — Dumpfun is where degens come to play, pump, dump, and repeat.",
    images: ["https://dumpdotfun.vercel.app/avatars/degen-ape.png"],
    creator: "@AdedigbaOluwad1",
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
        className={`${geistMono.variable} ${nunito.variable} ${jetbrainsMono.variable} dark grid h-dvh w-screen bg-gray-950 antialiased md:h-screen lg:grid-cols-[16rem_1fr]`}
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

            <OnboardingModal />
            <ProfileSyncModal />
            <LoginModal />
            <Toaster
              toastOptions={{
                classNames: {
                  toast:
                    "bg-gray-900/5! backdrop-blur-md! text-xs! md:text-sm! text-white/70! border-gray-700/70! shadow-lg",
                  description: "text-gray-400!",
                },
                className: "md:max-w-[450px]! min-w-fit! whitespace-nowrap!",
              }}
              position="bottom-right"
              duration={6000}
            />
          </main>
        </WalletContextProvider>
      </body>
    </html>
  );
}
