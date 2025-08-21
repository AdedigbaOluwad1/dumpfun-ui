import {
  HelpCircle,
  Home,
  MessageCircle,
  Radio,
  Settings,
  User,
} from "lucide-react";

export const navItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: Radio, label: "Livestreams", href: "/livestreams" },
  { icon: Settings, label: "Advanced", href: "/advanced" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: HelpCircle, label: "Support", href: "/support" },
];

export const forbiddenSigs = new Map<string, boolean>([
  ["1111111111111111111111111111111111111111111111111111111111111111", true],
]);
