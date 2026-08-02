'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  Search,
  LayoutDashboard,
  PlusCircle,
  PackageCheck,
  Users,
  Boxes,
  Truck,
  Wallet,
  Car,
  FileBarChart,
  Globe,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { t, toggleLanguage } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { name: t.nav.createOrder, href: '/dashboard/orders/create', icon: PlusCircle, category: 'Quick Action' },
    { name: t.nav.dashboard, href: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { name: t.nav.orderList, href: '/dashboard/orders/list', icon: PackageCheck, category: 'Navigation' },
    { name: t.nav.accounts, href: '/dashboard/accounts', icon: Users, category: 'Navigation' },
    { name: t.nav.masters, href: '/dashboard/masters', icon: Boxes, category: 'Navigation' },
    { name: t.nav.shipments, href: '/dashboard/shipments', icon: Truck, category: 'Navigation' },
    { name: t.nav.financials, href: '/dashboard/financials', icon: Wallet, category: 'Navigation' },
    { name: t.nav.fleet, href: '/dashboard/fleet', icon: Car, category: 'Navigation' },
    { name: t.nav.reports, href: '/dashboard/reports', icon: FileBarChart, category: 'Navigation' },
  ];

  const filteredActions = actions.filter((act) =>
    act.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchCommand}
            autoFocus
            className="w-full px-4 py-4 text-sm bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <p className="p-6 text-center text-xs text-slate-500">No matching commands found.</p>
          ) : (
            filteredActions.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.name}
                  onClick={() => handleSelect(act.href)}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-emerald-50 hover:text-[#169C47] text-slate-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#169C47]" />
                    <span className="text-xs font-semibold">{act.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-emerald-600">
                    {act.category}
                  </span>
                </button>
              );
            })
          )}

          {/* Quick Toggle Action */}
          <div className="border-t border-slate-100 pt-2 mt-2">
            <button
              onClick={() => {
                toggleLanguage();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-emerald-50 text-[#169C47] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold">{t.toggleLanguage}</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">Switch Language</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC to close</span>
          <span>OMEX UAE Logistics Engine</span>
        </div>
      </div>
    </div>
  );
}
