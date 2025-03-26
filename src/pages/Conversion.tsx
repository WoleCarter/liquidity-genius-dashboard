
import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CurrencyConverter } from "@/components/conversion/currency-converter";
import { DollarSign } from "lucide-react";

export default function Conversion() {
  return (
    <DashboardLayout>
      <div className="container py-6 md:py-8 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">Currency Conversion</h1>
        </div>
        <CurrencyConverter />
      </div>
    </DashboardLayout>
  );
}
