export interface iChatMessage {
  id: string;
  roomId: string;
  userId: string;
  user: iMessageSender;
  message: string;
  timestamp: string;
  type: number;
}

export interface iMessageSender {
  id: string;
  name: string;
  avatar: string;
  traderType: string;
  description: string;
}

export interface iRoom {
  success: boolean;
  roomId: string;
  messages: iChatMessage[];
  users: iChatParticipant[];
  readOnly: boolean;
}

export interface iChatParticipant {
  userId: string;
  joinedAt: string;
  roomId: string;
  timestamp: string;
}
