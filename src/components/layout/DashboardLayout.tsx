import { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { VoiceAssistant } from '@/components/common/VoiceAssistant';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background Ambient Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="relative z-10 flex w-full">
        <DashboardSidebar />
        <main className="flex-1 lg:ml-0 overflow-auto">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <VoiceAssistant />
    </div>
  );
}
