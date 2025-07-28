import { ComingSoon } from '@/components/common';
import { User } from "lucide-react"

export default function ProfilePage() {
  return (
    <ComingSoon
      title="Profile"
      description="Manage your account, track your trading history, and customize your experience"
      icon={<User className="w-16 h-16 text-green-400" />}
      features={[
        "Trading History",
        "Portfolio Tracking",
        "Achievement System",
        "Custom Themes",
        "Notification Settings",
        "Social Features",
      ]}
    />
  )
}
