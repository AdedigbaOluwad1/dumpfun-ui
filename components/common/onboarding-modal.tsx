"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Zap,
  Baby,
  Crown,
  Flame,
  Target,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import clsx from "clsx";

const avatars = [
  {
    id: "degen-ape",
    name: "Degen Ape",
    src: "/avatars/degen-ape.png",
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands",
    src: "/avatars/whale.png",
  },
  {
    id: "rocket-pepe",
    name: "Rocket Pepe",
    src: "/avatars/pepe.png",
  },
  {
    id: "laser-eyes",
    name: "Laser Eyes",
    src: "/avatars/fomo-lord.png",
  },
  {
    id: "wojak-trader",
    name: "Wojak Trader",
    src: "/avatars/degen-ape.png",
  },
  {
    id: "chad-bull",
    name: "Chad Bull",
    src: "/avatars/paper-hands.png",
  },
];

const traderTypes = [
  {
    id: "degen",
    name: "Degen",
    icon: Flame,
    description:
      "YOLO into every shitcoin. Risk management? Never heard of it. 🔥",
  },
  {
    id: "fomo-lord",
    name: "FOMO Lord",
    icon: TrendingUp,
    description:
      "Always buying the top, selling the bottom. FOMO is your middle name. 📈",
  },
  {
    id: "diamond-hands",
    name: "Diamond Hands",
    icon: Sparkles,
    description:
      "HODLing through -99% dips. Your hands are forged from pure diamond. 💎",
  },
  {
    id: "paper-hands",
    name: "Paper Hands",
    icon: Target,
    description:
      "Panic selling at the first red candle. Weak hands, strong emotions. 📄",
  },
  {
    id: "whale",
    name: "Whale",
    icon: Crown,
    description:
      "Moving markets with your massive bags. The ocean trembles at your trades. 🐋",
  },
  {
    id: "newbie",
    name: "Newbie",
    icon: Baby,
    description:
      "Fresh meat in the crypto jungle. Learning the ropes one rug pull at a time. 🍼",
  },
  {
    id: "moon-boy",
    name: "Moon Boy",
    icon: Rocket,
    description:
      "Every coin is going to the moon. Realistic price targets are for peasants. 🚀",
  },
  {
    id: "swing-trader",
    name: "Swing Trader",
    icon: Zap,
    description:
      "Riding the waves like a crypto surfer. Technical analysis is your religion. ⚡",
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    traderType: "",
    description: "",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAvatarSelect = (avatarId: string) => {
    setFormData((prev) => ({ ...prev, avatar: avatarId }));
  };

  const handleTraderTypeSelect = (typeId: string) => {
    const selectedType = traderTypes.find((t) => t.id === typeId);
    setFormData((prev) => ({
      ...prev,
      traderType: typeId,
      description: selectedType?.description || "",
    }));
  };

  const handleFinish = () => {
    console.log("Onboarding completed:", formData);
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.avatar.length > 0;
      case 3:
        return formData.traderType.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl border-gray-700/50 bg-gray-900/5 shadow-2xl backdrop-blur-xl sm:max-w-xl">
        <div className="relative">
          <div className="relative p-1 sm:p-2">
            <DialogHeader className="mb-4 items-center gap-0 text-center md:mb-8">
              <DialogTitle className="text-xl font-bold text-white sm:text-3xl">
                Welcome to dump.fun
              </DialogTitle>
              <p className="text-sm text-gray-400 md:text-base">
                Let&apos;s set up your degen profile
              </p>
            </DialogHeader>

            <div className="mb-4 flex justify-center md:mb-8">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      clsx(
                        `size-2 rounded-full transition-all duration-300 md:size-2.5`,
                        i <= step ? "bg-green-500/70" : "bg-gray-700",
                        i === step && "animate-pulse",
                      ),
                    )}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white sm:text-2xl">
                    What should we call you?
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base">
                    Choose a name that strikes fear into the hearts of paper
                    hands
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Display Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your degen name..."
                    className="h-11 rounded-lg border-gray-700/60 bg-transparent! text-sm text-white/80 placeholder:text-white/60 focus:border-green-500/50! md:text-base"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white sm:text-2xl">
                    Choose your avatar
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base">
                    Pick the face that represents your trading spirit
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {avatars.map((avatar) => (
                    <Card
                      key={avatar.id}
                      className={`cursor-pointer border-[1.5px] py-2! transition-all duration-300 md:border-2 ${
                        formData.avatar === avatar.id
                          ? "border-green-500 bg-green-500/10"
                          : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                      }`}
                      onClick={() => handleAvatarSelect(avatar.id)}
                    >
                      <CardContent className="p-3 text-center sm:p-4">
                        <div className="mx-auto mb-2 flex size-14 items-center justify-center overflow-hidden rounded-full bg-gray-700 sm:size-16">
                          <Image
                            src={avatar.src || "/placeholder.svg"}
                            alt={avatar.name}
                            width={1000}
                            height={1000}
                            className="h-8/10 w-8/10 object-contain object-center"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-300 sm:text-sm">
                          {avatar.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white sm:text-2xl">
                    What type of trader are you?
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base">
                    Choose your trading personality
                  </p>
                </div>
                <div className="grid max-h-60 grid-cols-1 gap-3 overflow-y-auto sm:max-h-80 sm:grid-cols-2">
                  {traderTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Card
                        key={type.id}
                        className={`cursor-pointer border-[1.5px] py-0! transition-all duration-300 md:border-2 ${
                          formData.traderType === type.id
                            ? "border-green-500 bg-green-500/10"
                            : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                        }`}
                        onClick={() => handleTraderTypeSelect(type.id)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="mb-2 flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                              <IconComponent className="h-4 w-4 text-green-400" />
                            </div>
                            <h4 className="text-sm font-semibold text-white sm:text-base">
                              {type.name}
                            </h4>
                          </div>
                          <p className="text-xs leading-relaxed text-gray-400">
                            {type.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white sm:text-2xl">
                    Tell us about yourself
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base">
                    Customize your bio or keep our suggestion
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rounded-lg border border-gray-700/60 bg-transparent! p-4 sm:space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-700 sm:h-12 sm:w-12">
                      {formData.avatar && (
                        <Image
                          src={
                            avatars.find((a) => a.id === formData.avatar)
                              ?.src || ""
                          }
                          alt="Selected avatar"
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white sm:text-base">
                        {formData.name}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="border-green-500/30 bg-green-500/20 text-xs text-green-400"
                      >
                        {
                          traderTypes.find((t) => t.id === formData.traderType)
                            ?.name
                        }
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Bio
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Tell the world about your trading journey..."
                      className="min-h-[100px] border-gray-700/60 bg-transparent! text-sm text-white/80 placeholder:text-white/60 focus:border-green-500/50! md:text-base!"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between sm:mt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="text-xs text-gray-400 hover:bg-gray-800/50 hover:text-white sm:text-base"
              >
                <ChevronLeft className="size-4" />
                Back
              </Button>

              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="border-0 from-green-500 to-emerald-600 text-xs text-white not-disabled:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 disabled:bg-gray-700! disabled:text-gray-500! sm:text-base"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  className="border-0 bg-gradient-to-r from-green-500 to-emerald-600 text-xs! text-white hover:bg-green-600 hover:from-green-600 hover:to-emerald-700 sm:text-base"
                >
                  Start Trading
                  <Rocket className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
