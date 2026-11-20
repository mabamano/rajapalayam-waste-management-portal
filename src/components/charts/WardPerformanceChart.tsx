import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWardStats } from '@/data/mockData';

interface WardPerformanceChartProps {
  title?: string;
}

export function WardPerformanceChart({ title = "Rajapalayam 42 Wards Segregation & Compliance Index" }: WardPerformanceChartProps) {
  const data = mockWardStats.map(ward => ({
    ward: `W-${ward.wardNumber.replace(/\D/g, '') || ward.wardNumber}`,
    score: ward.segregationScore,
    compliance: Math.round((ward.householdsCompliant / ward.totalHouseholds) * 100),
  }));

  return (
    <Card className="w-full bg-white border border-zinc-200 rounded-none shadow-sm">
      <CardHeader className="pb-3 border-b border-zinc-100 flex flex-row items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">
            METRIC BENCHMARK // DOORSTEP SWACHH COMPLIANCE
          </div>
          <CardTitle className="text-base font-light tracking-tight text-zinc-950 mt-0.5">
            {title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-zinc-900 rounded-none" />
            Segregation Efficiency (%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-none" />
            Household Compliance (%)
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              barGap={3}
            >
              <CartesianGrid stroke="#f4f4f5" strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="ward" 
                tick={{ fontSize: 11, fontFamily: 'Geist Mono', fill: '#71717a' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fontFamily: 'Geist Mono', fill: '#71717a' }}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
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
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name === 'score' ? 'Segregation Efficiency' : 'Household Compliance'
                ]}
              />
              <Bar 
                dataKey="score" 
                name="score"
                fill="#18181b" 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="compliance" 
                name="compliance"
                fill="#059669" 
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
