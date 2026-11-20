
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import RouteMap from '@/components/map/RouteMap';

export default function MyRoutePage() {
    // Real coordinates for Rajapalayam municipality route
    const routePoints = [
        { id: 1, address: 'Tenkasi Road (Municipal Office)', status: 'Pending', time: '06:30 AM', lat: 9.4530, lng: 77.5548 },
        { id: 2, address: 'Old Bus Stand Commercial Complex', status: 'Pending', time: '07:15 AM', lat: 9.4512, lng: 77.5580 },
        { id: 3, address: 'Cotton Market (Panju Market Yard)', status: 'Completed', time: '08:00 AM', lat: 9.4565, lng: 77.5620 },
        { id: 4, address: 'Railway Feeder Road Junction', status: 'Completed', time: '08:45 AM', lat: 9.4485, lng: 77.5615 },
        { id: 5, address: 'Mudangiar Road Micro Compost Centre', status: 'Pending', time: '09:30 AM', lat: 9.4450, lng: 77.5480 },
    ] as const;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">My Route</h1>
                        <p className="text-muted-foreground">Today's assigned collection path: Rajapalayam Division 2 (Central Zone)</p>
                    </div>
                    <Button className="gap-2">
                        <Navigation className="w-4 h-4" /> Start Navigation
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="font-semibold text-green-800 text-sm">Smart Route Active</p>
                                    <p className="text-xs text-green-600">Path optimized for fuel efficiency & bin urgency.</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-white text-green-700 border-green-300">
                                Saving 1.2L Fuel
                            </Badge>
                        </div>

                        <Card className="h-[500px] border-2 overflow-hidden">
                            <RouteMap
                                points={[...routePoints]}
                                center={[9.4530, 77.5548]}
                                zoom={14}
                            />
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Stops (5)</CardTitle>
                                <CardDescription>Estimated completion: 11:30 AM</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                                    {routePoints.map((point) => (
                                        <div key={point.id} className="relative pl-8 flex items-start gap-2">
                                            <div className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center bg-background z-10 ${point.status === 'Completed' ? 'border-primary text-primary' : 'border-muted-foreground/30 text-muted-foreground'}`}>
                                                <div className={`w-2 h-2 rounded-full ${point.status === 'Completed' ? 'bg-primary' : 'bg-transparent'}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium">{point.address}</p>
                                                <p className="text-sm text-muted-foreground">{point.time}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${point.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                    {point.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
