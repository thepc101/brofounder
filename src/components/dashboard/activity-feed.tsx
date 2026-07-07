"use client";

import { useStore } from "@/lib/store";
import { formatRelativeTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BrainCircuit, Search, FileText, Rocket, Users, CheckCircle, Megaphone,
} from "lucide-react";

const activityIcons: Record<string, React.ElementType> = {
  research: Search, validation: CheckCircle, workspace: BrainCircuit,
  document: FileText, marketing: Megaphone, mvp: Rocket, audience: Users,
};

export function ActivityFeed() {
  const activities = useStore((s) => s.activities);

  return (
    <Card className="border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-[13px] font-medium text-white/55">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {activities.length === 0 ? (
          <p className="text-[13px] text-white/20">No activity yet</p>
        ) : (
          <ScrollArea className="h-[180px]">
            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = activityIcons[activity.type] || BrainCircuit;
                return (
                  <div key={activity.id} className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-md bg-blue-500/[0.06] p-1">
                      <Icon size={11} className="text-blue-400/30" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-white/45">
                        {activity.title}
                      </p>
                      <p className="truncate text-[11px] text-white/20">
                        {activity.description}
                      </p>
                    </div>
                    <time className="shrink-0 text-[10px] text-white/15">
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
