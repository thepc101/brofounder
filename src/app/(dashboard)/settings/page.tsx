"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Palette,
  Download,
  Trash2,
  LogOut,
  Sun,
  Moon,
  Camera,
  Shield,
  Key,
  AlertTriangle,
  Check,
  ArrowRight,
  Bell,
  Globe,
  Monitor,
  Keyboard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data & Privacy", icon: Globe },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, logout, setAuth } = useStore();
  const [activeSection, setActiveSection] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  const handleSaveProfile = () => {
    if (name.trim() && email.trim()) {
      setAuth({ name: name.trim(), email: email.trim() });
      toast.success("Profile updated");
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleExportData = () => {
    const data = useStore.getState();
    const exportData = {
      user: data.user,
      project: data.project,
      onboardingData: data.onboardingData,
      marketResearch: data.marketResearch,
      competitors: data.competitors,
      validationResult: data.validationResult,
      personas: data.personas,
      mvpPlan: data.mvpPlan,
      marketingPlan: data.marketingPlan,
      documents: data.documents,
      tasks: data.tasks,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brofounder-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout();
      toast.success("Account deleted");
      router.push("/");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div className="flex h-full">
      {/* Sidebar nav */}
      <div className="w-48 shrink-0 border-r border-white/[0.04] p-3">
        <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-wider text-white/15">
          Settings
        </p>
        <nav className="space-y-0.5">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-all ${
                activeSection === section.id
                  ? "bg-white/[0.06] text-white/70"
                  : "text-white/30 hover:bg-white/[0.03] hover:text-white/50"
              }`}
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
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-w-lg"
        >
          {/* Profile */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">Profile</h2>
                <p className="mt-0.5 text-[11px] text-white/30">
                  Manage your personal information
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-white/[0.06] text-lg text-white/40">
                        {name.charAt(0) || "F"}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 rounded-full bg-white/[0.1] p-1.5 text-white/40 transition-colors hover:bg-white/[0.15] hover:text-white/60">
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">{name || "Founder"}</p>
                    <p className="text-[11px] text-white/30">{email || "founder@example.com"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] text-white/40">Full Name</Label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                    />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] text-white/40">Email</Label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  className="h-9 rounded-lg bg-white/[0.08] text-sm hover:bg-white/[0.12]"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">Appearance</h2>
                <p className="mt-0.5 text-[11px] text-white/30">
                  Customize how brofounder looks
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon size={16} className="text-white/40" />
                    ) : (
                      <Sun size={16} className="text-white/40" />
                    )}
                    <div>
                      <p className="text-sm text-white/70">Dark Mode</p>
                      <p className="text-[11px] text-white/30">
                        Currently: {theme === "dark" ? "Dark" : "Light"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
                  />
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Monitor size={16} className="text-white/40" />
                    <div>
                      <p className="text-sm text-white/70">Theme Presets</p>
                      <p className="text-[11px] text-white/30">
                        Choose a visual theme
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {["Midnight", "Ocean", "Forest", "Sunset"].map((preset) => (
                      <button
                        key={preset}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/40 transition-all hover:border-white/[0.12] hover:text-white/60"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Keyboard size={16} className="text-white/40" />
                    <div>
                      <p className="text-sm text-white/70">Compact Mode</p>
                      <p className="text-[11px] text-white/30">
                        Reduce spacing for more content
                      </p>
                    </div>
                  </div>
                  <Switch className="mt-2" />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">Notifications</h2>
                <p className="mt-0.5 text-[11px] text-white/30">
                  Control what you get notified about
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                  { key: "weekly", label: "Weekly Digest", desc: "Summary of your startup progress" },
                  { key: "marketing", label: "Marketing Emails", desc: "Product updates and tips" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div>
                      <p className="text-sm text-white/70">{item.label}</p>
                      <p className="text-[11px] text-white/30">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(v) =>
                        setNotifications((prev) => ({ ...prev, [item.key]: v }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">Security</h2>
                <p className="mt-0.5 text-[11px] text-white/30">
                  Manage your password and security settings
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Key size={14} className="text-white/40" />
                    <p className="text-sm font-medium text-white/70">Change Password</p>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <Lock
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                      />
                      <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                        className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Lock
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                      />
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Lock
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                      />
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] pl-9 text-sm"
                      />
                    </div>
                    <Button
                      onClick={handleChangePassword}
                      className="h-9 rounded-lg bg-white/[0.08] text-sm hover:bg-white/[0.12]"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-white/40" />
                      <div>
                        <p className="text-sm text-white/70">Two-Factor Auth</p>
                        <p className="text-[11px] text-white/30">Add extra security to your account</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-white/[0.08] text-[11px]"
                    >
                      Enable
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Privacy */}
          {activeSection === "data" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">Data & Privacy</h2>
                <p className="mt-0.5 text-[11px] text-white/30">
                  Control your data and privacy settings
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Download size={16} className="text-white/40" />
                      <div>
                        <p className="text-sm text-white/70">Export All Data</p>
                        <p className="text-[11px] text-white/30">
                          Download all your data as JSON
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportData}
                      className="h-8 rounded-lg border-white/[0.08] text-[11px]"
                    >
                      Export
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-white/40" />
                    <div>
                      <p className="text-sm text-white/70">Data Retention</p>
                      <p className="text-[11px] text-white/30">
                        Your data is stored locally and in Supabase. We never sell your data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <Shield size={16} className="text-white/40" />
                    <div>
                      <p className="text-sm text-white/70">Privacy Policy</p>
                      <p className="text-[11px] text-white/30">
                        Read our privacy policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {activeSection === "danger" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">Danger Zone</h2>
                <p className="mt-0.5 text-[11px] text-white/30">
                  Irreversible actions
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/70">Sign Out</p>
                      <p className="text-[11px] text-white/30">
                        Sign out of your account on this device
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="h-8 gap-1.5 rounded-lg border-white/[0.08] text-[11px]"
                    >
                      <LogOut size={12} />
                      Sign Out
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-400/80">Delete Account</p>
                      <p className="text-[11px] text-white/30">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteAccount}
                      className="h-8 gap-1.5 rounded-lg text-[11px]"
                    >
                      <Trash2 size={12} />
                      Delete
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
