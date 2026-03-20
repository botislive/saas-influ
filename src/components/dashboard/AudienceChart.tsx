"use client";

import React, { useEffect, useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const data = [
  { day: "Sat", value: 1200 },
  { day: "Sun", value: 2100 },
  { day: "Mon", value: 1800 },
  { day: "Tue", value: 2400 },
  { day: "Wed", value: 2000 },
  { day: "Thu", value: 3100 },
  { day: "Fri", value: 2800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-elevated border border-black/10 p-3 rounded-xl shadow-level-2 backdrop-blur-md">
        <p className="text-xs font-semibold text-text-secondary uppercase mb-1">{label}</p>
        <p className="text-lg font-mono font-bold text-accent-primary">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function AudienceChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-text-primary">Audience History</CardTitle>
        <select className="bg-surface-interactive/50 border border-black/5 rounded-lg px-2 py-1 text-xs text-text-secondary outline-none focus:border-accent-primary/40">
          <option>Facebook</option>
          <option>Instagram</option>
          <option>YouTube</option>
        </select>
      </CardHeader>
      <CardContent className="h-[350px] w-full mt-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-accent-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-accent-primary)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full" />
        )}
      </CardContent>
    </Card>
  );
}
