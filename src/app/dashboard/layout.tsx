'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import CommandPalette from '@/components/layout/CommandPalette';
import { I18nProvider } from '@/lib/i18n/I18nContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  return (
    <I18nProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
        {/* Dark Green Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main Content Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <Topbar onOpenCommandPalette={() => setIsCmdOpen(true)} />

          {/* Dynamic Page Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/70">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>
        </div>

        {/* Global Cmd+K Command Palette */}
        <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
      </div>
    </I18nProvider>
  );
}
