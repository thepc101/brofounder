"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({ title, description, actions }: DashboardHeaderProps) {
  const user = useStore((s) => s.user);

  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-3">
      <div>
        <h1 className="text-[15px] font-semibold text-white/80">{title}</h1>
        {description && <p className="mt-0.5 text-[12px] text-white/30">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <button className="rounded-lg p-1.5 text-white/20 transition-colors hover:bg-white/[0.06] hover:text-white/40">
          <Bell size={14} />
        </button>
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-blue-500/10 text-[10px] text-blue-400/50">
            {user?.name?.charAt(0) || "F"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
