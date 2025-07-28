import { ComingSoon } from "@/components/common";
import { Radio } from "lucide-react";

export default function LivestreamsPage() {
  return (
    <ComingSoon
      title="Livestreams"
      description="Watch live trading sessions, token launches, and community discussions in real-time"
      icon={<Radio className="h-16 w-16 text-green-400" />}
      features={[
        "Live Trading Sessions",
        "Token Launch Events",
        "Community Chat",
        "Expert Analysis",
        "Interactive Polls",
        "Screen Sharing",
      ]}
    />
  );
}
