"use client";

import { useDatabaseSync } from "@/hooks/use-database-sync";

export function DashboardSyncWrapper({ children }: { children: React.ReactNode }) {
  useDatabaseSync();
  return <>{children}</>;
}
