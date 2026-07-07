"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useStore } from "@/lib/store";
import { DocumentCard } from "@/components/documents/document-card";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

export default function DocumentsPage() {
  const documents = useStore((s) => s.documents);
  const addDocument = useStore((s) => s.addDocument);
  const addActivity = useStore((s) => s.addActivity);
  const [loading, setLoading] = useState(false);

  const generateDocuments = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));

    const newDocs = [
      { id: generateId(), title: "Executive Summary", type: "business-plan" as const, content: "Business plan content...", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), exported: false },
      { id: generateId(), title: "Pitch Deck Outline", type: "pitch-deck" as const, content: "Pitch deck content...", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), exported: false },
      { id: generateId(), title: "PRD v1", type: "prd" as const, content: "PRD content...", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), exported: false },
    ];

    newDocs.forEach((doc) => addDocument(doc));
    addActivity({
      id: generateId(),
      type: "document",
      title: "Documents generated",
      description: "Generated 3 business documents",
      timestamp: new Date().toISOString(),
    });
    toast.success("Documents generated");
    setLoading(false);
  };

  return (
    <div>
      <DashboardHeader title="Documents" description="Automatically generated business documents." />
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText size={32} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">No documents yet.</p>
            <Button onClick={generateDocuments} disabled={loading} className="gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
              Generate Documents
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <Button onClick={generateDocuments} variant="outline" size="sm" disabled={loading} className="gap-2">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Generate More
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <DocumentCard document={doc} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
