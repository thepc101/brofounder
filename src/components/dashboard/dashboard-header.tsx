"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({ title, description, actions }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const user = useStore((s) => s.user);

  return (
    <div className="flex items-center justify-between border-b border-white/[0.04] bg-[#0a1020]/50 px-6 py-2.5 backdrop-blur-sm">
      <div>
        <h1 className="text-[15px] font-semibold tracking-tight text-white/80">{title}</h1>
        {description && (
          <p className="text-[11px] text-white/30">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {actions}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-white/[0.06] hover:text-white/50"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button className="rounded-lg p-1.5 text-white/25 transition-colors hover:bg-white/[0.06] hover:text-white/50">
          <Bell size={14} />
        </button>
        <Avatar className="h-6 w-6">
          <AvatarFallback className="bg-white/[0.06] text-[10px] text-white/50">
            {user?.name?.charAt(0) || "F"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
