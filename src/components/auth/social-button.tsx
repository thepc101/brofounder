"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

export function SocialButton({ provider, icon, onClick, loading, className }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className={cn("w-full gap-3", className)}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      <span>Continue with {provider}</span>
    </Button>
  );
}
