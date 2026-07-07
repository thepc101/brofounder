"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const { setAuth } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        if (error) throw error;
        setAuth({ name: form.name, email: form.email });
        toast.success("Account created!");
        router.push("/onboarding");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        setAuth({ name: form.email.split("@")[0], email: form.email });
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="mb-4 inline-block text-lg font-semibold tracking-tight text-white/80"
        >
          brofounder
        </Link>
        <h1
          className="mt-6 text-2xl font-normal tracking-tight text-white/90"
          style={{ fontFamily: "var(--font-display-face)" }}
        >
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-white/30">
          {mode === "login"
            ? "Continue building your startup."
            : "Start building your startup in minutes."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <div className="space-y-1.5">
            <Label className="text-[11px] text-white/40">Full name</Label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
              />
              <Input
                id="name"
                placeholder="Alex Chen"
                className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] pl-9 text-sm placeholder:text-white/15"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-[11px] text-white/40">Email</Label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
            />
            <Input
              id="email"
              type="email"
              placeholder="alex@example.com"
              className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] pl-9 text-sm placeholder:text-white/15"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px] text-white/40">Password</Label>
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] pl-9 pr-9 text-sm placeholder:text-white/15"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {mode === "login" && (
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[11px] text-white/25 hover:text-white/40"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-xl bg-white/[0.08] text-sm hover:bg-white/[0.12]"
        >
          {loading && <Loader2 size={14} className="mr-2 animate-spin" />}
          {mode === "login" ? "Sign in" : "Create account"}
          {!loading && <ArrowRight size={14} className="ml-2" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13px] text-white/25">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={mode === "login" ? "/signup" : "/login"}
          className="font-medium text-white/50 hover:text-white/70"
        >
          {mode === "login" ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </motion.div>
  );
}
