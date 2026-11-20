import React, { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Circle, Marker } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartBin } from '@/types';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 9.4532, // Rajapalayam Town Center (Gandhi Kalai Mandram / Municipal Office)
    lng: 77.5550
};

const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
};

// 9 Sanitary Divisions & 42 Wards of Rajapalayam Municipality
const CORPORATIONS = [
    'Division 1 (Old Bus Stand)',
    'Division 2 (Tenkasi Road)',
    'Division 3 (PACR Salai)',
    'Division 4 (Railway Feeder)',
    'Division 5 (Mudangiar)',
    'Division 6 (Cotton Market)',
    'Division 7 (Malaiyadigavur)',
    'Division 8 (Srivilliputtur Rd)',
    'Division 9 (Samusigapuram Rd)'
];
const ZONES = ['Zone 1 (North)', 'Zone 2 (Central)', 'Zone 3 (South)', 'Zone 4 (East)', 'Zone 5 (West)'];
const WARDS = Array.from({ length: 42 }, (_, i) => `Ward ${i + 1}`);

// Mock Bins Generation
const generateMockBins = (count: number, baseLat: number, baseLng: number): SmartBin[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `bin-${i}`,
        binId: `RAJ-BIN-${1000 + i}`,
        wardNumber: 'Ward ' + (i % 42 + 1),
        location: {
            lat: baseLat + (Math.random() - 0.5) * 0.04,
            lng: baseLng + (Math.random() - 0.5) * 0.04,
            address: `Street ${(i % 12) + 1}, Rajapalayam`
        },
        fillLevel: Math.floor(Math.random() * 100),
        wasteType: Math.random() > 0.5 ? 'organic' : 'mixed',
        lastUpdated: new Date(),
        status: 'active'
    }));
};

const WasteHeatmap = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    const [selectedCorp, setSelectedCorp] = useState(CORPORATIONS[0]);
    const [selectedZone, setSelectedZone] = useState(ZONES[0]);
    const [selectedWard, setSelectedWard] = useState<string>('All');

    // Mock data for the heatmap
    const bins = useMemo(() => generateMockBins(50, center.lat, center.lng), []);

    const filteredBins = useMemo(() => {
        if (selectedWard === 'All') return bins;
        return bins.filter(b => b.wardNumber === selectedWard);
    }, [bins, selectedWard]);

    const getBinColor = (level: number) => {
        if (level > 90) return '#EF4444'; // Red - Critical
        if (level > 70) return '#F97316'; // Orange - High
        if (level > 50) return '#EAB308'; // Yellow - Medium
        return '#22C55E'; // Green - Low
    };

    if (!isLoaded) return <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 rounded-lg">Loading Maps...</div>;

    return (
        <Card className="w-full shadow-lg border-t-4 border-t-primary">
            <CardHeader>
                <CardTitle className="flex justify-between items-center flex-wrap gap-4">
                    <span>Ward-Level Waste Heatmap</span>
                    <div className="flex gap-2">
                        <select
                            className="p-2 border rounded-md text-sm bg-background"
                            value={selectedCorp}
                            onChange={(e) => setSelectedCorp(e.target.value)}
                        >
                            {CORPORATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                            className="p-2 border rounded-md text-sm bg-background"
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                        >
                            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                        <select
                            className="p-2 border rounded-md text-sm bg-background"
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                        >
                            <option value="All">All Wards</option>
                            {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-xl overflow-hidden border border-border">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                        options={mapOptions}
                    >
                        {filteredBins.map(bin => (
                            <React.Fragment key={bin.id}>
                                <Circle
                                    center={{ lat: bin.location.lat, lng: bin.location.lng }}
                                    radius={150}
                                    options={{
                                        strokeColor: getBinColor(bin.fillLevel),
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: getBinColor(bin.fillLevel),
                                        fillOpacity: 0.35,
                                    }}
                                />
                                <Marker
                                    position={{ lat: bin.location.lat, lng: bin.location.lng }}
                                    title={`Bin: ${bin.binId} - ${bin.fillLevel}%`}
                                />
                            </React.Fragment>
                        ))}
                    </GoogleMap>
                </div>
                <div className="mt-4 flex gap-4 text-sm justify-center">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Low (&lt;50%)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Medium (50-70%)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> High (70-90%)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical (&gt;90%)</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WasteHeatmap;
