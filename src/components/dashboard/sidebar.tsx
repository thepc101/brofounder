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
  PanelLeftClose,
  PanelLeftOpen,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import { useMediaQuery } from "@/hooks/use-media-query";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/workspace", label: "Workspace", icon: BrainCircuit },
  { divider: true, label: "Tools" },
  { href: "/research", label: "Research", icon: Search },
  { href: "/validation", label: "Validation", icon: CheckCircle },
  { href: "/competitors", label: "Competitors", icon: Crosshair },
  { href: "/audience", label: "Audience", icon: Users },
  { divider: true, label: "Build" },
  { href: "/mvp", label: "MVP Planner", icon: Rocket },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/codegen", label: "Code Gen", icon: Code },
  { href: "/roadmap", label: "Roadmap", icon: Map },
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
        "flex flex-col border-r border-white/[0.04] bg-[#0a1020] transition-all duration-300 ease-out",
        collapsed ? "w-[52px]" : "w-52"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-11 items-center border-b border-white/[0.04] px-2.5",
          collapsed && "justify-center px-0"
        )}
      >
        {!collapsed && (
          <Link
            href="/dashboard"
            className="text-[13px] font-semibold tracking-tight text-white/80"
          >
            brofounder
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "rounded-md p-1 text-white/25 transition-colors hover:bg-white/[0.06] hover:text-white/50",
            collapsed ? "mx-auto" : "ml-auto"
          )}
        >
          {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {navItems.map((item, i) => {
          if ("divider" in item && item.divider) {
            return collapsed ? (
              <div key={i} className="my-2 h-px bg-white/[0.04]" />
            ) : (
              <p
                key={i}
                className="mb-1 mt-3 px-2 text-[10px] font-medium uppercase tracking-wider text-white/15"
              >
                {item.label}
              </p>
            );
          }

          const isActive = pathname === item.href;
          const Icon = item.icon!;

          if (collapsed) {
            return (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "group relative mb-0.5 flex h-8 w-full items-center justify-center rounded-lg transition-all duration-150",
                  isActive
                    ? "bg-white/[0.08] text-white/80"
                    : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
                )}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-white/40" />
                )}
                <Icon size={15} />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "group relative mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-150",
                isActive
                  ? "bg-white/[0.06] font-medium text-white/80"
                  : "text-white/35 hover:bg-white/[0.03] hover:text-white/55"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-white/40" />
              )}
              <Icon size={14} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/[0.04] p-2">
        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-150",
            pathname === "/settings"
              ? "bg-white/[0.06] text-white/80"
              : "text-white/35 hover:bg-white/[0.03] hover:text-white/55"
          )}
        >
          <Settings size={14} />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* User */}
        <div
          className={cn(
            "mt-1 flex items-center gap-2 rounded-lg px-2.5 py-1.5",
            collapsed && "justify-center px-0"
          )}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md p-1 text-white/25 transition-colors hover:bg-white/[0.06] hover:text-white/50"
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          {!collapsed && (
            <>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-white/[0.06] text-[9px] text-white/50">
                    {user?.name?.charAt(0) || "F"}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-[11px] text-white/40">{user?.name || "Founder"}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
