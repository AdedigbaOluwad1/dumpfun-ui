import { ComingSoon } from "@/components/common";
import { Settings } from "lucide-react";

export default function AdvancedPage() {
  return (
    <ComingSoon
      title="Advanced"
      description="Professional trading tools and analytics for serious memecoin traders"
      icon={<Settings className="h-16 w-16 text-green-400" />}
      features={[
        "Advanced Charting",
        "Technical Indicators",
        "Portfolio Analytics",
        "Risk Management",
        "API Integration",
        "Custom Alerts",
      ]}
    />
  );
}
