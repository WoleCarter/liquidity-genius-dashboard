
import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-xl font-medium tracking-tight animate-fade-in">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1 animate-fade-in delay-75">
          {subtitle}
        </p>
      )}
    </div>
  );
}
