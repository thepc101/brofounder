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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          Today's Tasks
          <span className="text-xs text-muted-foreground">
            {displayTasks.filter((t) => t.completed).length}/{displayTasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayTasks.slice(0, 6).map((task) => (
            <label
              key={task.id}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-0.5"
              />
              <span
                className={cn(
                  "text-sm transition-all",
                  task.completed && "text-muted-foreground line-through"
                )}
              >
                {task.title}
              </span>
              {task.priority === "high" && !task.completed && (
                <span className="ml-auto shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
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
