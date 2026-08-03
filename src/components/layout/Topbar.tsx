'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Search, Globe, Bell, Command, ShieldCheck, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onOpenMobileSidebar: () => void;
}

export default function Topbar({ onOpenCommandPalette, onOpenMobileSidebar }: TopbarProps) {
  const { t, lang, toggleLanguage } = useI18n();
  const [quickTrackQuery, setQuickTrackQuery] = useState('');
  const router = useRouter();

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackQuery.trim()) {
      router.push(`/dashboard/tracking?q=${encodeURIComponent(quickTrackQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shadow-xs z-20">
      {/* Mobile Hamburger Toggle */}
      <button
        onClick={onOpenMobileSidebar}
        className="md:hidden p-2 me-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        title="Open Navigation Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search & Quick Track */}
      <form onSubmit={handleQuickTrack} className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={quickTrackQuery}
            onChange={(e) => setQuickTrackQuery(e.target.value)}
            placeholder={t.quickTrackPlaceholder}
            className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#352F7A] focus:border-transparent transition-all"
          />
        </div>
      </form>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3 ms-2 sm:ms-4">
        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
          title="Command Palette (Cmd + K)"
        >
          <Command className="w-3.5 h-3.5 text-slate-500" />
          <span>Cmd+K</span>
        </button>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#352F7A] rounded-xl text-xs font-bold transition-all border border-indigo-200/60 shadow-2xs"
          title="Switch Language / تغيير اللغة"
        >
          <Globe className="w-4 h-4 text-[#E87722]" />
          <span className="text-xs">{t.toggleLanguage}</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-[#E87722] rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile Chip */}
        <div className="flex items-center gap-2.5 ps-2 border-s border-slate-200">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-gradient-to-tr from-[#352F7A] to-[#E87722] text-white font-bold flex items-center justify-center text-xs shadow-sm">
            AD
          </div>
          <div className="hidden lg:block text-start">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin System</p>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#E87722]" />
              <span className="text-[10px] text-slate-500 font-medium">Full Access</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
