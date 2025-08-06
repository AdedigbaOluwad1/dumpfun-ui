"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileImage,
  Clock,
  Heart,
  Share,
  Users,
  DollarSign,
  X,
  Rocket,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useAppStore, useAuthStore } from "@/stores";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export default function CreateToken() {
  const { publicKey, setIsLoginModalOpen } = useAuthStore();
  const { sendTransaction } = useWallet();
  const { program, connection } = useAppStore();

  const [data, setData] = useState<{
    name: string;
    ticker: string;
    description: string;
    honeyCheck: string;
    image: File | null;
  }>({
    name: "",
    ticker: "",
    description: "",
    honeyCheck: "",
    image: null,
  });
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (file: File | null): boolean => {
    if (!file) return false;

    const allowedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type!");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 10MB limit.");
      return false;
    }

    return true;
  };

  const handleFileChange = (file: File | null) => {
    if (validateFile(file)) setData((prev) => ({ ...prev, image: file }));
  };

  const handleTokenCreation = async () => {
    if (!!publicKey) {
      const mint = Keypair.generate();

      const [mintAuthorityPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("mint_authority")],
        program!.programId,
      );

      const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: new PublicKey(publicKey),
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports: await getMinimumBalanceForRentExemptMint(connection),
        programId: TOKEN_PROGRAM_ID,
      });

      const initializeMintInstruction = createInitializeMintInstruction(
        mint.publicKey,
        6,
        mintAuthorityPDA,
        null,
        TOKEN_PROGRAM_ID,
      );

      const ix = await program!.methods
        .initialize(
          data.name,
          data.ticker,
          "https://53cso10vyy.ufs.sh/f/0zLYHmgdOsEGYF3WHmI7jv08b2BZmzpuEFaAiQNHXKsgrPTD",
        )
        .accounts({
          creator: new PublicKey(publicKey),
          mint: mint.publicKey,
          tokenMetadataProgram: new PublicKey(
            "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          ),
          program: program!.programId,
        })
        .instruction();

      const tx = new Transaction()
        .add(createAccountInstruction)
        .add(initializeMintInstruction)
        .add(ix);

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = new PublicKey(publicKey);

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="h-fit">
      <div className="p-5 py-8 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card className="gap-0 border-gray-800 bg-gray-900/50 pt-4 shadow-xl backdrop-blur-sm md:pt-6">
                <CardHeader className="pb-4 max-md:gap-0">
                  <div className="flex items-center space-x-2">
                    <div className="size-1.5 animate-pulse rounded-full bg-green-400 max-md:mb-0.75 md:size-2"></div>
                    <CardTitle className="text-base text-white md:text-lg">
                      Basic Information
                    </CardTitle>
                  </div>
                  <p className="text-sm text-gray-400">
                    Essential details for your token
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:space-y-3">
                      <Label className="flex items-center font-medium text-gray-300">
                        Token Name
                        <span className="ml-1 text-red-400">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          value={data.name}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="e.g. Dogecoin"
                          className="h-10 rounded-lg border-gray-600/50 bg-transparent! text-white/70 transition-all duration-200 placeholder:text-gray-500 focus:border-green-500/50! focus:ring-[0] md:h-11"
                        />
                        {data.name && (
                          <div className="absolute top-1/2 right-3 -translate-y-1/2">
                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <Label className="flex items-center font-medium text-gray-300">
                        Ticker Symbol
                        <span className="ml-1 text-red-400">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          value={data.ticker}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              ticker: e.target.value.toUpperCase().slice(0, 10),
                            }))
                          }
                          placeholder="e.g. DOGE"
                          className="h-10 rounded-lg border-gray-600/50 bg-transparent! text-white/70 transition-all duration-200 placeholder:text-gray-500 focus:border-green-500/50! focus:ring-[0] md:h-11"
                        />
                        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-500">
                          {data.ticker.length}/10
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <Label className="font-medium text-gray-300">
                      Description
                    </Label>
                    <div className="relative">
                      <Textarea
                        value={data.description}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            description: e.target.value.slice(0, 500),
                          }))
                        }
                        placeholder="Tell the world about your token. What makes it special? What problem does it solve?"
                        className="min-h-[120px] resize-none rounded-lg border-gray-600/50 bg-transparent! text-white/70 transition-all duration-200 placeholder:text-gray-500 focus:border-green-500/50! focus:ring-[0]"
                      />
                      <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                        {data.description.length}/500
                      </div>
                    </div>
                  </div>

                  <Input
                    value={data.honeyCheck}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        honeyCheck: e.target.value,
                      }))
                    }
                    type="email"
                    name="email"
                    placeholder="e.g. Dogecoin"
                    className="hello h-10 rounded-lg border-gray-600/50 bg-transparent! text-white/70 transition-all duration-200 placeholder:text-gray-500 focus:border-green-500/50! focus:ring-[0] md:h-11"
                  />
                </CardContent>
              </Card>

              <Card className="gap-0 border-gray-800 bg-gray-900/50 pt-4 shadow-xl backdrop-blur-sm md:pt-6">
                <CardHeader className="pb-4 max-md:gap-0">
                  <div className="flex items-center space-x-2">
                    <FileImage className="size-4 animate-pulse text-green-400 md:size-5" />
                    <CardTitle className="text-base text-white md:text-lg">
                      Token Image
                    </CardTitle>
                  </div>
                  <p className="text-sm text-gray-400">
                    Upload an eye-catching image for your token
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="group rounded-xl border border-dashed border-gray-600/50 bg-transparent! p-8 text-center transition-all duration-300 hover:border-green-500/50 hover:bg-gray-900/50">
                      {data.image ? (
                        <div className="relative">
                          <Image
                            src={
                              URL.createObjectURL(data.image) ||
                              "/placeholder.svg"
                            }
                            alt="Token preview"
                            width={120}
                            height={120}
                            className="mx-auto rounded-xl shadow-lg"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 p-0 text-white hover:bg-red-600"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                image: null,
                              }))
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mx-auto flex aspect-[1/0.9] w-15 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 transition-all duration-300 group-hover:from-green-500/20 group-hover:to-green-600/20 md:w-20">
                            <Upload className="size-5 text-gray-400 transition-colors group-hover:text-green-400 md:size-8" />
                          </div>
                          <div>
                            <Button
                              variant="outline"
                              className="border-gray-600 bg-transparent pr-4! text-gray-300 transition-all duration-200 hover:border-green-500 hover:bg-green-500/10 hover:text-green-400"
                              onClick={() => uploadRef.current?.click()}
                            >
                              <Upload className="size-4" />
                              Choose Image
                            </Button>

                            <input
                              type="file"
                              name="file"
                              className="hidden"
                              ref={uploadRef}
                              onInput={(e) =>
                                handleFileChange(
                                  e.currentTarget.files?.[0] || null,
                                )
                              }
                              id=""
                            />

                            <p className="mt-3 text-xs text-gray-500 md:text-sm">
                              PNG, JPG, GIF up to 10MB
                            </p>
                            <p className="text-xs text-gray-600">
                              Recommended: 1000x1000px (1:1 ratio)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 backdrop-blur-sm md:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500/20 md:size-10">
                    <Clock className="size-4.5 text-yellow-400 md:size-5" />
                  </div>
                  <div>
                    <h3 className="mb-0.5 text-sm font-semibold text-yellow-200 md:mb-2 md:text-base">
                      Important Notice
                    </h3>
                    <p className="text-xs leading-relaxed text-yellow-300/80 md:text-sm">
                      Token details cannot be modified after creation. Please
                      review all information carefully. The creation process is
                      irreversible and costs 0.1 SOL.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card className="gap-0 border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
                  <CardHeader className="pb-4 max-md:gap-0">
                    <div className="flex items-center space-x-2">
                      <div className="size-1.5 animate-pulse rounded-full bg-blue-400 max-md:mb-0.75 md:size-2"></div>
                      <CardTitle className="text-base text-white md:text-lg">
                        Live Preview
                      </CardTitle>
                    </div>
                    <p className="text-sm text-gray-400">
                      See how your token will appear
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl border border-gray-800 p-4 md:p-6">
                      <div className="mb-4 flex items-start space-x-4 md:mb-6">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg">
                          {data.image ? (
                            <Image
                              src={
                                URL.createObjectURL(data.image) ||
                                "/placeholder.svg"
                              }
                              alt="Token"
                              width={64}
                              height={64}
                              className="rounded-xl"
                            />
                          ) : (
                            <span className="text-xl md:text-2xl">🪙</span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 md:mb-0.5">
                            <h3 className="truncate text-base font-bold text-white md:text-lg">
                              {data.name || "Your Token Name"}
                            </h3>
                            <Badge className="animate-pulse border-green-500/30 bg-green-500/20 text-xs text-green-400">
                              NEW
                            </Badge>
                          </div>
                          <p className="mb-1 text-sm text-gray-400">
                            {data.ticker || "TICKER"}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>created now</span>
                            <span>•</span>
                            <span>0 replies</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-pink-500/20 hover:text-pink-400"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-blue-500/20 hover:text-blue-400"
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {data.description && (
                        <div className="mb-4 md:mb-6">
                          <p className="line-clamp-3 text-sm leading-relaxed text-gray-300">
                            {data.description}
                          </p>
                        </div>
                      )}

                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-gray-800/50 p-3 text-center">
                          <div className="mb-1 flex items-center justify-center space-x-1">
                            <DollarSign className="mb-0.5 size-4 text-green-400" />
                            <span className="text-base font-bold text-white md:text-lg">
                              5.2K
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Market Cap
                          </div>
                        </div>
                        <div className="rounded-lg bg-gray-800/50 p-3 text-center">
                          <div className="mb-1 flex items-center justify-center space-x-1">
                            <Users className="mb-0.5 size-4 text-blue-400" />
                            <span className="text-base font-bold text-white md:text-lg">
                              0
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">Holders</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="mb-2 flex justify-between text-xs text-gray-400">
                          <span>Bonding Progress</span>
                          <span>1%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-700 md:h-2">
                          <div className="h-full w-[2%] rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"></div>
                        </div>
                      </div>

                      <Button
                        onClick={handleTokenCreation}
                        disabled={
                          !!publicKey
                            ? !(
                                !!publicKey &&
                                !!data.name &&
                                !!data.ticker &&
                                !!data.image &&
                                !data.honeyCheck
                              )
                            : false
                        }
                        className="h-10 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-7 text-sm font-semibold text-white hover:from-green-600 hover:to-emerald-700 md:text-sm"
                      >
                        {!!publicKey ? (
                          <>
                            <Rocket className="size-4 md:size-5" />
                            Create Coin
                          </>
                        ) : (
                          <>
                            <UserRound className="size-3.5 md:size-4" />
                            Login
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
