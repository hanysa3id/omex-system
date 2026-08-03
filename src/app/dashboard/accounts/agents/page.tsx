'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  Users,
  Search,
  RefreshCw,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Zap,
  Truck,
  Percent,
  Plus,
  Shield,
} from 'lucide-react';

interface AgentItem {
  id: string;
  fullName: string;
  fullNameAr?: string;
  type: 'Express Agent' | 'Standard Courier' | 'Heavy Cargo' | '3PL Partner';
  zone: string;
  phone: string;
  email: string;
  vehiclePlate?: string;
  commissionRate: number;
  completedOrders: number;
  isActive: boolean;
}

const DEFAULT_AGENTS: AgentItem[] = [
  {
    id: 'agt-201',
    fullName: 'Youssef Al Hosani',
    fullNameAr: 'يوسف الحوسني',
    type: 'Express Agent',
    zone: 'Abu Dhabi',
    phone: '+971506661122',
    email: 'youssef.h@omex.ae',
    vehiclePlate: 'AD-54321',
    commissionRate: 12,
    completedOrders: 420,
    isActive: true,
  },
  {
    id: 'agt-202',
    fullName: 'Bilal Al Shamsi',
    fullNameAr: 'بلال الشامسي',
    type: 'Standard Courier',
    zone: 'Dubai',
    phone: '+971507772233',
    email: 'bilal.s@omex.ae',
    vehiclePlate: 'DXB-98765',
    commissionRate: 10,
    completedOrders: 310,
    isActive: true,
  },
  {
    id: 'agt-203',
    fullName: 'Tariq Al Marzooqi',
    fullNameAr: 'طارق المرزوقي',
    type: 'Express Agent',
    zone: 'Dubai',
    phone: '+971508883344',
    email: 'tariq.m@omex.ae',
    vehiclePlate: 'DXB-11223',
    commissionRate: 14,
    completedOrders: 512,
    isActive: true,
  },
  {
    id: 'agt-204',
    fullName: 'Khaled Al Mazrouei',
    fullNameAr: 'خالد المزروعي',
    type: 'Standard Courier',
    zone: 'Sharjah',
    phone: '+971509994455',
    email: 'khaled.m@omex.ae',
    vehiclePlate: 'SHJ-44332',
    commissionRate: 10,
    completedOrders: 275,
    isActive: true,
  },
  {
    id: 'agt-205',
    fullName: 'FastLogistics Partner LLC',
    fullNameAr: 'شركة فاست لوجستيكس',
    type: '3PL Partner',
    zone: 'Northern Emirates',
    phone: '+971520001111',
    email: 'ops@fastlogistics.ae',
    vehiclePlate: '3PL-FLEET',
    commissionRate: 8,
    completedOrders: 890,
    isActive: true,
  },
];

