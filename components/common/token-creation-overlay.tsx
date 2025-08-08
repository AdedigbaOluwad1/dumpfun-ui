/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  Key,
  Rocket,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import styles from "./token-creation-overlay.module.css";
import { cn } from "@/lib/utils";

export type CreationState =
  | "uploading-metadata"
  | "formulating-instructions"
  | "signing-transaction"
  | "launching-token"
  | "success"
  | "rolling-back";

type TokenCreationOverlayProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  state?: CreationState;
  tokenName?: string;
  progress?: number;
};

const stateConfig = {
  "uploading-metadata": {
    icon: Upload,
    title: "Uploading Metadata",
    subtitle: "Preparing token information and assets",
    color: "blue",
  },
  "formulating-instructions": {
    icon: FileText,
    title: "Formulating Instructions",
    subtitle: "Compiling smart contract bytecode",
    color: "purple",
  },
  "signing-transaction": {
    icon: Key,
    title: "Signing Transaction",
    subtitle: "Authorizing deployment with your wallet",
    color: "amber",
  },
  "launching-token": {
    icon: Rocket,
    title: "Launching Token",
    subtitle: "Broadcasting to the blockchain",
    color: "emerald",
  },
  success: {
    icon: CheckCircle,
    title: "Launch Successful!",
    subtitle: "Your token is now live on the blockchain",
    color: "green",
  },
  "rolling-back": {
    icon: RotateCcw,
    title: "Rolling Back Changes",
    subtitle: "Reverting transaction and cleaning up",
    color: "red",
  },
} as const;

export function TokenCreationOverlay({
  open = false,
  onOpenChange,
  state = "uploading-metadata",
  tokenName = "MOONSHOT",
  progress = 0,
}: TokenCreationOverlayProps) {
  const config = stateConfig[state];
  const IconComponent = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-0 bg-transparent p-0 shadow-none sm:max-w-7xl!"
        // hideCloseButton
      >
        <div className={cn(styles.dialogContent)}>
          <div className={styles.grain} aria-hidden="true" />

          {/* Dynamic background based on state */}
          <div
            className={`${styles.background} ${styles[`bg-${config.color}`]}`}
            aria-hidden="true"
          />

          {/* Animated elements based on state */}
          <div
            className={styles.scene}
            aria-label={`${config.title} for $${tokenName}`}
          >
            {state === "uploading-metadata" && <MetadataAnimation />}
            {state === "formulating-instructions" && <InstructionsAnimation />}
            {state === "signing-transaction" && <SigningAnimation />}
            {state === "launching-token" && <LaunchAnimation />}
            {state === "success" && <SuccessAnimation />}
            {state === "rolling-back" && <RollbackAnimation />}
          </div>

          {/* HUD */}
          <div className={styles.hud}>
            <div
              className={cn(
                styles.hudInner,
                "rounded-2xl border border-gray-700/50 bg-gray-900/5 shadow-2xl backdrop-blur-3xl!",
              )}
            >
              <div
                className={`${styles.iconContainer} ${styles[`icon-${config.color}`]}`}
              >
                <IconComponent className="h-8 w-8" />
                <div className={styles.iconGlow} />
              </div>

              <div
                className={`${styles.badge} ${styles[`badge-${config.color}`]}`}
              >
                ${tokenName}
              </div>

              <h2 className={styles.title}>{config.title}</h2>
              <p className={styles.subtitle}>{config.subtitle}</p>

              {state !== "success" && (
                <div
                  className={styles.track}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div
                    className={`${styles.bar} ${styles[`bar-${config.color}`]}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {state === "success" && onOpenChange && (
                <div className={styles.actions}>
                  <Button
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={() => onOpenChange(false)}
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Keep all the animation components the same...
function MetadataAnimation() {
  return (
    <div className={styles.metadataScene}>
      <div className={styles.cloud}>
        <div className={styles.cloudGlow} />
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={styles.dataPacket}
          style={{ ["--i" as any]: i } as React.CSSProperties}
        >
          <div className={styles.packetInner} />
        </div>
      ))}
    </div>
  );
}

function InstructionsAnimation() {
  return (
    <div className={styles.codeScene}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader} />
        <div className={styles.codeLines}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={styles.codeLine}
              style={{ ["--i" as any]: i } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      <div className={styles.compileEffect} />
    </div>
  );
}

function SigningAnimation() {
  return (
    <div className={styles.signingScene}>
      <div className={styles.wallet}>
        <div className={styles.walletGlow} />
        <div className={styles.signature}>
          <div className={styles.signatureLine} />
          <div className={styles.signatureDot} />
        </div>
      </div>
      <div className={styles.authRings}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={styles.authRing}
            style={{ ["--i" as any]: i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function LaunchAnimation() {
  return (
    <div className={styles.launchScene}>
      <div className={styles.moon}>
        <div className={styles.moonGlow} />
      </div>
      <div className={styles.rocketGroup}>
        <div className={styles.rocket}>
          <div className={styles.rocketWindow} />
          <div className={styles.finLeft} />
          <div className={styles.finRight} />
          <div className={styles.nose} />
          <div className={styles.flame} />
        </div>
        <div className={styles.exhaust} />
      </div>
      <div className={styles.launchPad} />
    </div>
  );
}

function SuccessAnimation() {
  return (
    <div className={styles.successScene}>
      <div className={styles.celebration}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.confetti}
            style={{ ["--i" as any]: i } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.trophy}>
        <div className={styles.trophyGlow} />
      </div>
    </div>
  );
}

function RollbackAnimation() {
  return (
    <div className={styles.rollbackScene}>
      <div className={styles.reverseEffect}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={styles.reverseLine}
            style={{ ["--i" as any]: i } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.undoSymbol}>
        <div className={styles.undoGlow} />
      </div>
    </div>
  );
}
