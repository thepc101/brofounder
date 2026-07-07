"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  PanelLeftClose,
  PanelLeftOpen,
  Code,
  MessageSquare,
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
  const { sidebarOpen, setSidebarOpen, user } = useStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const collapsed = !sidebarOpen || isMobile;

  return (
    <aside
      className={cn(
        "flex flex-col transition-all duration-300 ease-out",
        collapsed ? "w-[52px]" : "w-52"
      )}
      style={{
        background: "linear-gradient(180deg, hsl(222, 25%, 7%) 0%, hsl(222, 30%, 5%) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-12 items-center border-b border-white/10 px-2.5",
          collapsed && "justify-center px-0"
        )}
      >
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15">
              <BrainCircuit size={13} className="text-blue-400/70" />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-white/80">
              brofounder
            </span>
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "rounded-lg p-1.5 text-white/20 transition-colors hover:bg-white/[0.06] hover:text-white/40",
            collapsed ? "mx-auto" : "ml-auto"
          )}
        >
          {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2.5">
        {navItems.map((item, i) => {
          if ("divider" in item && item.divider) {
            return collapsed ? (
              <div key={i} className="my-2.5 h-px bg-white/[0.04]" />
            ) : (
              <p
                key={i}
                className="mb-1 mt-4 px-2.5 text-[9px] font-semibold uppercase tracking-widest text-white/12"
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
                  "group relative mb-1 flex h-8 w-full items-center justify-center rounded-lg transition-all duration-150",
                  isActive
                    ? "bg-white/[0.08] text-blue-400/80"
                    : "text-white/25 hover:bg-white/[0.05] hover:text-white/45"
                )}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-blue-400/50" />
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
                "group relative mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] transition-all duration-150",
                isActive
                  ? "bg-white/[0.07] font-medium text-white/80"
                  : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-blue-400/50" />
              )}
              <Icon size={14} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] transition-all duration-150",
            pathname === "/settings"
              ? "bg-white/[0.07] text-white/80"
              : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
          )}
        >
          <Settings size={14} />
          {!collapsed && <span>Settings</span>}
        </Link>

        <div
          className={cn(
            "mt-1 flex items-center gap-2 rounded-lg px-2.5 py-1.5",
            collapsed && "justify-center px-0"
          )}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-blue-500/10 text-[9px] text-blue-400/50">
              {user?.name?.charAt(0) || "F"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <span className="truncate text-[11px] text-white/35">{user?.name || "Founder"}</span>
          )}
        </div>
      </div>
    </aside>
  );
}
