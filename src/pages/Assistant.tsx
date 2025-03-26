
import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AIChat } from "@/components/assistant/ai-chat";
import { MessageCircle } from "lucide-react";

export default function Assistant() {
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-4 px-4 h-[60px] border-b md:px-6">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
        <div className="flex-1 overflow-hidden">
          <AIChat />
        </div>
      </div>
    </DashboardLayout>
  );
}
