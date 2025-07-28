import { ComingSoon } from "@/components/common";
import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <ComingSoon
      title="Chat"
      description="Connect with the community, share insights, and discuss the latest memecoin trends"
      icon={<MessageCircle className="h-16 w-16 text-green-400" />}
      features={[
        "Global Chat Rooms",
        "Token-Specific Channels",
        "Private Messaging",
        "Voice Channels",
        "File Sharing",
        "Moderation Tools",
      ]}
    />
  );
}
