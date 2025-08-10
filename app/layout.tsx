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
  title: "Dumpfun",
  description:
    "A chaotic crypto playground where memes, market madness, and volatility collide — chart, trade, and vibe like it’s all a joke... until it isn’t.",
  icons: {
    icon: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
    shortcut: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
    apple: "https://dumpdotfun.vercel.app/avatars/degen-ape.png",
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
                    "bg-gray-900/5! backdrop-blur-md! text-sm! md:text-base! text-white/70! border-gray-700/70! shadow-lg",
                  description: "text-gray-400!",
                },
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