export default function AgentsManagementPage() {
  const { lang } = useI18n();

  // State
  const [agents, setAgents] = useState<AgentItem[]>(DEFAULT_AGENTS);
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [fullNameAr, setFullNameAr] = useState('');
  const [type, setType] = useState<AgentItem['type']>('Express Agent');
  const [zone, setZone] = useState('Dubai');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [commissionRate, setCommissionRate] = useState<number>(10);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_agents');
      if (saved) {
        setAgents(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage
  const saveAgents = (newAgents: AgentItem[]) => {
    setAgents(newAgents);
    try {
      localStorage.setItem('omex_system_data_v1_agents', JSON.stringify(newAgents));
      localStorage.setItem('omex_system_data_v1_categories_Agents', JSON.stringify(newAgents));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Statistics
  const stats = useMemo(() => {
    const total = agents.length;
    const active = agents.filter((a) => a.isActive !== false).length;
    const express = agents.filter((a) => a.type === 'Express Agent').length;
    const abudhabi = agents.filter((a) => a.zone === 'Abu Dhabi').length;
    const dubai = agents.filter((a) => a.zone === 'Dubai').length;
    const avgCommission =
      total > 0 ? (agents.reduce((sum, a) => sum + (a.commissionRate || 10), 0) / total).toFixed(1) : '10.0';
    const blocked = agents.filter((a) => a.isActive === false).length;

    return { total, active, express, abudhabi, dubai, avgCommission, blocked };
  }, [agents]);

  // Filtered Agents
  const filteredAgents = useMemo(() => {
    return agents.filter((a) => {
      const matchesSearch =
        !search ||
        a.fullName.toLowerCase().includes(search.toLowerCase()) ||
        (a.fullNameAr && a.fullNameAr.includes(search)) ||
        a.phone.includes(search) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        (a.vehiclePlate && a.vehiclePlate.toLowerCase().includes(search.toLowerCase()));

      const matchesZone = zoneFilter === 'All' || a.zone === zoneFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && a.isActive !== false) ||
        (statusFilter === 'Blocked' && a.isActive === false);

      return matchesSearch && matchesZone && matchesStatus;
    });
  }, [agents, search, zoneFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage) || 1;
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAgents.slice(start, start + itemsPerPage);
  }, [filteredAgents, currentPage, itemsPerPage]);

  // Toggle status
  const handleToggleStatus = (id: string) => {
    const updated = agents.map((a) => {
      if (a.id === id) {
        return { ...a, isActive: a.isActive === false ? true : false };
      }
      return a;
    });
    saveAgents(updated);
    showToast(lang === 'ar' ? 'تم تغيير حالة المندوب بنجاح' : 'Agent status toggled successfully');
  };

  // Delete Agent
  const handleDeleteAgent = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المندوب؟' : 'Are you sure you want to delete this agent?')) {
      const updated = agents.filter((a) => a.id !== id);
      saveAgents(updated);
      showToast(lang === 'ar' ? 'تم حذف المندوب بنجاح' : 'Agent deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit Click
  const handleEditClick = (a: AgentItem) => {
    setEditingId(a.id);
    setFullName(a.fullName);
    setFullNameAr(a.fullNameAr || '');
    setType(a.type);
    setZone(a.zone);
    setPhone(a.phone);
    setEmail(a.email);
    setVehiclePlate(a.vehiclePlate || '');
    setCommissionRate(a.commissionRate || 10);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFullName('');
    setFullNameAr('');
    setType('Express Agent');
    setZone('Dubai');
    setPhone('');
    setEmail('');
    setVehiclePlate('');
    setCommissionRate(10);
  };

  // Save / Update
  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم المندوب' : 'Please enter agent name');
      return;
    }

    if (editingId) {
      const updated = agents.map((agt) => {
        if (agt.id === editingId) {
          return {
            ...agt,
            fullName: fullName.trim(),
            fullNameAr: fullNameAr.trim() || undefined,
            type,
            zone,
            phone: phone.trim() || '0500000000',
            email: email.trim() || 'agent@omex.ae',
            vehiclePlate: vehiclePlate.trim() || undefined,
            commissionRate: Number(commissionRate) || 10,
          };
        }
        return agt;
      });
      saveAgents(updated);
      showToast(lang === 'ar' ? 'تم تحديث بيانات المندوب بنجاح' : 'Agent updated successfully');
    } else {
      const newAgent: AgentItem = {
        id: `agt-${Math.floor(200 + Math.random() * 800)}`,
        fullName: fullName.trim(),
        fullNameAr: fullNameAr.trim() || undefined,
        type,
        zone,
        phone: phone.trim() || '0506667788',
        email: email.trim() || 'new.agent@omex.ae',
        vehiclePlate: vehiclePlate.trim() || `DXB-${Math.floor(10000 + Math.random() * 89999)}`,
        commissionRate: Number(commissionRate) || 10,
        completedOrders: 0,
        isActive: true,
      };
      saveAgents([newAgent, ...agents]);
      showToast(lang === 'ar' ? 'تم إضافة المندوب بنجاح' : 'Agent added successfully');
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
            <Users className="w-6 h-6 text-[#E87722]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'إدارة الوكلاء ومندوبي التوصيل (Couriers)' : 'Delivery Agents & Couriers Management'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'إدارة شبكة المندوبين وشركات الطرف الثالث، نسب العمولات، والمناطق المربوطة'
                : 'Manage couriers, 3PL partners, express agents, zone assignments, and commission rates'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setAgents(DEFAULT_AGENTS);
              showToast(lang === 'ar' ? 'تم تحديث قائمة المندوبين' : 'Agents reset to defaults');
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
        {/* Total Couriers */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي المندوبين' : 'Total Couriers'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Active Couriers */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'متاح للعمل' : 'Active On-Duty'}
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{stats.active}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Express Agents */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مندوبو Express' : 'Express Couriers'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.express}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Abu Dhabi Zone */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'منطقة أبوظبي' : 'Abu Dhabi Zone'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.abudhabi}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Dubai Zone */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'منطقة دبي' : 'Dubai Zone'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.dubai}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Avg Commission */}
        <div className="bg-teal-50/70 border border-teal-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
              {lang === 'ar' ? 'متوسط العمولة' : 'Avg Commission'}
            </p>
            <p className="text-xl font-black text-teal-900 mt-1">{stats.avgCommission}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        {/* Off-duty / Blocked */}
        <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
              {lang === 'ar' ? 'محظور / إجازة' : 'Off-Duty'}
            </p>
            <p className="text-2xl font-black text-rose-900 mt-1">{stats.blocked}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
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
                      ? 'بحث باسم المندوب، رقم الهاتف، اللوحة، أو المنطقة...'
                      : 'Search courier name, phone, vehicle plate, or zone...'
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
              {/* Zone Filter */}
              <select
                value={zoneFilter}
                onChange={(e) => {
                  setZoneFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 cursor-pointer"
              >
                <option value="All">{lang === 'ar' ? 'جميع المناطق (All Zones)' : 'All Zones'}</option>
                <option value="Abu Dhabi">{lang === 'ar' ? 'أبوظبي (Abu Dhabi)' : 'Abu Dhabi'}</option>
                <option value="Dubai">{lang === 'ar' ? 'دبي (Dubai)' : 'Dubai'}</option>
                <option value="Sharjah">{lang === 'ar' ? 'الشارقة (Sharjah)' : 'Sharjah'}</option>
                <option value="Northern Emirates">{lang === 'ar' ? 'الإمارات الشمالية' : 'Northern Emirates'}</option>
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
                <option value="All">{lang === 'ar' ? 'جميع الحالات (All Status)' : 'All Status'}</option>
                <option value="Active">{lang === 'ar' ? 'متاح للعمل (Active)' : 'Active'}</option>
                <option value="Blocked">{lang === 'ar' ? 'محظور / إجازة (Blocked)' : 'Blocked'}</option>
              </select>
            </div>
          </div>

          {/* Directory Header Sub-bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'دليل الوكلاء ومندوبي التوصيل' : 'Delivery Couriers Roster'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedAgents.length} من أصل ${filteredAgents.length} مندوب`
                : `Showing ${paginatedAgents.length} of ${filteredAgents.length} agents`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'المندوب والرمز' : 'AGENT & ID'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'النوع والعمولة' : 'TYPE & COMMISSION'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الاتصال واللوحة' : 'CONTACT & VEHICLE'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'المنطقة المربوطة' : 'ASSIGNED ZONE'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedAgents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد وكلاء مطابقون للبحث' : 'No agents matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedAgents.map((a) => {
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
                                    ? 'تنشيط المندوب'
                                    : 'Activate Agent'
                                  : lang === 'ar'
                                  ? 'حظر المندوب'
                                  : 'Block Agent'
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
                              title={lang === 'ar' ? 'تعديل البيانات' : 'Edit Agent'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteAgent(a.id)}
                              title={lang === 'ar' ? 'حذف المندوب' : 'Delete Agent'}
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
                                ? 'محظور / إجازة'
                                : 'Inactive'
                              : lang === 'ar'
                              ? 'متاح للعمل'
                              : 'Active'}
                          </span>
                        </td>

                        {/* Agent & ID */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xs shrink-0">
                              {a.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{a.fullName}</p>
                              {a.fullNameAr && (
                                <p className="text-[11px] text-slate-500 font-semibold">{a.fullNameAr}</p>
                              )}
                              <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                                ID: {a.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type & Commission */}
                        <td className="py-3.5 px-5">
                          <div>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                a.type === 'Express Agent'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              }`}
                            >
                              {a.type}
                            </span>
                            <p className="text-[11px] text-slate-700 font-extrabold mt-1">
                              {lang === 'ar' ? 'العمولة: ' : 'Commission: '}
                              <span className="text-emerald-700 font-mono">{a.commissionRate}%</span>
                            </p>
                          </div>
                        </td>

                        {/* Contact & Vehicle */}
                        <td className="py-3.5 px-5">
                          <div className="space-y-1">
                            <p className="text-slate-800 font-mono font-bold flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {a.phone}
                            </p>
                            {a.vehiclePlate && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-extrabold text-[10px] border border-slate-200">
                                <Truck className="w-3 h-3 text-[#E87722]" />
                                {a.vehiclePlate}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Assigned Zone */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                            {a.zone}
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
              <Users className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل بيانات المندوب'
                    : 'Edit Agent'
                  : lang === 'ar'
                  ? 'إضافة مندوب جديد'
                  : 'Add Delivery Agent'}
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
              ? 'أدخل بيانات المندوب ومنطقته ليتم ربطه بجدول تعيين الشحنات والعمولات'
              : 'Enter courier profile and zone assignment for delivery routing'}
          </p>

          <form onSubmit={handleSaveAgent} className="space-y-4">
            {/* Full Name EN */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم المندوب (English)' : 'Agent Name (EN)'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Youssef Al Hosani"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Full Name AR */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم المندوب (بالعربية)' : 'Agent Name (AR)'}
              </label>
              <input
                type="text"
                value={fullNameAr}
                onChange={(e) => setFullNameAr(e.target.value)}
                placeholder="مثال: يوسف الحوسني"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 text-end"
              />
            </div>

            {/* Agent Type & Zone */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'نوع المندوب' : 'Agent Type'}
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AgentItem['type'])}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Express Agent">Express Agent</option>
                  <option value="Standard Courier">Standard Courier</option>
                  <option value="Heavy Cargo">Heavy Cargo</option>
                  <option value="3PL Partner">3PL Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'المنطقة المربوطة' : 'Assigned Zone'}
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Northern Emirates">Northern Emirates</option>
                </select>
              </div>
            </div>

            {/* Phone & Vehicle Plate */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Mobile No'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0506661122"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رقم المركبة' : 'Vehicle Plate'}
                </label>
                <input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="AD-54321"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Email & Commission */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@omex.ae"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'نسبة العمولة %' : 'Commission %'}
                </label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
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
                    ? 'تحديث بيانات المندوب'
                    : 'Update Agent'
                  : lang === 'ar'
                  ? 'حفظ المندوب (Save)'
                  : 'Save Agent'}
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
