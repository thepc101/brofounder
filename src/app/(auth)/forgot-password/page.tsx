"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Reset link sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8 text-center">
        <Link href="/" className="mb-6 inline-block text-lg font-semibold tracking-tight">
          brofounder
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {sent
            ? "Check your email for the reset link."
            : "Enter your email and we'll send you a reset link."}
        </p>
      </div>

      {sent ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 size={24} className="text-green-500" />
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            If an account exists with {email}, you'll receive a password reset link shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="alex@example.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading && <Loader2 size={16} className="animate-spin" />}
            Send reset link
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </motion.div>
  );
}
