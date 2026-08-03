'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Search, Globe, Bell, Command, ShieldCheck, Menu, AlertTriangle, Car, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/context/DataContext';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onOpenMobileSidebar: () => void;
}

export default function Topbar({ onOpenCommandPalette, onOpenMobileSidebar }: TopbarProps) {
  const { t, lang, toggleLanguage } = useI18n();
  const [quickTrackQuery, setQuickTrackQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const { vehicles } = useData();

  // Calculate expiring vehicles (within 15 days)
  const expiringVehicles = useMemo(() => {
    const now = new Date();
    const threshold = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
    const alerts: { vehicleId: string; plate: string; makeModel: string; type: 'mulkiya' | 'insurance'; expiryDate: string; daysLeft: number }[] = [];

    vehicles.forEach((v) => {
      if (v.mulkiyaExpiry) {
        const expDate = new Date(v.mulkiyaExpiry);
        if (expDate <= threshold) {
          const daysLeft = Math.max(0, Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
          alerts.push({
            vehicleId: v.id,
            plate: `${v.emirateRegistered} ${v.plateCode}-${v.plateNumber}`,
            makeModel: v.makeModel || '',
            type: 'mulkiya',
            expiryDate: v.mulkiyaExpiry,
            daysLeft,
          });
        }
      }
      if (v.insuranceExpiry) {
        const expDate = new Date(v.insuranceExpiry);
        if (expDate <= threshold) {
          const daysLeft = Math.max(0, Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
          alerts.push({
            vehicleId: v.id,
            plate: `${v.emirateRegistered} ${v.plateCode}-${v.plateNumber}`,
            makeModel: v.makeModel || '',
            type: 'insurance',
            expiryDate: v.insuranceExpiry,
            daysLeft,
          });
        }
      }
    });

    return alerts.sort((a, b) => a.daysLeft - b.daysLeft);
  }, [vehicles]);

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

        {/* Notifications with Vehicle Expiry Alerts */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {expiringVehicles.length > 0 && (
              <span className="absolute -top-0.5 -end-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white px-1">
                {expiringVehicles.length}
              </span>
            )}
            {expiringVehicles.length === 0 && (
              <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-[#E87722] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute end-0 top-12 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#352F7A] to-[#4A3FA8] text-white">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#E87722]" />
                  <h4 className="text-sm font-bold">
                    {lang === 'ar' ? 'تنبيهات المركبات' : 'Vehicle Alerts'}
                  </h4>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-lg hover:bg-white/20 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {expiringVehicles.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-sm">
                    <Car className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold">
                      {lang === 'ar' ? 'لا توجد تنبيهات حالياً' : 'No alerts at this time'}
                    </p>
                    <p className="text-xs mt-1">
                      {lang === 'ar' ? 'جميع المستندات سارية المفعول' : 'All documents are up to date'}
                    </p>
                  </div>
                ) : (
                  expiringVehicles.map((alert, idx) => (
                    <div
                      key={`${alert.vehicleId}-${alert.type}-${idx}`}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition cursor-pointer ${
                        alert.daysLeft <= 3 ? 'bg-red-50/50' : alert.daysLeft <= 7 ? 'bg-amber-50/50' : ''
                      }`}
                      onClick={() => {
                        setShowNotifications(false);
                        router.push('/dashboard/fleet/list');
                      }}
                    >
                      <div className={`mt-0.5 p-1.5 rounded-lg ${
                        alert.daysLeft <= 3 ? 'bg-red-100 text-red-600' : alert.daysLeft <= 7 ? 'bg-amber-100 text-amber-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Car className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{alert.plate}</p>
                        <p className="text-[10px] text-slate-500">{alert.makeModel}</p>
                        <p className="text-[11px] font-semibold mt-0.5">
                          <span className={`${
                            alert.daysLeft <= 3 ? 'text-red-600' : alert.daysLeft <= 7 ? 'text-amber-600' : 'text-orange-600'
                          }`}>
                            {alert.type === 'mulkiya'
                              ? (lang === 'ar' ? 'الملكية' : 'Mulkiya')
                              : (lang === 'ar' ? 'التأمين' : 'Insurance')
                            }
                            {' — '}
                            {alert.daysLeft === 0
                              ? (lang === 'ar' ? 'منتهي اليوم!' : 'Expires today!')
                              : lang === 'ar'
                                ? `ينتهي خلال ${alert.daysLeft} يوم`
                                : `Expires in ${alert.daysLeft} days`
                            }
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {lang === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry:'} {alert.expiryDate}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {expiringVehicles.length > 0 && (
                <div className="border-t border-slate-100 px-4 py-2.5">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      router.push('/dashboard/fleet/list');
                    }}
                    className="w-full text-center text-xs font-bold text-[#352F7A] hover:text-[#E87722] transition"
                  >
                    {lang === 'ar' ? 'عرض جميع المركبات →' : 'View all vehicles →'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

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
