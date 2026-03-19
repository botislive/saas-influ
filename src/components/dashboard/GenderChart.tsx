"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const data = [
  { name: "Female", value: 70, color: "var(--color-accent-primary)" },
  { name: "Male", value: 30, color: "var(--color-accent-secondary)" },
];

export function GenderChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-text-primary">Followers by Gender</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex flex-col items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                cornerRadius={10}
                paddingAngle={5}
                dataKey="value"
                animationBegin={500}
                stroke="none"
              >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              itemStyle={{ color: "#0F172A" }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-sm font-medium text-text-secondary">Female</p>
          <p className="text-2xl font-bold text-text-primary">70%</p>
        </div>

        {/* Custom Legend */}
        <div className="flex gap-6 mt-4 w-full justify-center">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-text-secondary font-medium">{entry.value}% {entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
