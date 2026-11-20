import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative p-6 rounded-none border border-zinc-200 bg-white shadow-sm transition-colors duration-200 hover:border-zinc-400 group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1 pr-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <p className="text-[11px] font-mono font-medium tracking-wider uppercase text-zinc-500">
              {title}
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-mono font-light tracking-tight text-zinc-950">
              {value}
            </p>
          </div>

          {subtitle && (
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}

          {trend && (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono pt-1 text-zinc-500">
              <span className={trend.isPositive ? "text-emerald-700 font-medium" : "text-rose-600 font-medium"}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-zinc-400">vs municipal target</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className="p-2 border border-zinc-200 bg-zinc-50 text-zinc-600 group-hover:text-zinc-950 transition-colors shrink-0">
            <Icon className="w-5 h-5 stroke-[1.5]" />
          </div>
        )}
      </div>
    </Card>
  );
}
