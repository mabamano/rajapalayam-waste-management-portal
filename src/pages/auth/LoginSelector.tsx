import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Truck, Users, Building2,
  ShieldCheck, Recycle, Home, ArrowLeft, ArrowUpRight,
  Landmark, Trash2, Map, KeyRound, Clock
} from 'lucide-react';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

type CategoryFilter = 'all' | 'executive' | 'operations' | 'field' | 'citizen';

export default function LoginSelector() {
  const { language, setLanguage } = useLanguage();
  const {
    loginMunicipalAdmin,
    loginCollector,
    loginHousehold,
    loginOfficer,
    loginStateAdmin,
    loginDeptUser,
    loginThirdParty
  } = useAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const roles = [
    // Executive Command
    {
      id: 'municipal_admin',
      category: 'executive' as CategoryFilter,
      clearance: '01 // EXECUTIVE COMMAND',
      title: 'Municipal Commissioner',
      tamilTitle: 'நகராட்சி ஆணையர்',
      desc: 'Complete administrative command for Rajapalayam Municipality (42 Wards & 9 Divisions).',
      icon: Building2,
      path: '/login/municipal-admin',
      demoCreds: 'MUN001 / admin',
      accentBorder: 'border-t-2 border-t-emerald-700',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-700',
      onInstantLogin: async () => {
        await loginMunicipalAdmin('MUN001', 'admin');
        navigate('/municipal-admin');
      }
    },
    {
      id: 'state_admin',
      category: 'executive' as CategoryFilter,
      clearance: '02 // STATE OVERWATCH',
      title: 'State Directorate (CM Cell)',
      tamilTitle: 'மாநில நிர்வாகி',
      desc: 'State-wide waste analytics & inter-district performance benchmarking across Tamil Nadu.',
      icon: Landmark,
      path: '/login/state-admin',
      demoCreds: 'TN01 / admin',
      accentBorder: 'border-t-2 border-t-indigo-700',
      badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      dotColor: 'bg-indigo-700',
      onInstantLogin: async () => {
        await loginStateAdmin('TN01', 'admin');
        navigate('/state-admin');
      }
    },

    // Operations Command
    {
      id: 'sanitation',
      category: 'operations' as CategoryFilter,
      clearance: '03 // SANITATION OPERATIONS',
      title: 'Sanitation Operations Dept',
      tamilTitle: 'சுகாதாரத் துறை',
      desc: 'Active bin clearances, division alerts, and emergency overflow response dispatch.',
      icon: Trash2,
      path: '/login/sanitation',
      demoCreds: 'SAN001 / admin',
      accentBorder: 'border-t-2 border-t-amber-700',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColor: 'bg-amber-700',
      onInstantLogin: async () => {
        await loginDeptUser('SAN001', 'admin');
        navigate('/dept/sanitation');
      }
    },
    {
      id: 'logistics',
      category: 'operations' as CategoryFilter,
      clearance: '04 // FLEET LOGISTICS',
      title: 'Logistics & Fleet Dept',
      tamilTitle: 'தளவாட & வாகனத் துறை',
      desc: 'Vehicle tracking, fuel saving heuristics, and automated corridor sequence planning.',
      icon: Map,
      path: '/login/logistics',
      demoCreds: 'LOG001 / admin',
      accentBorder: 'border-t-2 border-t-sky-700',
      badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
      dotColor: 'bg-sky-700',
      onInstantLogin: async () => {
        await loginDeptUser('LOG001', 'admin');
        navigate('/dept/logistics');
      }
    },
    {
      id: 'recycling',
      category: 'operations' as CategoryFilter,
      clearance: '05 // RESOURCE RECOVERY',
      title: 'MCC & Recycling Dept',
      tamilTitle: 'மறுசுழற்சி & உரக்கிடங்கு',
      desc: 'Decentralized Micro Composting Centres, biomethanation yield, and MRF dry waste.',
      icon: Recycle,
      path: '/login/recycling',
      demoCreds: 'REC001 / admin',
      accentBorder: 'border-t-2 border-t-teal-700',
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
      dotColor: 'bg-teal-700',
      onInstantLogin: async () => {
        await loginDeptUser('REC001', 'admin');
        navigate('/dept/recycling');
      }
    },

    // Field Taskforce
    {
      id: 'officer',
      category: 'field' as CategoryFilter,
      clearance: '06 // FIELD SUPERVISORY',
      title: 'Sanitary Inspector (SI)',
      tamilTitle: 'தூய்மை ஆய்வாளர்',
      desc: 'Field inspection across the 9 Sanitary Divisions, violation ticketing, and compliance.',
      icon: ShieldCheck,
      path: '/login/officer',
      demoCreds: 'OFF001 / admin123',
      accentBorder: 'border-t-2 border-t-zinc-700',
      badgeClass: 'bg-zinc-100 text-zinc-800 border-zinc-300',
      dotColor: 'bg-zinc-700',
      onInstantLogin: async () => {
        await loginOfficer('OFF001', 'admin123');
        navigate('/officer');
      }
    },
    {
      id: 'collector',
      category: 'field' as CategoryFilter,
      clearance: '07 // FIELD OPERATIONS',
      title: 'Waste Collector Staff',
      tamilTitle: 'கழிவு சேகரிப்பாளர்',
      desc: 'Assigned collection corridors, GPS navigation, and doorstep QR verification scanner.',
      icon: Truck,
      path: '/login/collector',
      demoCreds: 'COL001 / collector123',
      accentBorder: 'border-t-2 border-t-orange-700',
      badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
      dotColor: 'bg-orange-700',
      onInstantLogin: async () => {
        await loginCollector('COL001', 'collector123');
        navigate('/collector');
      }
    },

    // Citizens & Partners
    {
      id: 'household',
      category: 'citizen' as CategoryFilter,
      clearance: '08 // RESIDENTIAL PORTAL',
      title: 'Household Resident',
      tamilTitle: 'குடும்ப பயனர்',
      desc: 'Doorstep pickup schedule, household QR pass, and green tax rebate statement.',
      icon: Home,
      path: '/login/household',
      demoCreds: 'W08-S02-H012 / 1234',
      accentBorder: 'border-t-2 border-t-green-700',
      badgeClass: 'bg-green-50 text-green-800 border-green-200',
      dotColor: 'bg-green-700',
      onInstantLogin: async () => {
        await loginHousehold('W08', 'S02', 'H012', '1234');
        navigate('/household');
      }
    },
    {
      id: 'third_party',
      category: 'citizen' as CategoryFilter,
      clearance: '09 // COMMERCIAL PARTNER',
      title: 'Recycling Industrial Partner',
      tamilTitle: 'மறுசுழற்சி கூட்டாளர்',
      desc: 'Municipal bulk dry recyclable off-take, PACR textile mill baling, and plastic manifests.',
      icon: Users,
      path: '/login/third-party',
      demoCreds: 'PARTNER1 / password',
      accentBorder: 'border-t-2 border-t-purple-700',
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      dotColor: 'bg-purple-700',
      onInstantLogin: async () => {
        await loginThirdParty('PARTNER1', 'password');
        navigate('/third-party');
      }
    },
  ];

  const filteredRoles = filter === 'all' ? roles : roles.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900 antialiased">
      {/* Top Header */}
      <header className="border-b border-zinc-200 bg-white/95 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 bg-white transition-colors"
              aria-label="Back to Overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-950 font-semibold">
                  Rajapalayam Municipality
                </span>
                <span className="text-zinc-300 mx-2">/</span>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest font-medium">
                  Access Authorization
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{currentTime} IST</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border border-zinc-200 bg-white text-xs font-mono">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 transition-colors ${language === 'en' ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-600 hover:text-zinc-950'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-3 py-1 transition-colors ${language === 'ta' ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-600 hover:text-zinc-950'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1400px] mx-auto px-6 py-12 w-full">
        {/* Editorial Section Header */}
        <div className="border-b border-zinc-200 pb-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 font-medium">
                Identity & Access Management
              </div>
              <h1 className="text-3xl md:text-5xl font-light tracking-tighter text-zinc-950">
                Operational Clearance Directory
              </h1>
              <p className="text-sm text-zinc-600 font-normal max-w-[70ch] leading-relaxed pt-1">
                Select an operational persona to authenticate into the municipal solid waste command infrastructure. Use Instant Demo Access for immediate unauthenticated evaluation with pre-seeded municipal state.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border border-zinc-200 p-1 bg-white shadow-sm">
              {[
                { id: 'all', label: 'All Roles (9)' },
                { id: 'executive', label: 'Executive' },
                { id: 'operations', label: 'Operations' },
                { id: 'field', label: 'Field Staff' },
                { id: 'citizen', label: 'Citizen & Partner' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as CategoryFilter)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${filter === tab.id
                    ? 'bg-zinc-900 text-white font-medium'
                    : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clearance Grid (Hairline Architectural Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 shadow-sm">
          {filteredRoles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`bg-white p-6 flex flex-col justify-between hover:bg-zinc-50/80 transition-colors duration-150 group ${role.accentBorder}`}
              >
                <div>
                  {/* Card Meta Row */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-none ${role.dotColor}`} />
                      <span className="font-mono text-[11px] tracking-wider text-zinc-600 uppercase font-medium">
                        {role.clearance}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-mono border rounded-none font-semibold ${role.badgeClass}`}>
                      {role.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Tamil Subtitle */}
                  <h2 className="text-lg font-medium text-zinc-950 tracking-tight transition-colors">
                    {role.title}
                  </h2>
                  <p className="font-mono text-xs text-zinc-500 mb-3 mt-0.5">
                    {role.tamilTitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-zinc-600 font-normal leading-relaxed mb-6">
                    {role.desc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-zinc-100">
                  {/* Credentials chip */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-600 px-2.5 py-1.5 bg-zinc-50 border border-zinc-200">
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <KeyRound className="w-3 h-3 text-zinc-400" /> Demo:
                    </span>
                    <span className="text-zinc-900 truncate font-mono font-medium">{role.demoCreds}</span>
                  </div>

                  {/* Instant Demo Access Button */}
                  <Button
                    onClick={role.onInstantLogin}
                    className="w-full h-9 rounded-none bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Instant Demo Access</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>

                  {/* Manual Login Link */}
                  <Link
                    to={role.path}
                    className="block text-center text-[11px] font-mono text-zinc-500 hover:text-zinc-800 transition-colors py-1"
                  >
                    Enter credentials manually →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Citizen Registration Footer Strip */}
        <div className="mt-12 border border-zinc-200 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 font-medium">
              Citizen Self-Service Onboarding
            </div>
            <h3 className="text-xl font-light text-zinc-950 tracking-tight">
              Resident or Commercial Establishment in Rajapalayam?
            </h3>
            <p className="text-xs text-zinc-600 max-w-xl font-normal leading-relaxed">
              Register your household or business unit across any of the 42 wards to obtain an official QR doorplate, track daily collection vehicles, and participate in the municipal property tax rebate program.
            </p>
          </div>

          <Link to="/register" className="shrink-0">
            <Button
              className="h-10 px-6 rounded-none bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs uppercase tracking-wider font-medium transition-colors"
            >
              Register Household
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-xs text-zinc-500 font-mono">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Rajapalayam Municipality Solid Waste Directorate. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/" className="text-zinc-600 hover:text-zinc-950 transition-colors">Overview</Link>
            <Link to="/login/municipal-admin" className="text-zinc-600 hover:text-zinc-950 transition-colors">Commissioner</Link>
            <Link to="/login/collector" className="text-zinc-600 hover:text-zinc-950 transition-colors">Collector</Link>
          </div>
        </div>
      </footer>

      <SmartBinChatbot userRole="PUBLIC" />
    </div>
  );
}
