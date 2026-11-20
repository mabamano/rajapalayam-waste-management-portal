import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monthlyWasteData } from '@/data/mockData';

interface WasteChartProps {
  title?: string;
  data?: typeof monthlyWasteData;
}

export function WasteChart({ title = "Rajapalayam Waste Generation & Segregation Dynamics", data = monthlyWasteData }: WasteChartProps) {
  return (
    <Card className="w-full bg-white border border-zinc-200 rounded-none shadow-sm">
      <CardHeader className="pb-3 border-b border-zinc-100 flex flex-row items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">
            TELEMETRY // 6-MONTH DISCHARGE CURVE
          </div>
          <CardTitle className="text-base font-light tracking-tight text-zinc-950 mt-0.5">
            {title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-emerald-600" />
            Organic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-sky-600" />
            Dry Recyclable
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-none bg-rose-600" />
            Hazardous
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                {/* Minimalist matte gradients */}
                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorRecyclable" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorHazardous" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.20}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f4f4f5" strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fontFamily: 'Geist Mono', fill: '#71717a' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fontFamily: 'Geist Mono', fill: '#71717a' }}
                tickFormatter={(value) => `${value}kg`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '0px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  fontFamily: 'Geist Mono',
                  fontSize: '11px',
                  color: '#18181b',
                  padding: '8px 12px'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#09090b', marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="organic"
                name="Organic (மக்கும் கழிவு)"
                stroke="#059669"
                strokeWidth={1.75}
                fillOpacity={1}
                fill="url(#colorOrganic)"
              />
              <Area
                type="monotone"
                dataKey="recyclable"
                name="Recyclable (உலர் கழிவு)"
                stroke="#0284c7"
                strokeWidth={1.75}
                fillOpacity={1}
                fill="url(#colorRecyclable)"
              />
              <Area
                type="monotone"
                dataKey="hazardous"
                name="Hazardous (அபாயம்)"
                stroke="#e11d48"
                strokeWidth={1.75}
                fillOpacity={1}
                fill="url(#colorHazardous)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
