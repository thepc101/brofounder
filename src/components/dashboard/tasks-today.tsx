"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const defaultTasks = [
  { id: "t1", title: "Complete your onboarding", completed: false, priority: "high" as const },
  { id: "t2", title: "Run market research", completed: false, priority: "high" as const },
  { id: "t3", title: "Validate your idea", completed: false, priority: "medium" as const },
  { id: "t4", title: "Create customer personas", completed: false, priority: "medium" as const },
  { id: "t5", title: "Plan your MVP", completed: false, priority: "low" as const },
];

export function TasksToday() {
  const tasks = useStore((s) => s.tasks);
  const toggleTask = useStore((s) => s.toggleTask);
  const displayTasks = tasks.length > 0 ? tasks : defaultTasks;

  return (
    <Card className="border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center justify-between text-[13px] font-medium text-white/55">
          Today's Tasks
          <span className="text-[10px] font-normal text-white/25">
            {displayTasks.filter((t) => t.completed).length}/{displayTasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-2.5">
          {displayTasks.slice(0, 6).map((task) => (
            <label
              key={task.id}
              className="flex items-start gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-0.5 border-white/15 data-[state=checked]:bg-blue-500/20 data-[state=checked]:border-blue-500/30"
              />
              <span
                className={cn(
                  "text-[13px] transition-all",
                  task.completed ? "text-white/20 line-through" : "text-white/50"
                )}
              >
                {task.title}
              </span>
              {task.priority === "high" && !task.completed && (
                <span className="ml-auto shrink-0 rounded-md bg-red-500/10 px-1.5 py-0.5 text-[9px] font-medium text-red-400/50">
                  High
                </span>
              )}
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
