"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge, Card } from "@/components/ui";
import { profitSummary } from "@/data/dashboard";

export function ProfitSummaryChart() {
  return (
    <Card padding="lg" className="h-full w-full min-w-0 max-w-full">
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <h2 className="font-bold text-text-primary">Profit Summary</h2>
          <div className="mt-2 flex items-center gap-2">
            <strong className="text-2xl text-text-primary">$624,550</strong>
            <Badge className="bg-status-success-light text-status-success">↑ 5.62%</Badge>
          </div>
        </div>
        <select aria-label="Profit summary period" className="ml-auto rounded-control border border-border-default bg-surface-card px-2 py-1 text-small text-text-secondary">
          <option>Last 8 Months</option>
        </select>
      </div>
      <div className="mt-4 flex gap-5 text-small text-text-secondary">
        <span><i className="mr-2 inline-block size-2 rounded-full bg-brand-light" />Revenue</span>
        <span><i className="mr-2 inline-block size-2 rounded-full bg-action-dark" />Cost</span>
      </div>
      <div className="mt-2 h-64 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={profitSummary} margin={{ top: 20, right: 4, left: -14, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E0E0E0" strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#757575", fontSize: 12 }} />
            <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}K`} tick={{ fill: "#757575", fontSize: 11 }} />
            <Tooltip formatter={(value, name) => [`$${Number(value).toLocaleString()}K`, name === "revenue" ? "Revenue" : "Cost"]} />
            <Bar dataKey="revenue" fill="#C3B8FA" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" fill="#333333" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mx-auto -mt-2 flex w-fit gap-3 rounded-control bg-action-dark px-3 py-2 text-xs text-surface-card">
        <span>Revenue <strong>$87,524</strong></span><span>Cost <strong>$45,680</strong></span>
      </div>
    </Card>
  );
}
