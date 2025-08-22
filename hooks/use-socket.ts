/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatEventEnum } from "@/consts";
import { useAuthStore } from "@/stores";
import { SetStateAction, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

interface UseSocketProps {
  serverUrl?: string;
}

export interface MessageResponse {
  id: string;
  roomId: string;
  userId: string;
  message: string;
  timestamp: Date;
  type: string;
  user: string;
}

interface SocketResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export const useSocket = ({
  serverUrl = process.env.NEXT_PUBLIC_API_URL,
}: UseSocketProps = {}) => {
  const { userProfile } = useAuthStore();
  const socketRef = useRef<typeof Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create socket connection
    socketRef.current = io(`${serverUrl}chat`, {
      auth: { token: userProfile?.id },
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    // Connection handlers
    socket.on("connect", () => {
      console.log("Connected to chat server");
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
      setIsConnected(false);
    });

    socket.on(
      "connect_error",
      (err: { message: SetStateAction<string | null> }) => {
        console.error("Connection error:", err);
        setError(err.message);
        setIsConnected(false);
      },
    );

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [userProfile, serverUrl]);

  const emit = <T>(
    event: ChatEventEnum,
    data?: T,
  ): Promise<SocketResponse<T>> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current?.connected) {
        reject(new Error("Socket not connected"));
        return;
      }

      socketRef.current.emit(event, data, (response: SocketResponse<T>) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error || "Unknown error"));
        }
      });
    });
  };

  // Chat-specific methods
  const joinRoom = async (roomId: string) => {
    return emit(ChatEventEnum.JOIN_ROOM, { roomId });
  };

  const leaveRoom = async (roomId: string) => {
    return emit(ChatEventEnum.LEAVE_ROOM, { roomId });
  };

  const sendMessage = async (roomId: string, message: string) => {
    return emit(ChatEventEnum.SEND_MESSAGE, { roomId, message });
  };

  const getMessages = async (roomId: string, limit = 50, offset = 0) => {
    return emit(ChatEventEnum.GET_MESSAGES, { roomId, limit, offset });
  };

  const getRoomUsers = async (roomId: string) => {
    return emit(ChatEventEnum.GET_ROOM_USERS, { roomId });
  };

  const watchRoom = async (roomId: string) => {
    return emit(ChatEventEnum.WATCH_ROOM, { roomId });
  };

  // Event listeners
  const on = (event: ChatEventEnum, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback);
  };

  const off = (event: ChatEventEnum, callback?: (...args: any[]) => void) => {
    socketRef.current?.off(event, callback);
  };

  return {
    socket: socketRef.current,
    isConnected,
    error,
    joinRoom,
    leaveRoom,
    sendMessage,
    getMessages,
    getRoomUsers,
    watchRoom,
    on,
    off,
  };
};
