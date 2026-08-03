'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  Truck,
  Search,
  RefreshCw,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  AlertTriangle,
  Plus,
  Shield,
} from 'lucide-react';
import { Vehicle } from '@/types';
import { INITIAL_VEHICLES } from '@/lib/mockData';

export default function VehiclesManagementPage() {
  const { lang } = useI18n();

  // State
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [emirateFilter, setEmirateFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [plateCode, setPlateCode] = useState('A');
  const [emirateRegistered, setEmirateRegistered] = useState('Abu Dhabi');
  const [type, setType] = useState<Vehicle['type']>('Van');
  const [makeModel, setMakeModel] = useState('Toyota HiAce 2024');
  const [mulkiyaExpiry, setMulkiyaExpiry] = useState('2026-08-15');
  const [insuranceExpiry, setInsuranceExpiry] = useState('2026-08-20');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_vehicles');
      if (saved) {
        setVehicles(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage
  const saveVehicles = (newVehicles: Vehicle[]) => {
    setVehicles(newVehicles);
    try {
      localStorage.setItem('omex_system_data_v1_vehicles', JSON.stringify(newVehicles));
      localStorage.setItem('omex_system_data_v1_categories_Vehicles', JSON.stringify(newVehicles));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Helper check if expiry < 15 days
  const isExpiringSoon = (dateStr?: string) => {
    if (!dateStr) return false;
    try {
      const target = new Date(dateStr).getTime();
      const now = Date.now();
      const diffDays = (target - now) / (1000 * 60 * 60 * 24);
      return diffDays <= 15;
    } catch {
      return false;
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const total = vehicles.length;
    const active = vehicles.filter((v) => v.status === 'Active').length;
    const vans = vehicles.filter((v) => v.type === 'Van').length;
    const motos = vehicles.filter((v) => v.type === 'Motorcycle').length;
    const chillers = vehicles.filter((v) => v.type === 'Chiller Truck').length;
    const expiringMulkiya = vehicles.filter((v) => isExpiringSoon(v.mulkiyaExpiry)).length;
    const expiringInsurance = vehicles.filter((v) => isExpiringSoon(v.insuranceExpiry)).length;

    return { total, active, vans, motos, chillers, expiringMulkiya, expiringInsurance };
  }, [vehicles]);

  // Filtered Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        !search ||
        v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        v.plateCode.toLowerCase().includes(search.toLowerCase()) ||
        v.makeModel.toLowerCase().includes(search.toLowerCase()) ||
        v.emirateRegistered.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === 'All' || v.type === typeFilter;
      const matchesEmirate = emirateFilter === 'All' || v.emirateRegistered === emirateFilter;

      return matchesSearch && matchesType && matchesEmirate;
    });
  }, [vehicles, search, typeFilter, emirateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage, itemsPerPage]);

  // Toggle status
  const handleToggleStatus = (id: string) => {
    const updated = vehicles.map((v) => {
      if (v.id === id) {
        const nextStatus = v.status === 'Active' ? 'Inactive' : 'Active';
        return { ...v, status: nextStatus as Vehicle['status'] };
      }
      return v;
    });
    saveVehicles(updated);
    showToast(lang === 'ar' ? 'تم تغيير حالة المركبة بنجاح' : 'Vehicle status toggled successfully');
  };

  // Delete Vehicle
  const handleDeleteVehicle = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه المركبة؟' : 'Are you sure you want to delete this vehicle?')) {
      const updated = vehicles.filter((v) => v.id !== id);
      saveVehicles(updated);
      showToast(lang === 'ar' ? 'تم حذف المركبة بنجاح' : 'Vehicle deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit Click
  const handleEditClick = (v: Vehicle) => {
    setEditingId(v.id);
    setPlateNumber(v.plateNumber);
    setPlateCode(v.plateCode);
    setEmirateRegistered(v.emirateRegistered);
    setType(v.type);
    setMakeModel(v.makeModel);
    setMulkiyaExpiry(v.mulkiyaExpiry || '2026-12-31');
    setInsuranceExpiry(v.insuranceExpiry || '2026-12-31');
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setPlateNumber('');
    setPlateCode('A');
    setEmirateRegistered('Abu Dhabi');
    setType('Van');
    setMakeModel('Toyota HiAce 2024');
    setMulkiyaExpiry('2026-08-15');
    setInsuranceExpiry('2026-08-20');
  };

  // Save / Update
  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال رقم اللوحة' : 'Please enter plate number');
      return;
    }

    if (editingId) {
      const updated = vehicles.map((v) => {
        if (v.id === editingId) {
          return {
            ...v,
            plateNumber: plateNumber.trim(),
            plateCode: plateCode.trim(),
            emirateRegistered,
            type,
            makeModel: makeModel.trim(),
            mulkiyaExpiry,
            insuranceExpiry,
          };
        }
        return v;
      });
      saveVehicles(updated);
      showToast(lang === 'ar' ? 'تم تحديث بيانات المركبة بنجاح' : 'Vehicle updated successfully');
    } else {
      const newVehicle: Vehicle = {
        id: `veh-${Date.now().toString().slice(-4)}`,
        plateNumber: plateNumber.trim(),
        plateCode: plateCode.trim(),
        emirateRegistered,
        type,
        makeModel: makeModel.trim(),
        mulkiyaExpiry,
        insuranceExpiry,
        status: 'Active',
        year: 2024,
        odometerKm: 15000,
      };
      saveVehicles([newVehicle, ...vehicles]);
      showToast(lang === 'ar' ? 'تم إضافة المركبة بنجاح' : 'Vehicle added successfully');
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
            <Truck className="w-6 h-6 text-[#E87722]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'إدارة المركبات وأسطول التوصيل (Fleet Master)' : 'Master Fleet & Vehicles Management'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'إدارة لوحات المركبات، تواريخ انتهاء الملكية والتأمين، وأنواع الشاحنات'
                : 'Manage vehicle plates, Mulkiya/Insurance expiry tracking, and delivery truck types'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setVehicles(INITIAL_VEHICLES);
              showToast(lang === 'ar' ? 'تم تحديث قائمة المركبات للافتراضي' : 'Vehicles refreshed to defaults');
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
        {/* Total Fleet */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي الأسطول' : 'Total Fleet'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Active Assigned */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مركبات نشطة' : 'Active Fleet'}
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{stats.active}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Vans */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'شاحنات توصيل' : 'Delivery Vans'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.vans}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Motorcycles */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'دراجات نارية' : 'Motorcycles'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.motos}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Chiller Trucks */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'شاحنات تبريد' : 'Chiller Trucks'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.chillers}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        {/* Expiring Mulkiya */}
        <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
              {lang === 'ar' ? 'انتهاء الملكية <15d' : 'Mulkiya <15d'}
            </p>
            <p className="text-2xl font-black text-rose-900 mt-1">{stats.expiringMulkiya}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Expiring Insurance */}
        <div className="bg-orange-50/70 border border-orange-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wide">
              {lang === 'ar' ? 'انتهاء التأمين <15d' : 'Insurance <15d'}
            </p>
            <p className="text-2xl font-black text-orange-900 mt-1">{stats.expiringInsurance}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
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
                      ? 'بحث برقم اللوحة، الرمز، أو موديل المركبة...'
                      : 'Search plate number, code, or vehicle model...'
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
              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 cursor-pointer"
              >
                <option value="All">{lang === 'ar' ? 'جميع الأنواع (All Types)' : 'All Types'}</option>
                <option value="Van">{lang === 'ar' ? 'شاحنة توصيل (Van)' : 'Van'}</option>
                <option value="Motorcycle">{lang === 'ar' ? 'دراجة نارية (Motorcycle)' : 'Motorcycle'}</option>
                <option value="Chiller Truck">{lang === 'ar' ? 'شاحنة تبريد (Chiller)' : 'Chiller Truck'}</option>
                <option value="Sedan">{lang === 'ar' ? 'سيارة صغيرة (Sedan)' : 'Sedan'}</option>
              </select>

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
              </select>
            </div>
          </div>

          {/* Directory Header Sub-bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'دليل المركبات واللوحات' : 'Fleet Vehicles Roster'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedVehicles.length} من أصل ${filteredVehicles.length} مركبة`
                : `Showing ${paginatedVehicles.length} of ${filteredVehicles.length} vehicles`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'اللوحة والإمارة' : 'PLATE & EMIRATE'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'نوع المركبة والموديل' : 'TYPE & MODEL'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'انتهاء الملكية' : 'MULKIYA EXPIRY'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'انتهاء التأمين' : 'INSURANCE EXPIRY'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد مركبات مطابقة للبحث' : 'No vehicles matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedVehicles.map((v) => {
                    const isBlocked = v.status !== 'Active';
                    const mulkiyaWarn = isExpiringSoon(v.mulkiyaExpiry);
                    const insuranceWarn = isExpiringSoon(v.insuranceExpiry);

                    return (
                      <tr
                        key={v.id}
                        className={`hover:bg-slate-50/80 transition ${
                          editingId === v.id ? 'bg-indigo-50/60' : ''
                        }`}
                      >
                        {/* Options */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(v.id)}
                              title={
                                isBlocked
                                  ? lang === 'ar'
                                    ? 'تنشيط المركبة'
                                    : 'Activate Vehicle'
                                  : lang === 'ar'
                                  ? 'إيقاف المركبة'
                                  : 'Deactivate Vehicle'
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
                              onClick={() => handleEditClick(v)}
                              title={lang === 'ar' ? 'تعديل البيانات' : 'Edit Vehicle'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteVehicle(v.id)}
                              title={lang === 'ar' ? 'حذف المركبة' : 'Delete Vehicle'}
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
                                ? 'متوقفة'
                                : 'Inactive'
                              : lang === 'ar'
                              ? 'نشطة'
                              : 'Active'}
                          </span>
                        </td>

                        {/* Plate & Emirate */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-[#352F7A] text-white font-mono font-black text-xs border border-indigo-900 shadow-xs">
                              {v.plateCode} - {v.plateNumber}
                            </span>
                            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {v.emirateRegistered}
                            </span>
                          </div>
                        </td>

                        {/* Type & Model */}
                        <td className="py-3.5 px-5">
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {v.type}
                            </span>
                            <p className="font-bold text-slate-800 mt-1">{v.makeModel}</p>
                          </div>
                        </td>

                        {/* Mulkiya Expiry */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              className={`w-3.5 h-3.5 ${
                                mulkiyaWarn ? 'text-red-500 animate-pulse' : 'text-slate-400'
                              }`}
                            />
                            <span
                              className={`font-mono font-bold ${
                                mulkiyaWarn ? 'text-red-600 bg-red-50 px-2 py-0.5 rounded' : 'text-slate-700'
                              }`}
                            >
                              {v.mulkiyaExpiry || '2026-12-31'}
                            </span>
                            {mulkiyaWarn && (
                              <span className="text-[10px] font-extrabold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                                !
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Insurance Expiry */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              className={`w-3.5 h-3.5 ${
                                insuranceWarn ? 'text-orange-500 animate-pulse' : 'text-slate-400'
                              }`}
                            />
                            <span
                              className={`font-mono font-bold ${
                                insuranceWarn ? 'text-orange-600 bg-orange-50 px-2 py-0.5 rounded' : 'text-slate-700'
                              }`}
                            >
                              {v.insuranceExpiry || '2026-12-31'}
                            </span>
                            {insuranceWarn && (
                              <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                                !
                              </span>
                            )}
                          </div>
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
              <Truck className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل بيانات المركبة'
                    : 'Edit Vehicle'
                  : lang === 'ar'
                  ? 'إضافة مركبة جديدة'
                  : 'Add New Fleet Vehicle'}
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
              ? 'أدخل بيانات اللوحة وتاريخ انتهاء الملكية والتأمين ليتم تنبيهك تلقائياً قبل 15 يوماً من الانتهاء'
              : 'Add vehicle plates and expiry dates for auto-alerting in Topbar notifications'}
          </p>

          <form onSubmit={handleSaveVehicle} className="space-y-4">
            {/* Plate Number & Code */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رقم اللوحة' : 'Plate No'}
                </label>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="54321"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رمز اللوحة Code' : 'Plate Code'}
                </label>
                <input
                  type="text"
                  value={plateCode}
                  onChange={(e) => setPlateCode(e.target.value.toUpperCase())}
                  placeholder="AD / A / DXB"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Emirate Registered & Type */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'إمارة التسجيل' : 'Registered Emirate'}
                </label>
                <select
                  value={emirateRegistered}
                  onChange={(e) => setEmirateRegistered(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Vehicle['type'])}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Van">Van (توصيل)</option>
                  <option value="Motorcycle">Motorcycle (دراجة)</option>
                  <option value="Chiller Truck">Chiller (تبريد)</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Heavy Truck">Heavy Truck</option>
                </select>
              </div>
            </div>

            {/* Make & Model */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'الموديل وسنة الصنع' : 'Make & Model'}
              </label>
              <input
                type="text"
                value={makeModel}
                onChange={(e) => setMakeModel(e.target.value)}
                placeholder="e.g. Toyota HiAce 2024"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Mulkiya Expiry Date */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'تاريخ انتهاء الملكية (Mulkiya Expiry)' : 'Mulkiya Expiry Date'}
              </label>
              <input
                type="date"
                value={mulkiyaExpiry}
                onChange={(e) => setMulkiyaExpiry(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Insurance Expiry Date */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'تاريخ انتهاء التأمين (Insurance Expiry)' : 'Insurance Expiry Date'}
              </label>
              <input
                type="date"
                value={insuranceExpiry}
                onChange={(e) => setInsuranceExpiry(e.target.value)}
                required
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
                    ? 'تحديث بيانات المركبة'
                    : 'Update Vehicle'
                  : lang === 'ar'
                  ? 'حفظ المركبة (Save)'
                  : 'Save Vehicle'}
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
