import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import BinMap from '@/components/map/BinMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SmartBin } from '@/types';
import { mockBins } from '@/data/mockData';
import { MapPin, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

const ThirdPartyMap = () => {
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

    const criticalBins = mockBins.filter(b => b.fillLevel >= 90);
    const warningBins = mockBins.filter(b => b.fillLevel >= 70 && b.fillLevel < 90);
    const normalBins = mockBins.filter(b => b.fillLevel < 70);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">City Waste Map (Partner View)</h1>
                    <p className="text-muted-foreground">Monitoring assigned collection zones</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-border">
                        <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Monitored Bins</p>
                                    <p className="text-2xl font-bold text-foreground">{mockBins.length}</p>
                                </div>
                                <Trash2 className="h-8 w-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    {/* Simplified stats for 3rd party */}
                </div>

                {/* Map and Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                Zone Locations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[500px]">
                                <BinMap
                                    bins={mockBins}
                                    onBinClick={setSelectedBin}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Trash2 className="h-5 w-5" />
                                Bin Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 max-h-[460px] overflow-y-auto">
                                {mockBins.map((bin) => (
                                    <div
                                        key={bin.id}
                                        className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                                        onClick={() => setSelectedBin(bin)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-foreground">#{bin.binId}</span>
                                            <Badge variant={bin.fillLevel > 90 ? "destructive" : "outline"}>
                                                {bin.fillLevel}% Full
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            <p>{bin.location.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ThirdPartyMap;
