"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User, Mail, Lock, Palette, Download, Trash2, LogOut, Sun, Moon,
  Camera, Shield, Key, AlertTriangle, Bell, Globe, Gauge, Zap, BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore, type AISettingsQuality } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "ai", label: "AI Settings", icon: BrainCircuit },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data & Privacy", icon: Globe },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

const qualityOptions: { value: AISettingsQuality; label: string; desc: string; icon: React.ElementType }[] = [
  { value: "high", label: "High Quality", desc: "Best model, deeper analysis, up to 10 tool calls", icon: Zap },
  { value: "medium", label: "Balanced", desc: "Good balance of speed and quality, up to 6 tool calls", icon: Gauge },
  { value: "low", label: "Fast", desc: "Quick responses, lighter analysis, up to 3 tool calls", icon: Gauge },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout, setAuth } = useStore();
  const aiQuality = useStore((s) => s.aiQuality);
  const setAiQuality = useStore((s) => s.setAiQuality);
  const [activeSection, setActiveSection] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState({
    email: true, push: false, weekly: true, marketing: false,
  });

  const handleSaveProfile = () => {
    if (name.trim() && email.trim()) {
      setAuth({ name: name.trim(), email: email.trim() });
      toast.success("Profile updated");
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) { toast.error("Please fill in all fields"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords don't match"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    toast.success("Password changed");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  };

  const handleExportData = () => {
    const data = useStore.getState();
    const blob = new Blob([JSON.stringify({
      user: data.user, project: data.project, onboardingData: data.onboardingData,
      marketResearch: data.marketResearch, competitors: data.competitors,
      validationResult: data.validationResult, personas: data.personas,
      mvpPlan: data.mvpPlan, marketingPlan: data.marketingPlan,
      documents: data.documents, tasks: data.tasks,
    }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `brofounder-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
    toast.success("Data exported");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      logout(); toast.success("Account deleted"); router.push("/");
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-white/[0.05] p-3">
        <p className="mb-3 px-2.5 text-[9px] font-semibold uppercase tracking-widest text-white/12">
          Settings
        </p>
        <nav className="space-y-0.5">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2.5 py-[7px] text-[13px] transition-all",
                activeSection === section.id
                  ? "bg-white/[0.07] text-white/70"
                  : "text-white/25 hover:bg-white/[0.04] hover:text-white/45"
              )}
            >
              <section.icon size={13} />
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-w-lg"
        >
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">Profile</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Manage your personal information</p>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-500/10 text-lg text-blue-400/40">
                      {name.charAt(0) || "F"}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute -bottom-1 -right-1 rounded-full bg-white/[0.08] p-1.5 text-white/30 hover:text-white/50">
                    <Camera size={12} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/65">{name || "Founder"}</p>
                  <p className="text-[11px] text-white/25">{email || "founder@example.com"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] text-white/35">Full Name</Label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                    <Input value={name} onChange={(e) => setName(e.target.value)}
                      className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm" placeholder="Your name" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] text-white/35">Email</Label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/15" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                      className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm" placeholder="your@email.com" />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} className="h-9 rounded-lg bg-blue-500/15 text-sm text-blue-400/70 hover:bg-blue-500/20">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === "ai" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">AI Settings</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Configure AI quality and behavior</p>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Response Quality</p>
                {qualityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAiQuality(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
                      aiQuality === opt.value
                        ? "border-blue-500/20 bg-blue-500/[0.05]"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      aiQuality === opt.value ? "bg-blue-500/15" : "bg-white/[0.04]"
                    )}>
                      <opt.icon size={14} className={aiQuality === opt.value ? "text-blue-400/60" : "text-white/25"} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-white/60">{opt.label}</p>
                      <p className="text-[11px] text-white/25">{opt.desc}</p>
                    </div>
                    <div className={cn(
                      "h-4 w-4 rounded-full border-2 transition-all",
                      aiQuality === opt.value
                        ? "border-blue-400/50 bg-blue-400/20"
                        : "border-white/[0.12]"
                    )} />
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[11px] font-medium text-white/30 uppercase tracking-wider mb-2">About Models</p>
                <div className="space-y-2 text-[12px] text-white/30">
                  <p><span className="text-white/50">High:</span> llama-3.3-70b-versatile — best reasoning, 8K tokens</p>
                  <p><span className="text-white/50">Medium:</span> llama-3.3-70b-versatile — balanced, 4K tokens</p>
                  <p><span className="text-white/50">Fast:</span> mixtral-8x7b-32768 — quick responses, 2K tokens</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">Appearance</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Customize how brofounder looks</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon size={16} className="text-white/35" />
                    <div>
                      <p className="text-[13px] text-white/60">Dark Mode</p>
                      <p className="text-[11px] text-white/25">Toggle dark/light theme</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">Notifications</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Control notification preferences</p>
              </div>
              <div className="space-y-2">
                {[
                  { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                  { key: "weekly", label: "Weekly Digest", desc: "Summary of your progress" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div>
                      <p className="text-[13px] text-white/60">{item.label}</p>
                      <p className="text-[11px] text-white/25">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(v) => setNotifications((p) => ({ ...p, [item.key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">Security</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Manage your password and security</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Key size={14} className="text-white/35" />
                  <p className="text-[13px] font-medium text-white/60">Change Password</p>
                </div>
                <div className="space-y-2.5">
                  <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password" className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] text-sm" />
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password" className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] text-sm" />
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password" className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] text-sm" />
                  <Button onClick={handleChangePassword} className="h-9 rounded-lg bg-blue-500/15 text-sm text-blue-400/70 hover:bg-blue-500/20">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "data" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">Data & Privacy</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Control your data</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Download size={16} className="text-white/35" />
                    <div>
                      <p className="text-[13px] text-white/60">Export All Data</p>
                      <p className="text-[11px] text-white/25">Download as JSON</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportData}
                    className="h-8 rounded-lg border-white/[0.08] text-[11px]">Export</Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "danger" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/75">Danger Zone</h2>
                <p className="mt-0.5 text-[12px] text-white/25">Irreversible actions</p>
              </div>
              <div className="space-y-2">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] text-white/60">Sign Out</p>
                      <p className="text-[11px] text-white/25">Sign out on this device</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { logout(); toast.success("Signed out"); router.push("/"); }}
                      className="h-8 gap-1.5 rounded-lg border-white/[0.08] text-[11px]">
                      <LogOut size={12} /> Sign Out
                    </Button>
                  </div>
                </div>
                <div className="rounded-xl border border-red-500/15 bg-red-500/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] text-red-400/60">Delete Account</p>
                      <p className="text-[11px] text-white/25">Permanently delete everything</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleDeleteAccount}
                      className="h-8 gap-1.5 rounded-lg text-[11px]">
                      <Trash2 size={12} /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
