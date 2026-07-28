"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Badge, Card } from "@/components/ui";
import { shipmentTypes } from "@/data/dashboard";
import { CardMenuButton } from "./CardMenuButton";

export function ShipmentTypeDonut() {
  return (
    <Card padding="lg" className="h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-primary">Shipment Type</h2>
        <CardMenuButton label="Shipment type menu" />
      </div>
      <div className="relative mx-auto mt-4 h-52 max-w-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={shipmentTypes} dataKey="value" nameKey="name" innerRadius={65} outerRadius={90} paddingAngle={2} stroke="none">
              {shipmentTypes.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-text-secondary">Total Shipment</span>
          <strong className="text-2xl text-text-primary">2,500</strong>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {shipmentTypes.map((type) => (
          <div key={type.name} className="min-w-0">
            <div className="flex items-center gap-2">
              <Badge className="bg-brand-light text-brand-primary">{type.percent}%</Badge>
              <span className="truncate text-small font-semibold text-text-primary">{type.name}</span>
            </div>
            <p className="mt-1 text-xs text-text-secondary">{type.value.toLocaleString()} shipments</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
