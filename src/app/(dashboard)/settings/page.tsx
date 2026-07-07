"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { Sun, Moon, LogOut, User, Mail, Palette } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div>
      <DashboardHeader title="Settings" description="Manage your account and preferences." />
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-sm">
                  {user?.name?.charAt(0) || "F"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name || "Founder"}</p>
                <p className="text-sm text-muted-foreground">{user?.email || "founder@example.com"}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <User size={16} />
                {user?.name || "Founder"}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} />
                {user?.email || "founder@example.com"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                  <div>
                    <Label htmlFor="theme" className="text-sm font-medium">Dark mode</Label>
                    <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                </div>
                <Switch
                  id="theme"
                  checked={theme === "dark"}
                  onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="gap-2 w-full"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
