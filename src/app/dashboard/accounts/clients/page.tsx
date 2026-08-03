'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  Building2,
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
  CreditCard,
  TrendingUp,
  DollarSign,
  Plus,
  Crown,
} from 'lucide-react';
import { Client } from '@/types';
import { INITIAL_CLIENTS } from '@/lib/mockData';

export default function ClientsManagementPage() {
  const { lang } = useI18n();

  // State
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState('');
  const [emirateFilter, setEmirateFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyNameAr, setCompanyNameAr] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [address, setAddress] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [creditLimit, setCreditLimit] = useState<number>(20000);
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_clients');
      if (saved) {
        setClients(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage & Categories
  const saveClients = (newClients: Client[]) => {
    setClients(newClients);
    try {
      localStorage.setItem('omex_system_data_v1_clients', JSON.stringify(newClients));
      localStorage.setItem('omex_system_data_v1_categories_Clients', JSON.stringify(newClients));
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
    const total = clients.length;
    const active = clients.filter((c) => c.isActive !== false).length;
    const vip = clients.filter((c) => c.creditLimit >= 30000).length;
    const dubai = clients.filter((c) => c.emirate === 'Dubai').length;
    const abudhabi = clients.filter((c) => c.emirate === 'Abu Dhabi').length;
    const totalCredit = clients.reduce((sum, c) => sum + (c.creditLimit || 0), 0);
    const totalBalance = clients.reduce((sum, c) => sum + (c.currentBalance || 0), 0);

    return { total, active, vip, dubai, abudhabi, totalCredit, totalBalance };
  }, [clients]);

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch =
        !search ||
        c.companyName.toLowerCase().includes(search.toLowerCase()) ||
        (c.companyNameAr && c.companyNameAr.includes(search)) ||
        c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase());

      const matchesEmirate = emirateFilter === 'All' || c.emirate === emirateFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && c.isActive !== false) ||
        (statusFilter === 'Blocked' && c.isActive === false);

      return matchesSearch && matchesEmirate && matchesStatus;
    });
  }, [clients, search, emirateFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage) || 1;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(start, start + itemsPerPage);
  }, [filteredClients, currentPage, itemsPerPage]);

  // Toggle status
  const handleToggleStatus = (id: string) => {
    const updated = clients.map((c) => {
      if (c.id === id) {
        return { ...c, isActive: c.isActive === false ? true : false };
      }
      return c;
    });
    saveClients(updated);
    showToast(lang === 'ar' ? 'تم تحديث حالة العميل بنجاح' : 'Client status updated successfully');
  };

  // Delete Client
  const handleDeleteClient = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا العميل؟' : 'Are you sure you want to delete this client?')) {
      const updated = clients.filter((c) => c.id !== id);
      saveClients(updated);
      showToast(lang === 'ar' ? 'تم حذف العميل بنجاح' : 'Client deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit Click
  const handleEditClick = (c: Client) => {
    setEditingId(c.id);
    setCompanyName(c.companyName);
    setCompanyNameAr(c.companyNameAr || '');
    setContactPerson(c.contactPerson);
    setPhone(c.phone);
    setEmail(c.email);
    setEmirate(c.emirate);
    setAddress(c.address || '');
    setTaxNumber(c.taxNumber || '');
    setCreditLimit(c.creditLimit || 20000);
    setCurrentBalance(c.currentBalance || 0);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setCompanyName('');
    setCompanyNameAr('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setEmirate('Dubai');
    setAddress('');
    setTaxNumber('');
    setCreditLimit(20000);
    setCurrentBalance(0);
  };

  // Save / Update
  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم الشركة' : 'Please enter company name');
      return;
    }

    if (editingId) {
      const updated = clients.map((c) => {
        if (c.id === editingId) {
          return {
            ...c,
            companyName: companyName.trim(),
            companyNameAr: companyNameAr.trim() || undefined,
            contactPerson: contactPerson.trim(),
            phone: phone.trim(),
            email: email.trim(),
            emirate,
            address: address.trim(),
            taxNumber: taxNumber.trim(),
            creditLimit: Number(creditLimit) || 0,
            currentBalance: Number(currentBalance) || 0,
          };
        }
        return c;
      });
      saveClients(updated);
      showToast(lang === 'ar' ? 'تم تحديث بيانات العميل بنجاح' : 'Client updated successfully');
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        companyName: companyName.trim(),
        companyNameAr: companyNameAr.trim() || undefined,
        contactPerson: contactPerson.trim() || 'Principal Contact',
        phone: phone.trim() || '0500000000',
        email: email.trim() || 'info@client.ae',
        emirate,
        address: address.trim() || `${emirate}, UAE`,
        taxNumber: taxNumber.trim() || `100${Math.floor(100000000 + Math.random() * 900000000)}00003`,
        creditLimit: Number(creditLimit) || 20000,
        currentBalance: Number(currentBalance) || 0,
        isActive: true,
      };
      saveClients([newClient, ...clients]);
      showToast(lang === 'ar' ? 'تم إضافة العميل بنجاح' : 'Client added successfully');
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
            <Building2 className="w-6 h-6 text-[#E87722]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'إدارة العملاء التجار (الشركات)' : 'Business Clients Management'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'إدارة الحسابات التجارية، الحدود الائتمانية، وأرصدة ومستحقات الشركات'
                : 'Manage corporate accounts, credit limits, TRN numbers, and active balances'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setClients(INITIAL_CLIENTS);
              showToast(lang === 'ar' ? 'تم تحديث قائمة العملاء للافتراضي' : 'Clients refreshed to defaults');
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
        {/* Total Clients */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'عملاء نشطون' : 'Active Clients'}
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{stats.active}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* VIP/Enterprise Clients */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'حسابات كبرى (VIP)' : 'VIP Clients'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.vip}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        {/* Dubai Clients */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'عملاء دبي' : 'Dubai Clients'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.dubai}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Abu Dhabi Clients */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'عملاء أبوظبي' : 'Abu Dhabi'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.abudhabi}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Total Credit Limit */}
        <div className="bg-teal-50/70 border border-teal-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
              {lang === 'ar' ? 'الحد الائتماني' : 'Total Credit'}
            </p>
            <p className="text-sm font-black text-teal-900 mt-1">
              {(stats.totalCredit / 1000).toFixed(0)}k AED
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        {/* Total Current Balance */}
        <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مستحقات العملاء' : 'Total Balance'}
            </p>
            <p className="text-sm font-black text-rose-900 mt-1">
              {(stats.totalBalance / 1000).toFixed(1)}k AED
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
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
                      ? 'بحث باسم الشركة، مسؤول الاتصال، الهاتف، أو البريد...'
                      : 'Search company, contact, phone, or email...'
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
                <option value="All">{lang === 'ar' ? 'جميع الإمارات (All Emirates)' : 'All Emirates'}</option>
                <option value="Abu Dhabi">{lang === 'ar' ? 'أبوظبي (Abu Dhabi)' : 'Abu Dhabi'}</option>
                <option value="Dubai">{lang === 'ar' ? 'دبي (Dubai)' : 'Dubai'}</option>
                <option value="Sharjah">{lang === 'ar' ? 'الشارقة (Sharjah)' : 'Sharjah'}</option>
                <option value="Ajman">{lang === 'ar' ? 'عجمان (Ajman)' : 'Ajman'}</option>
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
                <option value="Active">{lang === 'ar' ? 'نشط (Active)' : 'Active'}</option>
                <option value="Blocked">{lang === 'ar' ? 'محظور (Blocked)' : 'Blocked'}</option>
              </select>
            </div>
          </div>

          {/* Directory Header Sub-bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'دليل الشركات والعملاء' : 'Clients Directory'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedClients.length} من أصل ${filteredClients.length} عميل`
                : `Showing ${paginatedClients.length} of ${filteredClients.length} clients`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الشركة والضريبة' : 'COMPANY & TRN'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'جهة الاتصال' : 'CONTACT PERSON'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الائتمان والرصيد' : 'CREDIT & BALANCE'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الإمارة' : 'EMIRATE'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedClients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد شركات مطابقة للبحث' : 'No clients matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedClients.map((c) => {
                    const isBlocked = c.isActive === false;
                    const utilPercent = Math.min(
                      100,
                      Math.max(0, Math.round(((c.currentBalance || 0) / (c.creditLimit || 1)) * 100))
                    );

                    return (
                      <tr
                        key={c.id}
                        className={`hover:bg-slate-50/80 transition ${
                          editingId === c.id ? 'bg-indigo-50/60' : ''
                        }`}
                      >
                        {/* Options */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(c.id)}
                              title={
                                isBlocked
                                  ? lang === 'ar'
                                    ? 'تنشيط العميل'
                                    : 'Unlock Client'
                                  : lang === 'ar'
                                  ? 'حظر العميل'
                                  : 'Block Client'
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
                              onClick={() => handleEditClick(c)}
                              title={lang === 'ar' ? 'تعديل البيانات' : 'Edit Client'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteClient(c.id)}
                              title={lang === 'ar' ? 'حذف العميل' : 'Delete Client'}
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
                                ? 'محظور'
                                : 'Blocked'
                              : lang === 'ar'
                              ? 'نشط'
                              : 'Active'}
                          </span>
                        </td>

                        {/* Company & TRN */}
                        <td className="py-3.5 px-5">
                          <div>
                            <p className="font-bold text-slate-900">{c.companyName}</p>
                            {c.companyNameAr && (
                              <p className="text-[11px] text-slate-500 font-semibold">{c.companyNameAr}</p>
                            )}
                            <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                              TRN: {c.taxNumber || '100000000000003'}
                            </p>
                          </div>
                        </td>

                        {/* Contact Person */}
                        <td className="py-3.5 px-5">
                          <div>
                            <p className="font-bold text-slate-800">{c.contactPerson}</p>
                            <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {c.phone}
                            </p>
                          </div>
                        </td>

                        {/* Financials (Credit & Balance) */}
                        <td className="py-3.5 px-5">
                          <div className="space-y-1 w-36">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-bold text-slate-600">
                                {c.currentBalance?.toLocaleString()} AED
                              </span>
                              <span className="text-slate-400 font-mono">
                                / {c.creditLimit?.toLocaleString()} AED
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  utilPercent > 80
                                    ? 'bg-red-500'
                                    : utilPercent > 50
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-500'
                                }`}
                                style={{ width: `${utilPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Emirate */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                            {c.emirate}
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

        {/* Right Create / Edit Client Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل بيانات العميل'
                    : 'Edit Client'
                  : lang === 'ar'
                  ? 'إضافة عميل جديد'
                  : 'Create Business Client'}
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
              ? 'أدخل بيانات الشركة والحد الائتماني ليتم ربطه بنظام الطلبات والفواتير'
              : 'Enter company profile and credit limits for order linkage'}
          </p>

          <form onSubmit={handleSaveClient} className="space-y-4">
            {/* Company Name EN */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم الشركة (English)' : 'Company Name (EN)'}
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Noon Express LLC"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Company Name AR */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم الشركة (بالعربية)' : 'Company Name (AR)'}
              </label>
              <input
                type="text"
                value={companyNameAr}
                onChange={(e) => setCompanyNameAr(e.target.value)}
                placeholder="مثال: شركة نون إكسبرس ذ.م.م"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 text-end"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'الشخص المسؤول (Contact Person)' : 'Contact Person'}
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Ali Hassan"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Phone & Emirate */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Mobile No'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0501234567"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الإمارة' : 'Emirate'}
                </label>
                <select
                  value={emirate}
                  onChange={(e) => setEmirate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                </select>
              </div>
            </div>

            {/* Email & Tax Number */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@client.ae"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الرقم الضريبي TRN' : 'TRN Tax Number'}
                </label>
                <input
                  type="text"
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  placeholder="100000...03"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Credit Limit & Balance */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الحد الائتماني AED' : 'Credit Limit AED'}
                </label>
                <input
                  type="number"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الرصيد الحالي AED' : 'Current Balance'}
                </label>
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
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
                    ? 'تحديث بيانات الشركة'
                    : 'Update Client'
                  : lang === 'ar'
                  ? 'حفظ العميل (Save)'
                  : 'Save Client'}
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
