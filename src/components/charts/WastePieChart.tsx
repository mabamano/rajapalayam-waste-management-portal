import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WastePieChartProps {
  title?: string;
  organic?: number;
  recyclable?: number;
  hazardous?: number;
  textile?: number;
}

export function WastePieChart({ 
  title = "Municipal Stream Composition",
  organic = 55,
  recyclable = 30,
  hazardous = 5,
  textile = 10
}: WastePieChartProps) {
  const data = [
    { name: 'Organic Biodegradable', value: organic, color: '#059669', share: '55%' },
    { name: 'Dry Recyclables', value: recyclable, color: '#0284c7', share: '30%' },
    { name: 'Textile Mill Lint', value: textile, color: '#d97706', share: '10%' },
    { name: 'Domestic Hazardous', value: hazardous, color: '#e11d48', share: '5%' },
  ];

  return (
    <Card className="w-full bg-white border border-zinc-200 rounded-none shadow-sm">
      <CardHeader className="pb-3 border-b border-zinc-100">
        <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">
          DISTRIBUTION MATRIX // BY WEIGHT
        </div>
        <CardTitle className="text-base font-light tracking-tight text-zinc-950 mt-0.5">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[210px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '0px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  fontFamily: 'Geist Mono',
                  fontSize: '11px',
                  color: '#18181b',
                  padding: '6px 10px'
                }}
                formatter={(value: number) => [`${value}% share`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Minimalist Tabular Legend */}
        <div className="pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2 text-[11px] font-mono">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-1.5 bg-zinc-50 border border-zinc-100">
              <span className="flex items-center gap-1.5 text-zinc-700 truncate pr-1">
                <span className="w-2 h-2 shrink-0 rounded-none" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </span>
              <span className="font-semibold text-zinc-900 shrink-0">{item.share}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
