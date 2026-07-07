"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const categories = [
  {
    title: "Pre-Launch",
    items: [
      "Finalize product and test all features",
      "Set up analytics and monitoring",
      "Create landing page with waitlist",
      "Build email capture system",
      "Prepare documentation and help center",
    ],
  },
  {
    title: "Launch Week",
    items: [
      "Submit to Product Hunt",
      "Launch on Hacker News",
      "Post on relevant subreddits",
      "Send launch email to subscribers",
      "Announce on Twitter/X and LinkedIn",
      "Reach out to journalists and bloggers",
    ],
  },
  {
    title: "Post-Launch",
    items: [
      "Monitor metrics and fix critical bugs",
      "Respond to all user feedback",
      "Analyze launch performance",
      "Plan next feature iteration",
      "Start content marketing engine",
    ],
  },
  {
    title: "Growth",
    items: [
      "Implement referral program",
      "Build case studies with early users",
      "Start paid acquisition (if budget)",
      "Optimize conversion funnel",
      "Plan partnership outreach",
    ],
  },
];

export default function LaunchPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const totalItems = categories.flatMap((c) => c.items).length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div>
      <DashboardHeader
        title="Launch"
        description="Your launch checklist and go-to-market playbook."
      />
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Launch readiness: {checkedCount}/{totalItems} tasks complete
            </p>
            <div className="mt-2 h-1.5 w-48 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${(checkedCount / totalItems) * 100}%` }}
              />
            </div>
          </div>
          <Rocket size={24} className="text-muted-foreground" />
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    {category.title}
                    <Badge variant="secondary" className="text-xs">
                      {category.items.filter((i) => checkedItems[i]).length}/{category.items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <label
                        key={item}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={checkedItems[item] || false}
                          onCheckedChange={() => toggleItem(item)}
                          className="mt-0.5"
                        />
                        <span
                          className={cn(
                            "text-sm",
                            checkedItems[item] && "text-muted-foreground line-through"
                          )}
                        >
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-accent/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Rocket size={16} />
            <span className="text-sm font-medium">Ready to launch?</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you've completed the essential tasks above. Head to your{" "}
            <Link href="/marketing" className="text-foreground hover:underline">Marketing</Link>{" "}
            and <Link href="/documents" className="text-foreground hover:underline">Documents</Link>{" "}
            sections to finalize your launch materials.
          </p>
        </div>
      </div>
    </div>
  );
}
