"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const user = useStore((s) => s.user);

  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-3">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">
            {user?.name?.charAt(0) || "F"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
