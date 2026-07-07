"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  BrainCircuit,
  Search,
  CheckCircle,
  Crosshair,
  Users,
  Map,
  Rocket,
  Megaphone,
  FileText,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/use-media-query";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/workspace", label: "Workspace", icon: BrainCircuit },
  { href: "/research", label: "Research", icon: Search },
  { href: "/validation", label: "Validation", icon: CheckCircle },
  { href: "/competitors", label: "Competitors", icon: Crosshair },
  { href: "/audience", label: "Audience", icon: Users },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/mvp", label: "MVP", icon: Rocket },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/documents", label: "Documents", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, setSidebarOpen, user } = useStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const collapsed = !sidebarOpen || isMobile;

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-200",
        collapsed ? "w-[60px]" : "w-56"
      )}
    >
      <div className={cn("flex h-14 items-center border-b border-border px-3", collapsed && "justify-center px-0")}>
        {!collapsed && (
          <Link href="/dashboard" className="text-base font-semibold tracking-tight">
            brofounder
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            collapsed ? "mx-auto" : "ml-auto"
          )}
        >
          {collapsed ? <PanelLeft size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (collapsed) {
            return (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-9 w-full items-center justify-center rounded-md transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                      )}
                    >
                      <Icon size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-2">
        {collapsed ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="flex h-9 w-full items-center justify-center rounded-md text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                >
                  <Settings size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
          >
            <Settings size={16} />
            Settings
          </Link>
        )}
      </div>

      <Separator />

      <div className={cn("flex items-center gap-2 p-3", collapsed && "flex-col")}>
        {!collapsed && (
          <>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">
                  {user?.name?.charAt(0) || "F"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{user?.name || "Founder"}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
