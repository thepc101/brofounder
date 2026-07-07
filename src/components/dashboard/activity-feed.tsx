"use client";

import { useStore } from "@/lib/store";
import { formatRelativeTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, Search, FileText, Rocket, Users, CheckCircle, Megaphone } from "lucide-react";

const activityIcons: Record<string, React.ElementType> = {
  research: Search,
  validation: CheckCircle,
  workspace: BrainCircuit,
  document: FileText,
  marketing: Megaphone,
  mvp: Rocket,
  audience: Users,
};

export function ActivityFeed() {
  const activities = useStore((s) => s.activities);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activity yet</p>
        ) : (
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = activityIcons[activity.type] || BrainCircuit;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="rounded-md border border-border p-1.5">
                      <Icon size={12} className="text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.description}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-muted-foreground">
                      {formatRelativeTime(activity.timestamp)}
                    </time>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
