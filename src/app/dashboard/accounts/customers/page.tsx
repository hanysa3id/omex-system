'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  User,
  Search,
  RefreshCw,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  Phone,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Home,
  MessageSquare,
  Plus,
  Shield,
  ShoppingBag,
} from 'lucide-react';
import { Customer } from '@/types';
import { INITIAL_CUSTOMERS } from '@/lib/mockData';

export default function CustomersManagementPage() {
  const { lang } = useI18n();

  // State
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [emirateFilter, setEmirateFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [area, setArea] = useState('Business Bay');
  const [addressLine, setAddressLine] = useState('');
  const [poBox, setPoBox] = useState('');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_customers');
      if (saved) {
        setCustomers(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage & Categories
  const saveCustomers = (newCustomers: Customer[]) => {
    setCustomers(newCustomers);
    try {
      localStorage.setItem('omex_system_data_v1_customers', JSON.stringify(newCustomers));
      localStorage.setItem('omex_system_data_v1_categories_Customers', JSON.stringify(newCustomers));
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
    const total = customers.length;
    const active = total; // Default active
    const abudhabi = customers.filter((c) => c.emirate === 'Abu Dhabi').length;
    const dubai = customers.filter((c) => c.emirate === 'Dubai').length;
    const sharjah = customers.filter((c) => c.emirate === 'Sharjah').length;
    const northern = customers.filter(
      (c) =>
        c.emirate !== 'Abu Dhabi' &&
        c.emirate !== 'Dubai' &&
        c.emirate !== 'Sharjah'
    ).length;
    const cod = customers.length; // recipients

    return { total, active, abudhabi, dubai, sharjah, northern, cod };
  }, [customers]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        (c.altPhone && c.altPhone.includes(search)) ||
        c.area.toLowerCase().includes(search.toLowerCase()) ||
        c.addressLine.toLowerCase().includes(search.toLowerCase());

      const matchesEmirate = emirateFilter === 'All' || c.emirate === emirateFilter;

      return matchesSearch && matchesEmirate;
    });
  }, [customers, search, emirateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  // Delete Customer
  const handleDeleteCustomer = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الزبون؟' : 'Are you sure you want to delete this customer?')) {
      const updated = customers.filter((c) => c.id !== id);
      saveCustomers(updated);
      showToast(lang === 'ar' ? 'تم حذف الزبون بنجاح' : 'Customer deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit Click
  const handleEditClick = (c: Customer) => {
    setEditingId(c.id);
    setName(c.name);
    setPhone(c.phone);
    setAltPhone(c.altPhone || '');
    setEmirate(c.emirate);
    setArea(c.area);
    setAddressLine(c.addressLine);
    setPoBox(c.poBox || '');
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPhone('');
    setAltPhone('');
    setEmirate('Dubai');
    setArea('Business Bay');
    setAddressLine('');
    setPoBox('');
  };

  // Save / Update
  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم الزبون' : 'Please enter customer name');
      return;
    }

    if (editingId) {
      const updated = customers.map((c) => {
        if (c.id === editingId) {
          return {
            ...c,
            name: name.trim(),
            phone: phone.trim() || '0500000000',
            altPhone: altPhone.trim() || undefined,
            emirate,
            area: area.trim() || 'Central',
            addressLine: addressLine.trim() || `${emirate}, UAE`,
            poBox: poBox.trim() || undefined,
          };
        }
        return c;
      });
      saveCustomers(updated);
      showToast(lang === 'ar' ? 'تم تحديث بيانات الزبون بنجاح' : 'Customer updated successfully');
    } else {
      const newCustomer: Customer = {
        id: `cust-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        phone: phone.trim() || '0501112233',
        altPhone: altPhone.trim() || undefined,
        emirate,
        area: area.trim() || 'Central',
        addressLine: addressLine.trim() || `${emirate}, UAE`,
        poBox: poBox.trim() || undefined,
      };
      saveCustomers([newCustomer, ...customers]);
      showToast(lang === 'ar' ? 'تم إضافة الزبون بنجاح' : 'Customer added successfully');
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
            <User className="w-6 h-6 text-[#E87722]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'إدارة زبائن ومستلمي الشحنات' : 'Recipients & Customers Directory'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'قاعدة بيانات مستلمي الطرود، العناوين التفصيلية، المناطق المربوطة، وأرقام الهواتف'
                : 'Manage recipient profiles, detailed delivery addresses, linked areas, and contact numbers'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setCustomers(INITIAL_CUSTOMERS);
              showToast(lang === 'ar' ? 'تم تحديث قائمة الزبائن للافتراضي' : 'Customers refreshed to defaults');
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
        {/* Total Customers */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي الزبائن' : 'Total Recipients'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'زبائن نشطون' : 'Active Profiles'}
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{stats.active}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Abu Dhabi */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'أبوظبي' : 'Abu Dhabi'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.abudhabi}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Dubai */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'دبي' : 'Dubai'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.dubai}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Sharjah */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'الشارقة' : 'Sharjah'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.sharjah}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
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
            <Home className="w-5 h-5" />
          </div>
        </div>

        {/* COD Customers */}
        <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
              {lang === 'ar' ? 'دفع عند الاستلام COD' : 'COD Preferred'}
            </p>
            <p className="text-2xl font-black text-rose-900 mt-1">{stats.cod}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
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
                      ? 'بحث باسم الزبون، الهاتف، المنطقة، أو العنوان...'
                      : 'Search customer name, mobile, area, or address...'
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
            </div>
          </div>

          {/* Directory Header Sub-bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'دليل المستلمين وعناوين التوصيل' : 'Recipients Roster & Delivery Addresses'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedCustomers.length} من أصل ${filteredCustomers.length} زبون`
                : `Showing ${paginatedCustomers.length} of ${filteredCustomers.length} customers`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الزبون والرمز' : 'CUSTOMER & ID'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'أرقام الاتصال' : 'CONTACT NUMBERS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'العنوان التفصيلي' : 'STREET ADDRESS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الإمارة والمنطقة' : 'EMIRATE & AREA'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد زبائن مطابقون للبحث' : 'No customers matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((c) => {
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
                              onClick={() => handleEditClick(c)}
                              title={lang === 'ar' ? 'تعديل البيانات' : 'Edit Customer'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteCustomer(c.id)}
                              title={lang === 'ar' ? 'حذف الزبون' : 'Delete Customer'}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {lang === 'ar' ? 'نشط' : 'Active'}
                          </span>
                        </td>

                        {/* Customer & ID */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xs shrink-0">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{c.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                                ID: {c.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Numbers */}
                        <td className="py-3.5 px-5">
                          <div className="space-y-1">
                            <p className="text-slate-800 font-mono font-bold flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {c.phone}
                            </p>
                            {c.altPhone && (
                              <p className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                                <MessageSquare className="w-3 h-3 text-slate-400" />
                                {c.altPhone}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Street Address */}
                        <td className="py-3.5 px-5">
                          <p className="text-slate-800 font-semibold max-w-[240px] truncate" title={c.addressLine}>
                            {c.addressLine}
                          </p>
                          {c.poBox && (
                            <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                              PO Box: {c.poBox}
                            </p>
                          )}
                        </td>

                        {/* Emirate & Area */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                            {c.emirate}
                          </span>
                          <p className="text-[11px] text-slate-600 font-bold mt-1">{c.area}</p>
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
              <User className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل بيانات الزبون'
                    : 'Edit Customer'
                  : lang === 'ar'
                  ? 'إضافة زبون جديد'
                  : 'Add New Recipient'}
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
              ? 'أدخل بيانات الزبون وعنوانه ليظهر تلقائياً في الاقتراحات السريعة عند إنشاء طلب توصيل'
              : 'Add recipient profile to auto-suggest in order creation and waybill printing'}
          </p>

          <form onSubmit={handleSaveCustomer} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم الزبون' : 'Customer Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sara Al Hashimi"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Phone & Alt Phone */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الهاتف الأساسي' : 'Primary Phone'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0501112233"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'هاتف بديل / واتساب' : 'Alt / WhatsApp'}
                </label>
                <input
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="0529998877"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Emirate & Area */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'الإمارة' : 'Emirate'}
                </label>
                <select
                  value={emirate}
                  onChange={(e) => setEmirate(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
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

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'المنطقة' : 'Area / District'}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Business Bay"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Detailed Street Address */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'العنوان التفصيلي' : 'Detailed Address'}
              </label>
              <textarea
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                rows={2}
                placeholder="e.g. Tower A, Floor 14, Flat 1402, Street 12"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* PO Box */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'صندوق البريد PO Box' : 'PO Box Number'}
              </label>
              <input
                type="text"
                value={poBox}
                onChange={(e) => setPoBox(e.target.value)}
                placeholder="e.g. 123456"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
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
                    ? 'تحديث بيانات الزبون'
                    : 'Update Customer'
                  : lang === 'ar'
                  ? 'حفظ الزبون (Save)'
                  : 'Save Customer'}
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
