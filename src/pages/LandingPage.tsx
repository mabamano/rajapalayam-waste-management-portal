import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight, ArrowUpRight, CheckCircle2, Leaf, Recycle, AlertTriangle,
    Building2, MapPin, Truck, Cpu, Clock, Sliders, ShieldCheck, Sparkles, Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';

export default function LandingPage() {
    const { language, setLanguage } = useLanguage();
    const { loginMunicipalAdmin, loginCollector, loginHousehold, loginOfficer } = useAuth();
    const navigate = useNavigate();

    // Time ticker for header
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Interactive AI Vision Scanner Simulator State
    const [selectedSample, setSelectedSample] = useState<'organic' | 'plastic' | 'hazardous' | 'textile'>('organic');
    const [isScanning, setIsScanning] = useState(false);

    const wasteSamples = {
        organic: {
            code: '01',
            title: 'Banana Peels & Kitchen Waste',
            tamilTitle: 'வாழைப்பழத் தோல் & சமையலறை கழிவு',
            category: 'Organic Biodegradable (மக்கும் கழிவு)',
            binType: 'Green Bin (பச்சை நிற தொட்டி)',
            destination: 'Mudangiar Road Micro Composting Centre (MCC)',
            confidence: 98.7,
            points: 15,
            advice: 'Converted to nutrient-rich bio-compost for local cotton & paddy farmers in Rajapalayam.',
            composition: 'Moisture: 72% · Organic Carbon: 34% · C/N Ratio: 24:1'
        },
        plastic: {
            code: '02',
            title: 'PET Water Bottle & Packaging Film',
            tamilTitle: 'பிளாஸ்டிக் பாட்டில் & பாலிமர் உறை',
            category: 'Dry Recyclable (மறுசுழற்சி உலர் கழிவு)',
            binType: 'Blue Bin (நீல நிற தொட்டி)',
            destination: 'Cotton Market Resource Recovery Centre (MRF)',
            confidence: 96.4,
            points: 20,
            advice: 'Sorted, baled at MRF, and dispatched to authorized polymer recycling converters.',
            composition: 'Polyethylene Terephthalate · Recyclability: Grade-1'
        },
        hazardous: {
            code: '03',
            title: 'Lithium Cells & Chemical Packaging',
            tamilTitle: 'பழைய பேட்டரி & ரசாயன பாட்டில்',
            category: 'Domestic Hazardous (அபாயகரமான கழிவு)',
            binType: 'Red / Black Bin (சிவப்பு தொட்டி)',
            destination: 'Safe Storage Unit -> TSDF Authorized Facility',
            confidence: 94.2,
            points: 25,
            advice: 'Isolated from standard MSW to prevent heavy metal leaching into the Rajapalayam aquifer.',
            composition: 'Corrosive / Heavy Metal Compounds · Class-B Hazardous'
        },
        textile: {
            code: '04',
            title: 'Cotton Mill Burlap & Yarn Waste',
            tamilTitle: 'பஞ்சு ஆலை நூல் & துணி கழிவு',
            category: 'Industrial Textile Byproduct',
            binType: 'Yellow Sacks (மஞ்சள் சாக்கு)',
            destination: 'PACR Industrial Byproduct Aggregator',
            confidence: 92.5,
            points: 30,
            advice: 'Aggregated from Rajapalayam spinning mills, shredded, and repurposed into spun yarn cores.',
            composition: 'Natural Cotton Fiber · High Tensile Byproduct'
        }
    };

    const triggerScan = (type: 'organic' | 'plastic' | 'hazardous' | 'textile') => {
        setSelectedSample(type);
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
        }, 500);
    };

    // Citizen Rebate Calculator State
    const [wasteKg, setWasteKg] = useState<number>(2.5);
    const calculatedPoints = Math.round(wasteKg * 30 * 10);
    const estimatedTaxRebate = Math.round(wasteKg * 365 * 0.8);
    const manureFreeKg = Math.round(wasteKg * 30 * 0.35);

    // Instant Quick Login Helper for Evaluators / Demos
    const handleQuickLogin = async (role: 'commissioner' | 'collector' | 'household' | 'officer') => {
        if (role === 'commissioner') {
            await loginMunicipalAdmin('MUN001', 'admin');
            navigate('/municipal-admin');
        } else if (role === 'collector') {
            await loginCollector('COL001', 'collector123');
            navigate('/collector');
        } else if (role === 'household') {
            await loginHousehold('W08', 'S02', 'H012', '1234');
            navigate('/household');
        } else if (role === 'officer') {
            await loginOfficer('OFF001', 'admin123');
            navigate('/officer');
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900 antialiased">
            {/* Top Telemetry Header Bar */}
            <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-2.5 text-xs font-mono text-zinc-600">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span className="text-zinc-900 uppercase tracking-widest text-[11px] font-semibold">
                            RAJAPALAYAM TELEMETRY LIVE
                        </span>
                        <span className="text-zinc-300 hidden sm:inline">|</span>
                        <span className="text-zinc-500 hidden sm:inline text-[11px]">
                            VIRUDHUNAGAR DISTRICT, TAMIL NADU
                        </span>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 text-[11px] text-zinc-600">
                        <span>INFLUX: <strong className="text-zinc-950 font-medium">48.5 TPD</strong></span>
                        <span>FLEET: <strong className="text-zinc-950 font-medium">128 VEHICLES</strong></span>
                        <span>MCC COMPOST: <strong className="text-zinc-950 font-medium">26.8 TPD</strong></span>
                        <span>ARASIARPATTI: <strong className="text-zinc-950 font-medium">20.37 ACRES</strong></span>
                        <span>MODEL: <strong className="text-emerald-700 font-medium">GEMINI 2.5 FLASH</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{currentTime} IST</span>
                    </div>
                </div>
            </div>

            {/* Navigation Header */}
            <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-zinc-950" />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs uppercase tracking-wider text-zinc-950 font-semibold">
                                    Rajapalayam Municipality
                                </span>
                                <span className="text-zinc-400">/</span>
                                <span className="text-[11px] font-mono text-zinc-500 font-medium">
                                    Solid Waste Intelligence
                                </span>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-mono hidden md:block">
                                ராஜபாளையம் நகராட்சி திடக்கழிவு மேலாண்மை அமைப்பு
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="flex items-center border border-zinc-200 bg-white text-xs font-mono">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-2.5 py-1 transition-colors ${language === 'en' ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-600 hover:text-zinc-950'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('ta')}
                                className={`px-2.5 py-1 transition-colors ${language === 'ta' ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-600 hover:text-zinc-950'}`}
                            >
                                தமிழ்
                            </button>
                        </div>

                        <Link to="/login">
                            <Button
                                className="h-9 px-4 rounded-none bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2"
                            >
                                <span>Role Portals</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-[1400px] mx-auto px-6 py-12 lg:py-16 w-full space-y-20">
                {/* Hero Section: Asymmetric Architectural Split */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column (Editorial Headline & Narrative) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span>Special Grade Municipality · Virudhunagar District</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.05] text-zinc-950">
                            Autonomous Solid Waste Intelligence & Resource Recovery
                        </h1>

                        <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-[62ch]">
                            Rajapalayam Municipality’s unified solid waste management architecture. Deploys multi-modal Gemini 2.5 Flash for doorstep segregation verification, IoT smart bin tracking across 42 administrative wards, decentralized composting at Mudangiar Road MCC, and automated citizen property tax rebate distribution.
                        </p>

                        {/* Primary Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Link to="/login">
                                <Button
                                    className="h-11 px-6 rounded-none bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2"
                                >
                                    <span>Access Role Portals (9 Roles)</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>

                            <Button
                                variant="outline"
                                onClick={() => handleQuickLogin('commissioner')}
                                className="h-11 px-5 rounded-none border-zinc-300 text-zinc-900 hover:text-zinc-950 hover:bg-zinc-100 bg-white font-mono text-xs uppercase tracking-wider transition-colors"
                            >
                                <Building2 className="w-3.5 h-3.5 mr-2 text-zinc-600" />
                                <span>Commissioner Overwatch</span>
                            </Button>
                        </div>

                        {/* Monospace Quick Role Jumper */}
                        <div className="pt-3 border-t border-zinc-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-zinc-500">
                            <span className="text-zinc-500 uppercase tracking-wider text-[11px]">Instant Access:</span>
                            <button
                                onClick={() => handleQuickLogin('officer')}
                                className="text-zinc-700 hover:text-zinc-950 transition-colors underline underline-offset-4 decoration-zinc-300"
                            >
                                [ 01 Sanitary Inspector ]
                            </button>
                            <button
                                onClick={() => handleQuickLogin('collector')}
                                className="text-zinc-700 hover:text-zinc-950 transition-colors underline underline-offset-4 decoration-zinc-300"
                            >
                                [ 02 Waste Collector ]
                            </button>
                            <button
                                onClick={() => handleQuickLogin('household')}
                                className="text-zinc-700 hover:text-zinc-950 transition-colors underline underline-offset-4 decoration-zinc-300"
                            >
                                [ 03 Resident Household ]
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Architectural Municipal Ledger */}
                    <div className="lg:col-span-5 border border-zinc-200 bg-white shadow-sm">
                        <div className="p-4 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-700 uppercase tracking-widest font-semibold">
                                Municipal Specification Ledger
                            </span>
                            <span className="text-emerald-700 font-medium">AUTONOMOUS // RUNNING</span>
                        </div>

                        <div className="divide-y divide-zinc-100 text-xs font-mono">
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Local Authority:</span>
                                <span className="text-zinc-900 font-medium">Rajapalayam Municipality</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">District / State:</span>
                                <span className="text-zinc-900 font-medium">Virudhunagar / Tamil Nadu</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Administrative Units:</span>
                                <span className="text-zinc-900 font-medium">42 Wards · 9 Sanitary Divisions</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Doorstep Assessments:</span>
                                <span className="text-zinc-900 font-medium">47,497 Assessment Units</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Daily MSW Generation:</span>
                                <span className="text-zinc-900 font-medium">48.5 TPD (100% Cleared)</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Micro Composting (MCC):</span>
                                <span className="text-zinc-900 font-medium">26.8 TPD Organic Manure</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Central Yard Facility:</span>
                                <span className="text-zinc-900 font-medium">20.37 Acres at Arasiarpatti</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Fleet Allocation:</span>
                                <span className="text-zinc-900 font-medium">128 Tippers & Compactor Trucks</span>
                            </div>
                            <div className="p-3.5 flex items-center justify-between">
                                <span className="text-zinc-500">Vision Model Pipeline:</span>
                                <span className="text-emerald-700 font-semibold">Google Gemini 2.5 Flash</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Continuous Metric Band (Anti-Card Overuse) */}
                <section className="border-y border-zinc-200 bg-white py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-1">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
                                Daily Municipal Influx
                            </span>
                            <div className="text-3xl sm:text-4xl font-mono font-light text-zinc-950">
                                48.5 TPD
                            </div>
                            <p className="text-xs text-zinc-500 font-sans">
                                100% daily doorstep collection across 42 wards
                            </p>
                        </div>

                        <div className="space-y-1">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
                                Property Assessments
                            </span>
                            <div className="text-3xl sm:text-4xl font-mono font-light text-zinc-950">
                                47,497
                            </div>
                            <p className="text-xs text-zinc-500 font-sans">
                                Residential, commercial & textile mills
                            </p>
                        </div>

                        <div className="space-y-1">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
                                Decentralized Compost
                            </span>
                            <div className="text-3xl sm:text-4xl font-mono font-light text-zinc-950">
                                26.8 TPD
                            </div>
                            <p className="text-xs text-zinc-500 font-sans">
                                Processed at Mudangiar Road MCC for farmers
                            </p>
                        </div>

                        <div className="space-y-1">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block">
                                Arasiarpatti Yard Extent
                            </span>
                            <div className="text-3xl sm:text-4xl font-mono font-light text-zinc-950">
                                20.37 AC
                            </div>
                            <p className="text-xs text-zinc-500 font-sans">
                                Central municipal compost & biomining plant
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 01: Multi-Modal Gemini 2.5 Flash Classifier (Specimen Ledger) */}
                <section className="space-y-8">
                    <div className="border-b border-zinc-200 pb-4">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 font-medium">
                            01 // MULTI-MODAL VISION INSPECTION
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-950 mt-1">
                            Gemini 2.5 Flash Contamination Audit Pipeline
                        </h2>
                        <p className="text-sm text-zinc-600 max-w-[70ch] mt-2 font-normal">
                            Test the live multimodal classifier against standardized municipal waste archetypes. Inspect classification confidence, prescribed color bin codes, and automated destination routing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Specimen Selection Table */}
                        <div className="lg:col-span-5 border border-zinc-200 divide-y divide-zinc-200 bg-white shadow-sm">
                            <div className="p-3 text-[11px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50/70">
                                Select Specimen Docket:
                            </div>
                            {(Object.keys(wasteSamples) as Array<keyof typeof wasteSamples>).map((key) => {
                                const sample = wasteSamples[key];
                                const isSelected = selectedSample === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => triggerScan(key)}
                                        className={`w-full text-left p-4 transition-colors flex items-center justify-between font-mono ${isSelected
                                            ? 'bg-zinc-100/90 text-zinc-950 border-l-2 border-emerald-600 font-medium'
                                            : 'hover:bg-zinc-50 text-zinc-600'
                                            }`}
                                    >
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-zinc-400 text-xs">{sample.code}</span>
                                                <span className="text-xs font-sans font-medium text-zinc-900">
                                                    {sample.title}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-zinc-500 pl-6">{sample.tamilTitle}</p>
                                        </div>
                                        <span className="text-xs text-zinc-500 font-mono">+{sample.points} pts</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Technical Inspection Readout */}
                        <div className="lg:col-span-7 border border-zinc-200 bg-white p-6 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 text-xs font-mono">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-amber-500 animate-ping' : 'bg-emerald-600'}`} />
                                    <span className="text-zinc-800 uppercase tracking-widest font-semibold">
                                        INFERENCE DOCKET // GEMINI 2.5 FLASH
                                    </span>
                                </div>
                                <span className="text-zinc-500">
                                    CONFIDENCE: <strong className="text-zinc-950 font-medium">{wasteSamples[selectedSample].confidence}%</strong>
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 border border-zinc-200 bg-zinc-50/70">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                        Classified Stream & Regulatory Category
                                    </span>
                                    <h3 className="text-lg font-normal text-zinc-950 mt-1 font-sans">
                                        {wasteSamples[selectedSample].category}
                                    </h3>
                                    <p className="text-xs font-mono text-zinc-500 mt-1">
                                        {wasteSamples[selectedSample].composition}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                                    <div className="p-3 border border-zinc-200 bg-white">
                                        <span className="text-zinc-500 uppercase block text-[10px] tracking-wider">Prescribed Bin:</span>
                                        <span className="text-zinc-900 mt-1 block font-medium">
                                            {wasteSamples[selectedSample].binType}
                                        </span>
                                    </div>
                                    <div className="p-3 border border-zinc-200 bg-white">
                                        <span className="text-zinc-500 uppercase block text-[10px] tracking-wider">Processing Node:</span>
                                        <span className="text-emerald-700 mt-1 block font-semibold">
                                            {wasteSamples[selectedSample].destination}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-700 font-sans leading-relaxed">
                                    <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">
                                        Municipal Circular Economy Impact:
                                    </span>
                                    {wasteSamples[selectedSample].advice}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 02: Citizen Property Tax Rebate Ledger */}
                <section className="space-y-8">
                    <div className="border-b border-zinc-200 pb-4">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 font-medium">
                            02 // FISCAL INCENTIVE ARCHITECTURE
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-950 mt-1">
                            Household Property Tax Credit Calculator
                        </h2>
                        <p className="text-sm text-zinc-600 max-w-[70ch] mt-2 font-normal">
                            Rajapalayam Municipality bylaws credit households practicing 100% source segregation directly against annual property taxes or redeemable for free organic compost.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 border border-zinc-200 p-6 bg-white shadow-sm space-y-5">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <label className="text-zinc-600 uppercase tracking-wider font-medium">
                                    Daily Segregated Waste (kg/day):
                                </label>
                                <span className="text-lg font-mono font-medium text-zinc-950">{wasteKg} kg</span>
                            </div>

                            <input
                                type="range"
                                min="0.5"
                                max="5.0"
                                step="0.5"
                                value={wasteKg}
                                onChange={(e) => setWasteKg(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-zinc-200 appearance-none cursor-pointer accent-zinc-900"
                            />

                            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                                <span>0.5 kg (Small)</span>
                                <span>2.5 kg (Standard)</span>
                                <span>5.0 kg (Joint)</span>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 shadow-sm">
                            <div className="bg-white p-6 space-y-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                                    Annual Tax Rebate
                                </span>
                                <div className="text-3xl font-mono font-light text-zinc-950">
                                    ₹{estimatedTaxRebate}
                                </div>
                                <p className="text-xs text-zinc-500 font-sans">
                                    Deducted from annual property tax assessment
                                </p>
                            </div>

                            <div className="bg-white p-6 space-y-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                                    Monthly Green Points
                                </span>
                                <div className="text-3xl font-mono font-light text-zinc-950">
                                    {calculatedPoints}
                                </div>
                                <p className="text-xs text-zinc-500 font-sans">
                                    Redeemable at municipal utility counters
                                </p>
                            </div>

                            <div className="bg-white p-6 space-y-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                                    Free Bio-Compost
                                </span>
                                <div className="text-3xl font-mono font-light text-zinc-950">
                                    {manureFreeKg} kg/mo
                                </div>
                                <p className="text-xs text-zinc-500 font-sans">
                                    Supplied from Mudangiar Road MCC facility
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 03: 9 Sanitary Divisions Overwatch Matrix */}
                <section className="space-y-8">
                    <div className="border-b border-zinc-200 pb-4">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 font-medium">
                            03 // JURISDICTIONAL RECONNAISSANCE
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-950 mt-1">
                            9 Sanitary Divisions · 42 Ward Infrastructure
                        </h2>
                        <p className="text-sm text-zinc-600 max-w-[70ch] mt-2 font-normal">
                            Direct oversight across the 9 administrative sanitary divisions, supervising 128 collection vehicles, 47,497 assessments, and decentralized composting units.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 shadow-sm">
                        {[
                            { code: 'DIV-01', name: 'Old Bus Stand Corridor', wards: 'Wards 01 - 05', status: 'Optimal', rate: '98%', trucks: 14 },
                            { code: 'DIV-02', name: 'Tenkasi Road Municipal HQ', wards: 'Wards 06 - 10', status: 'Optimal', rate: '96%', trucks: 16 },
                            { code: 'DIV-03', name: 'PACR Salai & Mill Quarters', wards: 'Wards 11 - 15', status: 'Optimal', rate: '94%', trucks: 15 },
                            { code: 'DIV-04', name: 'Railway Feeder Road Sector', wards: 'Wards 16 - 20', status: 'Active', rate: '86%', trucks: 13 },
                            { code: 'DIV-05', name: 'Mudangiar Road MCC Sector', wards: 'Wards 21 - 25', status: 'Optimal', rate: '97%', trucks: 15 },
                            { code: 'DIV-06', name: 'Cotton Market & Panju Yard', wards: 'Wards 26 - 30', status: 'Optimal', rate: '92%', trucks: 14 },
                            { code: 'DIV-07', name: 'Malaiyadigavur Foothills', wards: 'Wards 31 - 34', status: 'Optimal', rate: '91%', trucks: 12 },
                            { code: 'DIV-08', name: 'Srivilliputtur Highway Sector', wards: 'Wards 35 - 38', status: 'Active', rate: '88%', trucks: 14 },
                            { code: 'DIV-09', name: 'Samusigapuram Link Road', wards: 'Wards 39 - 42', status: 'Optimal', rate: '95%', trucks: 15 },
                        ].map((div, i) => (
                            <div key={i} className="bg-white p-5 space-y-3 hover:bg-zinc-50 transition-colors">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-zinc-500 font-mono text-[11px]">{div.code}</span>
                                    <span className="text-emerald-700 text-[10px] uppercase tracking-wider font-semibold">{div.status}</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-900">{div.name}</h3>
                                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{div.wards}</p>
                                </div>
                                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-600">
                                    <span>Cleared: <strong className="text-zinc-950 font-medium">{div.rate}</strong></span>
                                    <span>Fleet: <strong className="text-zinc-950 font-medium">{div.trucks}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Minimalist Architectural Footer */}
            <footer className="border-t border-zinc-200 bg-white py-10 mt-20 text-xs font-mono text-zinc-500">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <div className="text-zinc-900 font-semibold">
                            Rajapalayam Municipality Solid Waste Directorate
                        </div>
                        <p className="text-zinc-500 text-[11px]">
                            Virudhunagar District, Tamil Nadu · தூய்மை ராஜபாளையம்
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-600">
                        <Link to="/login" className="hover:text-zinc-950 transition-colors">Clearance Directory</Link>
                        <Link to="/login/municipal-admin" className="hover:text-zinc-950 transition-colors">Commissioner</Link>
                        <Link to="/login/collector" className="hover:text-zinc-950 transition-colors">Collector</Link>
                        <Link to="/register" className="hover:text-zinc-950 transition-colors">Register Household</Link>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 mt-8 pt-6 border-t border-zinc-200 text-center text-[11px] text-zinc-400">
                    Autonomous Municipal Solid Waste Platform · Google Gemini 2.5 Flash Multimodal Vision · Firebase Realtime Telemetry · Leaflet Engine
                </div>
            </footer>

            {/* AI Copilot Drawer */}
            <SmartBinChatbot userRole="PUBLIC" />
        </div>
    );
}
