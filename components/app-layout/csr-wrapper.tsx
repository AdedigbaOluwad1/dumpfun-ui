"use client";

import { useAuthStore } from "@/stores";
import React from "react";
import { LoginModal, OnboardingModal } from "../common";
import { Toaster } from "sonner";

export function CSRWrapper() {
  const { showUserOnboardingModal, isLoginModalOpen, setIsLoginModalOpen } =
    useAuthStore();
  return (
    <>
      <OnboardingModal isOpen={showUserOnboardingModal} onClose={() => null} />
      <LoginModal onOpenChange={setIsLoginModalOpen} open={isLoginModalOpen} />
      <Toaster
        toastOptions={{
          classNames: {
            toast:
              "bg-gray-900/5! backdrop-blur-md! text-sm! md:text-base! text-white/70! border-gray-700/70! shadow-lg",
            description: "text-gray-400!",
          },
        }}
        position="bottom-right"
      />
    </>
  );
}
