import { ComingSoon } from "@/components/common";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <ComingSoon
      title="Profile"
      description="Manage your account, track your trading history, and customize your experience"
      icon={<User className="h-16 w-16 text-green-400" />}
    />
  );
}
