
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccountCardProps {
  name: string;
  institution: string;
  accountNumber: string;
  balance: number;
  currency?: string;
  type: string;
  status?: "active" | "syncing" | "error";
  lastUpdated?: string;
  onClick?: () => void;
  className?: string;
}

export function AccountCard({
  name,
  institution,
  accountNumber,
  balance,
  currency = "USD",
  type,
  status = "active",
  lastUpdated,
  onClick,
  className,
}: AccountCardProps) {
  const statusLabels = {
    active: "Active",
    syncing: "Syncing",
    error: "Error",
  };

  const statusColors = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    syncing: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    error: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md", 
        onClick && "cursor-pointer hover-scale", 
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <CardDescription className="text-xs mt-1">
              {institution} • {accountNumber.replace(/\d(?=\d{4})/g, "*")}
            </CardDescription>
          </div>
          <Badge variant="outline" className={cn("text-[10px] font-medium", statusColors[status])}>
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-muted-foreground">{type}</p>
            <p className="text-2xl font-semibold mt-1">
              {formatter.format(balance)}
            </p>
          </div>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Updated: {lastUpdated}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
