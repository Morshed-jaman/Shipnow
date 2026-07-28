"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge, Card } from "@/components/ui";
import { shipmentStatistics } from "@/data/dashboard";

export function ShipmentStatisticChart() {
  return (
    <Card padding="lg" className="h-full">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-bold text-text-primary">Shipment Statistic</h2>
        <Badge className="bg-status-success-light text-status-success">+8.7%</Badge>
        <select aria-label="Shipment statistic period" className="ml-auto rounded-control border border-border-default bg-surface-card px-2 py-1 text-small text-text-secondary">
          <option>Last Year</option>
        </select>
      </div>
      <p className="mt-4 text-3xl font-bold text-text-primary">4,352</p>
      <div className="mt-4 h-64 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={shipmentStatistics} margin={{ top: 20, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="shipment-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#856DF3" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#856DF3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E0E0E0" strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#757575", fontSize: 12 }} />
            <YAxis domain={[0, 4800]} ticks={[0, 1200, 2400, 3600, 4800]} axisLine={false} tickLine={false} tickFormatter={(value) => value === 0 ? "0K" : `${value / 1000}K`} tick={{ fill: "#757575", fontSize: 11 }} />
            <Tooltip formatter={(value) => [Number(value).toLocaleString(), "Shipments"]} labelFormatter={(label) => `${label} 2030`} />
            <Area type="stepAfter" dataKey="value" stroke="#856DF3" strokeWidth={3} fill="url(#shipment-fill)" activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mx-auto -mt-2 w-fit rounded-control bg-action-dark px-3 py-2 text-xs text-surface-card">
        May 2030 <strong className="ml-2">3,124</strong>
      </p>
    </Card>
  );
}
