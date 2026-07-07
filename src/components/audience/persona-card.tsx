"use client";

import { motion } from "framer-motion";
import type { CustomerPersona } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Target, AlertCircle, ShoppingCart, Globe, Activity, MessageCircle } from "lucide-react";
import { useState } from "react";

interface PersonaCardProps {
  persona: CustomerPersona;
  index: number;
}

export function PersonaCard({ persona, index }: PersonaCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CardHeader className="cursor-pointer" onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-sm">
                  {persona.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base">{persona.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {persona.role} · {persona.age}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Target size={12} /> Goals
                  </div>
                  <ul className="space-y-1">
                    {persona.goals.map((g, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <AlertCircle size={12} /> Pain Points
                  </div>
                  <ul className="space-y-1">
                    {persona.painPoints.map((p, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <ShoppingCart size={12} /> Buying Triggers
                  </div>
                  <ul className="space-y-1">
                    {persona.buyingTriggers.map((t, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Globe size={12} /> Preferred Platforms
                  </div>
                  <ul className="space-y-1">
                    {persona.preferredPlatforms.map((p, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Activity size={12} /> Daily Workflow
                </div>
                <p className="text-sm text-muted-foreground">{persona.dailyWorkflow}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <MessageCircle size={12} /> Messaging Strategy
                </div>
                <p className="text-sm text-muted-foreground">{persona.messagingStrategy}</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
}
