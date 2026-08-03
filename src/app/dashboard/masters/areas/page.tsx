'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  MapPin,
  Search,
  RefreshCw,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Zap,
  Navigation,
  Plus,
} from 'lucide-react';
import { EmirateArea } from '@/types';
import { INITIAL_EMIRATES_AREAS } from '@/lib/mockData';

export default function AreasManagementPage() {
  const { lang } = useI18n();

  // State
  const [areas, setAreas] = useState<EmirateArea[]>(INITIAL_EMIRATES_AREAS);
  const [search, setSearch] = useState('');
  const [emirateFilter, setEmirateFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [emirate, setEmirate] = useState('Dubai');
  const [areaName, setAreaName] = useState('');
  const [areaNameAr, setAreaNameAr] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState<number>(30);
  const [expressCharge, setExpressCharge] = useState<number>(50);
  const [driverCommission, setDriverCommission] = useState<number>(10);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_areas');
      if (saved) {
        setAreas(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage & Categories
  const saveAreas = (newAreas: EmirateArea[]) => {
    setAreas(newAreas);
    try {
      localStorage.setItem('omex_system_data_v1_areas', JSON.stringify(newAreas));
      localStorage.setItem('omex_system_data_v1_categories_Emirates', JSON.stringify(newAreas));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Helper AR Emirate Name
  const getEmirateAr = (en: string) => {
    const map: Record<string, string> = {
      'Abu Dhabi': 'أبوظبي',
      Dubai: 'دبي',
      Sharjah: 'الشارقة',
      Ajman: 'عجمان',
      'Umm Al Quwain': 'أم القيوين',
      'Ras Al Khaimah': 'رأس الخيمة',
      Fujairah: 'الفجيرة',
    };
    return map[en] || en;
  };

  // Statistics
  const stats = useMemo(() => {
    const total = areas.length;
    const active = areas.filter((a) => a.isActive !== false).length;
    const abudhabi = areas.filter((a) => a.emirate === 'Abu Dhabi').length;
    const dubai = areas.filter((a) => a.emirate === 'Dubai').length;
    const sharjah = areas.filter((a) => a.emirate === 'Sharjah').length;
    const northern = areas.filter(
      (a) =>
        a.emirate !== 'Abu Dhabi' &&
        a.emirate !== 'Dubai' &&
        a.emirate !== 'Sharjah'
    ).length;

    const avgFee =
      total > 0
        ? (areas.reduce((sum, a) => sum + (a.deliveryCharge || 30), 0) / total).toFixed(0)
        : '30';
    const avgExpress =
      total > 0
        ? (areas.reduce((sum, a) => sum + (a.expressCharge || 50), 0) / total).toFixed(0)
        : '50';

    return { total, active, abudhabi, dubai, sharjah, northern, avgFee, avgExpress };
  }, [areas]);

  // Filtered Areas
  const filteredAreas = useMemo(() => {
    return areas.filter((a) => {
      const matchesSearch =
        !search ||
        a.areaName.toLowerCase().includes(search.toLowerCase()) ||
        (a.areaNameAr && a.areaNameAr.includes(search)) ||
        a.emirate.toLowerCase().includes(search.toLowerCase());

      const matchesEmirate = emirateFilter === 'All' || a.emirate === emirateFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && a.isActive !== false) ||
        (statusFilter === 'Blocked' && a.isActive === false);

      return matchesSearch && matchesEmirate && matchesStatus;
    });
  }, [areas, search, emirateFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAreas.length / itemsPerPage) || 1;
  const paginatedAreas = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAreas.slice(start, start + itemsPerPage);
  }, [filteredAreas, currentPage, itemsPerPage]);

  // Toggle status
  const handleToggleStatus = (id: string) => {
    const updated = areas.map((a) => {
      if (a.id === id) {
        return { ...a, isActive: a.isActive === false ? true : false };
      }
      return a;
    });
    saveAreas(updated);
    showToast(lang === 'ar' ? 'تم تغيير حالة المنطقة بنجاح' : 'Area status toggled successfully');
  };

  // Delete Area
  const handleDeleteArea = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه المنطقة؟' : 'Are you sure you want to delete this area?')) {
      const updated = areas.filter((a) => a.id !== id);
      saveAreas(updated);
      showToast(lang === 'ar' ? 'تم حذف المنطقة بنجاح' : 'Area deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit Click
  const handleEditClick = (a: EmirateArea) => {
    setEditingId(a.id);
    setEmirate(a.emirate);
    setAreaName(a.areaName);
    setAreaNameAr(a.areaNameAr || '');
    setDeliveryCharge(a.deliveryCharge || 30);
    setExpressCharge(a.expressCharge || 50);
    setDriverCommission(a.driverCommission || 10);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setEmirate('Dubai');
    setAreaName('');
    setAreaNameAr('');
    setDeliveryCharge(30);
    setExpressCharge(50);
    setDriverCommission(10);
  };

  // Save / Update
  const handleSaveArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaName.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم المنطقة' : 'Please enter area name');
      return;
    }

    if (editingId) {
      const updated = areas.map((a) => {
        if (a.id === editingId) {
          return {
            ...a,
            emirate,
            areaName: areaName.trim(),
            areaNameAr: areaNameAr.trim() || areaName.trim(),
            deliveryCharge: Number(deliveryCharge) || 30,
            expressCharge: Number(expressCharge) || 50,
            driverCommission: Number(driverCommission) || 10,
          };
        }
        return a;
      });
      saveAreas(updated);
      showToast(lang === 'ar' ? 'تم تحديث المنطقة ورسوم التوصيل بنجاح' : 'Area & pricing updated successfully');
    } else {
      const newArea: EmirateArea = {
        id: `area-${Date.now().toString().slice(-4)}`,
        emirate,
        areaName: areaName.trim(),
        areaNameAr: areaNameAr.trim() || areaName.trim(),
        deliveryCharge: Number(deliveryCharge) || 30,
        expressCharge: Number(expressCharge) || 50,
        driverCommission: Number(driverCommission) || 10,
        isActive: true,
      };
      saveAreas([newArea, ...areas]);
      showToast(lang === 'ar' ? 'تم إضافة المنطقة الجديدة بنجاح' : 'Area created successfully');
    }
    resetForm();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#352F7A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-[#E87722]" />
          <span className="text-sm font-bold">{toast}</span>
        </div>
      )}

      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#352F7A] to-[#5047AF] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <MapPin className="w-6 h-6 text-[#E87722]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'إدارة المناطق ورسوم التوصيل (Master Areas & Pricing)' : 'Master Delivery Areas & Pricing Tariff'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'إدارة الأحياء والمدن في كل إمارة، رسوم التوصيل العادي والسريع، وعمولة السائق التلقائية'
                : 'Manage emirate zones, delivery charges, express tariffs, and driver payout rates'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setAreas(INITIAL_EMIRATES_AREAS);
              showToast(lang === 'ar' ? 'تم تحديث قائمة المناطق للافتراضي' : 'Areas refreshed to defaults');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            {lang === 'ar' ? 'تحديث البيانات' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* 2. 7 Colorful Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Total Areas */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي المناطق' : 'Total Zones'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Abu Dhabi Zones */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مناطق أبوظبي' : 'Abu Dhabi'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.abudhabi}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </div>
        </div>

        {/* Dubai Zones */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مناطق دبي' : 'Dubai'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.dubai}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </div>
        </div>

        {/* Sharjah Zones */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مناطق الشارقة' : 'Sharjah'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.sharjah}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </div>
        </div>

        {/* Northern Emirates */}
        <div className="bg-teal-50/70 border border-teal-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
              {lang === 'ar' ? 'الإمارات الشمالية' : 'Northern UAE'}
            </p>
            <p className="text-2xl font-black text-teal-900 mt-1">{stats.northern}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Average Standard Charge */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'متوسط السعر العادي' : 'Avg Standard'}
            </p>
            <p className="text-xl font-black text-emerald-900 mt-1">{stats.avgFee} AED</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Average Express Charge */}
        <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
              {lang === 'ar' ? 'متوسط Express' : 'Avg Express'}
            </p>
            <p className="text-xl font-black text-rose-900 mt-1">{stats.avgExpress} AED</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Main Split Area: Table (Left 3 cols) + Create/Edit Sidebar (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Table Section */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top Filter Bar */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={
                    lang === 'ar'
                      ? 'بحث باسم المنطقة، الحي، أو الإمارة...'
                      : 'Search zone name, district, or emirate...'
                  }
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 focus:border-[#352F7A]"
                />
              </div>

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  {lang === 'ar' ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Emirate Filter */}
              <select
                value={emirateFilter}
                onChange={(e) => {
                  setEmirateFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 cursor-pointer"
              >
                <option value="All">{lang === 'ar' ? 'جميع الإمارات' : 'All Emirates'}</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Dubai">Dubai</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 cursor-pointer"
              >
                <option value="All">{lang === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
                <option value="Active">{lang === 'ar' ? 'مفعل (Active)' : 'Active'}</option>
                <option value="Blocked">{lang === 'ar' ? 'معطل (Blocked)' : 'Blocked'}</option>
              </select>
            </div>
          </div>

          {/* Directory Header Sub-bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'دليل المناطق وتعرفة رسوم التوصيل' : 'Delivery Zones Tariff Directory'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedAreas.length} من أصل ${filteredAreas.length} منطقة`
                : `Showing ${paginatedAreas.length} of ${filteredAreas.length} zones`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'المنطقة والرمز' : 'ZONE & ID'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الإمارة' : 'EMIRATE'}</th>
                  <th className="py-3.5 px-5 text-center">{lang === 'ar' ? 'توصيل عادي' : 'STANDARD FEE'}</th>
                  <th className="py-3.5 px-5 text-center">{lang === 'ar' ? 'توصيل Express' : 'EXPRESS FEE'}</th>
                  <th className="py-3.5 px-5 text-center">{lang === 'ar' ? 'عمولة السائق' : 'DRIVER SHARE'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedAreas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد مناطق مطابقة للبحث' : 'No areas matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedAreas.map((a) => {
                    const isBlocked = a.isActive === false;

                    return (
                      <tr
                        key={a.id}
                        className={`hover:bg-slate-50/80 transition ${
                          editingId === a.id ? 'bg-indigo-50/60' : ''
                        }`}
                      >
                        {/* Options */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(a.id)}
                              title={
                                isBlocked
                                  ? lang === 'ar'
                                    ? 'تفعيل المنطقة'
                                    : 'Enable Area'
                                  : lang === 'ar'
                                  ? 'تعطيل المنطقة'
                                  : 'Disable Area'
                              }
                              className={`p-1.5 rounded-lg transition ${
                                isBlocked
                                  ? 'text-red-500 hover:bg-red-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {isBlocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => handleEditClick(a)}
                              title={lang === 'ar' ? 'تعديل السعر والمنطقة' : 'Edit Area & Tariff'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteArea(a.id)}
                              title={lang === 'ar' ? 'حذف المنطقة' : 'Delete Area'}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                              isBlocked
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isBlocked ? 'bg-red-500' : 'bg-emerald-500'
                              }`}
                            />
                            {isBlocked
                              ? lang === 'ar'
                                ? 'معطل'
                                : 'Disabled'
                              : lang === 'ar'
                              ? 'مفعل'
                              : 'Active'}
                          </span>
                        </td>

                        {/* Area & ID */}
                        <td className="py-3.5 px-5">
                          <div>
                            <p className="font-bold text-slate-900">{a.areaName}</p>
                            {a.areaNameAr && (
                              <p className="text-[11px] text-slate-500 font-semibold">{a.areaNameAr}</p>
                            )}
                            <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                              ID: {a.id}
                            </p>
                          </div>
                        </td>

                        {/* Emirate */}
                        <td className="py-3.5 px-5">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {lang === 'ar' ? getEmirateAr(a.emirate) : a.emirate}
                          </span>
                        </td>

                        {/* Standard Fee */}
                        <td className="py-3.5 px-5 text-center">
                          <span className="inline-block px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-black text-xs border border-emerald-200">
                            {a.deliveryCharge || 30} AED
                          </span>
                        </td>

                        {/* Express Fee */}
                        <td className="py-3.5 px-5 text-center">
                          <span className="inline-block px-3 py-1 rounded-xl bg-amber-50 text-amber-800 font-mono font-black text-xs border border-amber-200">
                            {a.expressCharge || 50} AED
                          </span>
                        </td>

                        {/* Driver Commission */}
                        <td className="py-3.5 px-5 text-center">
                          <span className="inline-block px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs border border-slate-200">
                            {a.driverCommission || 10} AED
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `صفحة ${currentPage} من ${totalPages}`
                : `Page ${currentPage} of ${totalPages}`}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition"
              >
                {lang === 'ar' ? 'السابق' : 'Previous'}
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition"
              >
                {lang === 'ar' ? 'التالي' : 'Next'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Create / Edit Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل المنطقة والأسعار'
                    : 'Edit Zone Tariff'
                  : lang === 'ar'
                  ? 'إضافة منطقة جديدة'
                  : 'Add Delivery Zone'}
              </h3>
            </div>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            )}
          </div>

          <p className="text-xs text-slate-500 font-semibold mt-2 mb-4">
            {lang === 'ar'
              ? 'أدخل اسم المنطقة ورسوم التوصيل العادي والسريع لتظهر تلقائياً في حساب سعر الطلبات الجديدة'
              : 'Add delivery pricing tariff for automatic calculation when creating new waybills'}
          </p>

          <form onSubmit={handleSaveArea} className="space-y-4">
            {/* Emirate Selector */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'الإمارة' : 'Emirate'}
              </label>
              <select
                value={emirate}
                onChange={(e) => setEmirate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              >
                <option value="Abu Dhabi">Abu Dhabi (أبوظبي)</option>
                <option value="Dubai">Dubai (دبي)</option>
                <option value="Sharjah">Sharjah (الشارقة)</option>
                <option value="Ajman">Ajman (عجمان)</option>
                <option value="Umm Al Quwain">Umm Al Quwain (أم القيوين)</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah (رأس الخيمة)</option>
                <option value="Fujairah">Fujairah (الفجيرة)</option>
              </select>
            </div>

            {/* Area Name EN */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم المنطقة (English)' : 'Area Name (EN)'}
              </label>
              <input
                type="text"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                placeholder="e.g. Business Bay"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Area Name AR */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم المنطقة (بالعربية)' : 'Area Name (AR)'}
              </label>
              <input
                type="text"
                value={areaNameAr}
                onChange={(e) => setAreaNameAr(e.target.value)}
                placeholder="مثال: الخليج التجاري"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 text-end"
              />
            </div>

            {/* Fees */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'توصيل عادي AED' : 'Standard Fee AED'}
                </label>
                <input
                  type="number"
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'توصيل Express' : 'Express Fee AED'}
                </label>
                <input
                  type="number"
                  value={expressCharge}
                  onChange={(e) => setExpressCharge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Driver Commission */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'عمولة السائق (AED)' : 'Driver Commission (AED)'}
              </label>
              <input
                type="number"
                value={driverCommission}
                onChange={(e) => setDriverCommission(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Actions Buttons */}
            <div className="pt-3 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold text-white bg-[#169C47] hover:bg-[#138a3e] transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {editingId
                  ? lang === 'ar'
                    ? 'تحديث أسعار المنطقة'
                    : 'Update Tariff'
                  : lang === 'ar'
                  ? 'حفظ المنطقة (Save)'
                  : 'Save Zone'}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                {lang === 'ar' ? 'مسح' : 'Clear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
