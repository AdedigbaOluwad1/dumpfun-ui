import { ComingSoon } from "@/components/common";
import { HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <ComingSoon
      title="Support"
      description="Get help, report issues, and access comprehensive documentation"
      icon={<HelpCircle className="h-16 w-16 text-green-400" />}
    />
  );
}
