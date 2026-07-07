"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ValidationRadar } from "@/components/validation/validation-radar";

export default function ValidationPage() {
  return (
    <div>
      <DashboardHeader
        title="Validation"
        description="AI-powered idea validation and scoring."
      />
      <div className="mx-auto max-w-4xl p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ValidationRadar />
        </motion.div>
      </div>
    </div>
  );
}
