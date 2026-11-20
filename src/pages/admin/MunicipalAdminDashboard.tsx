import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { WardPerformanceChart } from '@/components/charts/WardPerformanceChart';
import { cityStats, mockBins } from '@/data/mockData';
import {
    Trash2, AlertTriangle, MapPin, CheckCircle, TrendingUp, Users, Truck, Calendar,
    Sparkles, ShieldCheck, Activity, Bell, FileDown, Radio, Flame, Zap, Leaf
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WasteHeatmap from '@/components/admin/WasteHeatmap';
import { OfficerAIAssistant } from '@/components/officer/OfficerAIAssistant';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';
import { MunicipalAdmin, SmartBin } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function MunicipalAdminDashboard() {
    const { user } = useAuth();
    const admin = user as MunicipalAdmin;
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);
    const { toast } = useToast();

    const criticalBins = mockBins.filter(b => b.fillLevel >= 85);

    const handleBroadcastAlert = () => {
        toast({
            title: "Ward Advisory Broadcasted",
            description: "Advisory sent to all 42 Wards & 128 Collection Vehicles: 'Maintain 4-bin source segregation.'",
        });
    };

    const handleSurgeProtocol = () => {
        toast({
            title: "Surge Protocol Activated",
            description: "Surge contingency active: Dispatched 4 standby tippers to Ayyanar Kovil & Mudangiar corridor.",
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Mission Control Top Bar */}
                <div className="relative overflow-hidden rounded-none p-6 bg-white border border-zinc-200 shadow-sm">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-700" />
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-700"></span>
                                </span>
                                <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                                    RAJAPALAYAM MUNICIPAL COMMAND CENTER // ACTIVE
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-950">
                                {admin?.municipality || 'Rajapalayam Municipality'} Command Hub
                            </h1>
                            <p className="text-sm text-zinc-600 mt-1">
                                Executive Commissioner: <strong className="text-zinc-950">{admin?.name || 'Dr. K. Ravichandran'}</strong> • 42 Wards • 9 Sanitary Divisions
                            </p>
                        </div>

                        {/* Top Action Command Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                onClick={handleBroadcastAlert}
                                variant="outline"
                                className="h-10 rounded-none border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-mono font-medium"
                            >
                                <Radio className="w-3.5 h-3.5 mr-2 text-zinc-600" /> Broadcast Advisory
                            </Button>
                            <Button
                                onClick={handleSurgeProtocol}
                                className="h-10 rounded-none bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-wider font-medium shadow-sm"
                            >
                                <Zap className="w-3.5 h-3.5 mr-1.5 fill-white" /> Mobilize Surge Unit
                            </Button>
                        </div>
                    </div>

                    {/* Live Telemetry Micro-Bar */}
                    <div className="mt-6 pt-4 border-t border-zinc-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-zinc-600">
                        <div>
                            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">SYSTEM STATUS</span>
                            <span className="text-emerald-800 font-semibold">100% OPERATIONAL</span>
                        </div>
                        <div>
                            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">WEATHER CORRIDOR</span>
                            <span className="text-zinc-950 font-medium">29°C • Partly Cloudy</span>
                        </div>
                        <div>
                            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">AIR QUALITY INDEX</span>
                            <span className="text-sky-800 font-semibold">42 AQI (Clean)</span>
                        </div>
                        <div>
                            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">SURGE ALERT STATUS</span>
                            <span className="text-purple-800 font-semibold">ELEVATED (Panguni)</span>
                        </div>
                    </div>
                </div>

                {/* Primary Metric StatCards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Daily MSW Influx"
                        value={`${(cityStats.totalWasteToday / 1000).toFixed(1)} tons`}
                        subtitle="48.5 TPD Municipal MSW Intake"
                        icon={Trash2}
                        variant="primary"
                        trend={{ value: 4.2, isPositive: true }}
                    />
                    <StatCard
                        title="Segregation Index"
                        value={`${cityStats.segregationScore}%`}
                        subtitle="City-wide Doorstep Compliance"
                        icon={TrendingUp}
                        variant="success"
                        trend={{ value: 6.1, isPositive: true }}
                    />
                    <StatCard
                        title="Active Taskforce"
                        value={`${cityStats.activeCollectors} Units`}
                        subtitle="Across 9 Sanitary Divisions"
                        icon={Truck}
                        variant="warning"
                    />
                    <StatCard
                        title="Arasiarpatti Composting"
                        value="20.37 Ac"
                        subtitle="Central Bio-Processing Ground"
                        icon={Leaf}
                        variant="secondary"
                    />
                </div>

                {/* Festival Alert Banner */}
                <Card className="rounded-none border-l-4 border-l-purple-700 bg-white border border-zinc-200 p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-50 text-purple-800 border border-purple-200">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-zinc-950 text-base">Panguni Pongal & Ayyanar Kovil Surge Protocol</h3>
                                    <Badge className="bg-purple-50 text-purple-800 border-purple-200 text-[10px] font-mono">
                                        PREDICTED SURGE: +28%
                                    </Badge>
                                </div>
                                <p className="text-xs text-zinc-600 mt-1">
                                    High organic and packaging waste expected across temple corridors. Standby MCC processing pits prepared.
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 text-xs font-mono border-zinc-300 hover:bg-zinc-100 text-zinc-800 rounded-none shrink-0"
                            onClick={async () => {
                                const { PredictionService } = await import('@/services/predictionService');
                                const prediction = PredictionService.predictSurge();
                                if (prediction.festival) {
                                    PredictionService.createCalendarAlert(prediction.festival);
                                }
                                toast({
                                    title: "Calendar Alert Synced",
                                    description: "Surge protocol alert added to Google Calendar.",
                                });
                            }}
                        >
                            Sync Calendar Surge Protocol
                        </Button>
                    </div>
                </Card>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <WasteChart title="Rajapalayam 42-Ward Waste Flow Trends" />
                    </div>
                    <WastePieChart title="Waste Category Breakdown (Organic / Dry / Bio)" />
                </div>

                {/* Ward Performance Analysis */}
                <WardPerformanceChart />

                {/* Map & Officer AI Copilot Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <WasteHeatmap />
                    <OfficerAIAssistant />
                </div>

                {/* Live Municipal Incident Log Ticker */}
                <Card className="rounded-none border border-zinc-200 bg-white shadow-sm">
                    <CardHeader className="pb-3 border-b border-zinc-100">
                        <CardTitle className="flex items-center justify-between text-base font-light tracking-tight text-zinc-950">
                            <span className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-emerald-700 animate-pulse" />
                                Live Municipal Activity Stream (Rajapalayam Wards)
                            </span>
                            <Badge variant="outline" className="text-[10px] font-mono text-emerald-800 border-emerald-200 bg-emerald-50">
                                AUTO-REFRESH: 5s
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-2 font-mono text-xs">
                            {[
                                { time: '11:48 AM', ward: 'Ward 08', note: 'Bin RAJ-BIN-001 (Gandhi Kalai Mandram) cleared by Vehicle TN-67-M-4421', status: 'COMPLETED', color: 'text-emerald-700 font-semibold' },
                                { time: '11:35 AM', ward: 'Ward 12', note: 'Mudangiar Road MCC batch #42 completed curing - 1.2 Tons manure bagged', status: 'COMPOSTED', color: 'text-teal-700 font-semibold' },
                                { time: '11:20 AM', ward: 'Ward 24', note: 'Cotton Market MRF dry plastic bales dispatched to authorized polymer unit', status: 'RECYCLED', color: 'text-sky-700 font-semibold' },
                                { time: '11:05 AM', ward: 'Ward 05', note: 'Old Bus Stand commercial pickup completed with 100% QR verification', status: 'VERIFIED', color: 'text-indigo-700 font-semibold' },
                                { time: '10:50 AM', ward: 'Ward 42', note: 'Arasiarpatti Municipal Compost Yard weighbridge registered 24.2 tons incoming', status: 'LOGGED', color: 'text-purple-700 font-semibold' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start justify-between p-3 bg-zinc-50 border border-zinc-100 hover:bg-zinc-100/70 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-zinc-400">{item.time}</span>
                                        <Badge variant="outline" className="border-zinc-200 text-zinc-700 text-[10px] bg-white">
                                            {item.ward}
                                        </Badge>
                                        <span className="text-zinc-800">{item.note}</span>
                                    </div>
                                    <span className={`${item.color} shrink-0`}>[{item.status}]</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <SmartBinChatbot
                userRole="ADMIN"
                userUid={admin?.id}
                contextData={{ cityStats, mockBins, selectedBin }}
            />
        </DashboardLayout>
    );
}
