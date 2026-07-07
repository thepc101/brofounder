"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SocialButton({ provider, icon, onClick, className }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn("w-full gap-3", className)}
    >
      {icon}
      <span>Continue with {provider}</span>
    </Button>
  );
}
