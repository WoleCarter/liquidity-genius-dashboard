
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type TransferStatus = "scheduled" | "completed" | "failed" | "processing";

interface TransferCardProps {
  id: string;
  from: {
    account: string;
    institution: string;
  };
  to: {
    account: string;
    institution: string;
  };
  amount: number;
  currency?: string;
  date: string;
  status: TransferStatus;
  automated?: boolean;
  confidence?: number;
  className?: string;
}

export function TransferCard({
  id,
  from,
  to,
  amount,
  currency = "USD",
  date,
  status,
  automated = false,
  confidence,
  className,
}: TransferCardProps) {
  const statusConfig = {
    scheduled: {
      icon: Clock,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
      label: "Scheduled",
    },
    completed: {
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
      label: "Completed",
    },
    failed: {
      icon: AlertCircle,
      color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
      label: "Failed",
    },
    processing: {
      icon: Clock,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
      label: "Processing",
    },
  };

  const StatusIcon = statusConfig[status].icon;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  return (
    <Card className={cn("overflow-hidden hover-scale", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">Transfer #{id}</CardTitle>
          <div className="flex items-center gap-2">
            {automated && (
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                AI Automated
              </Badge>
            )}
            <Badge variant="outline" className={cn("text-[10px]", statusConfig[status].color)}>
              {statusConfig[status].label}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-xs">{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-medium text-sm truncate">{from.account}</p>
            <p className="text-xs text-muted-foreground truncate">{from.institution}</p>
          </div>
          <div className="mx-2 flex-shrink-0">
            <ArrowRight size={16} className="text-muted-foreground" />
          </div>
          <div className="min-w-0 text-right">
            <p className="text-xs text-muted-foreground">To</p>
            <p className="font-medium text-sm truncate">{to.account}</p>
            <p className="text-xs text-muted-foreground truncate">{to.institution}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="font-bold">{formatter.format(amount)}</p>
          {confidence !== undefined && (
            <div className="text-xs">
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                {confidence}% AI confidence
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
