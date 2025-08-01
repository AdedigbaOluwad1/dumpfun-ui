"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Activity } from "@/types";
import clsx from "clsx";
import { motion } from "motion/react";

export const ActivityIndicator = React.memo(({ ...props }: Activity) => {
  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      layout
      animate={{
        x: [-500, 150, -120, 90, -70, 50, -30, 20, -10, 5, 0],
        opacity: 1,
      }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        layout: { duration: 0.25, ease: "easeOut" },
      }}
      key={props.id}
      data-activity-id={props.id}
      className={clsx(
        "hidden items-center space-x-2 rounded-full bg-gray-800 px-4 py-2 md:flex",
        props.id,
      )}
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={props.avatar || "/placeholder.svg"} />
        <AvatarFallback className="text-xs">{props.user[0]}</AvatarFallback>
      </Avatar>
      <span className="text-sm text-gray-300">
        <span className="font-medium text-green-400">{props.user}</span>
        {` ${props.action} `}
        {props.amount && (
          <span className="text-yellow-400">{props.amount}</span>
        )}

        {props.amount && " of "}

        <span className="font-medium text-blue-400">{props.token}</span>

        {props.value && (
          <>
            <Badge
              variant="secondary"
              className="ml-1 bg-green-500/20 text-green-400"
            >
              {props.value}
            </Badge>
          </>
        )}
      </span>
    </motion.div>
  );
});

ActivityIndicator.displayName = "ActivityIndicator";
