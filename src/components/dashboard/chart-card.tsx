
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ChartType = "line" | "bar" | "area";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  type?: ChartType;
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  color?: string;
  className?: string;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  strokeWidth?: number;
  gradientColor?: string;
}

export function ChartCard({
  title,
  subtitle,
  data,
  type = "line",
  dataKey,
  xAxisKey = "name",
  height = 300,
  color = "hsl(var(--primary))",
  className,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  strokeWidth = 2,
  gradientColor,
}: ChartCardProps) {
  const id = React.useId();
  
  return (
    <Card className={cn("overflow-hidden hover-scale", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(
              type,
              data,
              dataKey,
              xAxisKey,
              color,
              showGrid,
              showXAxis,
              showYAxis,
              strokeWidth,
              gradientColor,
              id
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function renderChart(
  type: ChartType,
  data: any[],
  dataKey: string,
  xAxisKey: string,
  color: string,
  showGrid: boolean,
  showXAxis: boolean,
  showYAxis: boolean,
  strokeWidth: number,
  gradientColor?: string,
  id?: string
) {
  const gradientId = `gradient-${id}`;
  
  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: 10, bottom: 10 },
  };
  
  const commonAxis = (
    <>
      {showXAxis && (
        <XAxis
          dataKey={xAxisKey}
          stroke="hsl(var(--muted-foreground))"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          minTickGap={5}
        />
      )}
      {showYAxis && (
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          padding={{ top: 10, bottom: 10 }}
          width={30}
        />
      )}
      {showGrid && (
        <CartesianGrid
          stroke="hsl(var(--border))"
          strokeDasharray="5 5"
          vertical={false}
        />
      )}
      <Tooltip
        contentStyle={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "var(--radius)",
          fontSize: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
        cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "5 5" }}
      />
    </>
  );
  
  switch (type) {
    case "bar":
      return (
        <BarChart {...commonProps}>
          {commonAxis}
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    case "area":
      return (
        <AreaChart {...commonProps}>
          {gradientColor && (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={gradientColor || color} stopOpacity={0} />
              </linearGradient>
            </defs>
          )}
          {commonAxis}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={strokeWidth}
            fill={gradientColor ? `url(#${gradientId})` : color}
            fillOpacity={gradientColor ? 1 : 0.2}
          />
        </AreaChart>
      );
    case "line":
    default:
      return (
        <LineChart {...commonProps}>
          {commonAxis}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={false}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      );
  }
}
