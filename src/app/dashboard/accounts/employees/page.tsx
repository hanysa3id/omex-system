'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  UserCheck,
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
  Briefcase,
  Users,
  Shield,
  Plus,
  Building,
} from 'lucide-react';

interface EmployeeItem {
  id: string;
  fullName: string;
  fullNameAr?: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  emirate: string;
  salary: number;
  isActive: boolean;
}

const DEFAULT_EMPLOYEES: EmployeeItem[] = [
  {
    id: 'emp-101',
    fullName: 'Ahmed Khalil Al Mansoori',
    fullNameAr: 'أحمد خليل المنصوري',
    designation: 'Senior Dispatcher',
    department: 'Operations',
    phone: '+971501234567',
    email: 'ahmed.k@omex.ae',
    emirate: 'Dubai',
    salary: 12000,
    isActive: true,
  },
  {
    id: 'emp-102',
    fullName: 'Fatima Al Hashimi',
    fullNameAr: 'فاطمة الهاشمي',
    designation: 'Chief Accountant',
    department: 'Finance',
    phone: '+971502345678',
    email: 'fatima.h@omex.ae',
    emirate: 'Abu Dhabi',
    salary: 15000,
    isActive: true,
  },
  {
    id: 'emp-103',
    fullName: 'Mohammed Rashed Al Nuaimi',
    fullNameAr: 'محمد راشد النعيمي',
    designation: 'Warehouse Supervisor',
    department: 'Warehouse',
    phone: '+971503456789',
    email: 'm.rashed@omex.ae',
    emirate: 'Sharjah',
    salary: 9500,
    isActive: true,
  },
  {
    id: 'emp-104',
    fullName: 'Sara Al Maktoum',
    fullNameAr: 'سارة المكتوم',
    designation: 'Customer Service Lead',
    department: 'Customer Care',
    phone: '+971504567890',
    email: 'sara.m@omex.ae',
    emirate: 'Dubai',
    salary: 11000,
    isActive: true,
  },
  {
    id: 'emp-105',
    fullName: 'Fahad Al Qasimi',
    fullNameAr: 'فهد القاسمي',
    designation: 'Fleet Coordinator',
    department: 'Logistics',
    phone: '+971505678901',
    email: 'fahad.q@omex.ae',
    emirate: 'Dubai',
    salary: 10500,
    isActive: true,
  },
];

export default function EmployeesManagementPage() {
  const { lang } = useI18n();

  // State
  const [employees, setEmployees] = useState<EmployeeItem[]>(DEFAULT_EMPLOYEES);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [fullNameAr, setFullNameAr] = useState('');
  const [designation, setDesignation] = useState('Dispatcher');
  const [department, setDepartment] = useState('Operations');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [salary, setSalary] = useState<number>(8000);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_employees');
      if (saved) {
        setEmployees(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage
  const saveEmployees = (newEmps: EmployeeItem[]) => {
    setEmployees(newEmps);
    try {
      localStorage.setItem('omex_system_data_v1_employees', JSON.stringify(newEmps));
      localStorage.setItem('omex_system_data_v1_categories_Employees', JSON.stringify(newEmps));
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
    const total = employees.length;
    const active = employees.filter((e) => e.isActive !== false).length;
    const ops = employees.filter((e) => e.department === 'Operations' || e.department === 'Logistics').length;
    const finance = employees.filter((e) => e.department === 'Finance').length;
    const care = employees.filter((e) => e.department === 'Customer Care').length;
    const warehouse = employees.filter((e) => e.department === 'Warehouse').length;
    const blocked = employees.filter((e) => e.isActive === false).length;

    return { total, active, ops, finance, care, warehouse, blocked };
  }, [employees]);

  // Filtered Employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch =
        !search ||
        e.fullName.toLowerCase().includes(search.toLowerCase()) ||
        (e.fullNameAr && e.fullNameAr.includes(search)) ||
        e.phone.includes(search) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.designation.toLowerCase().includes(search.toLowerCase());

      const matchesDept = deptFilter === 'All' || e.department === deptFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && e.isActive !== false) ||
        (statusFilter === 'Blocked' && e.isActive === false);

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, search, deptFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  // Toggle status
  const handleToggleStatus = (id: string) => {
    const updated = employees.map((e) => {
      if (e.id === id) {
        return { ...e, isActive: e.isActive === false ? true : false };
      }
      return e;
    });
    saveEmployees(updated);
    showToast(lang === 'ar' ? 'تم تغيير حالة الموظف بنجاح' : 'Employee status toggled successfully');
  };

  // Delete Employee
  const handleDeleteEmployee = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الموظف؟' : 'Are you sure you want to delete this employee?')) {
      const updated = employees.filter((e) => e.id !== id);
      saveEmployees(updated);
      showToast(lang === 'ar' ? 'تم حذف الموظف بنجاح' : 'Employee deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit Click
  const handleEditClick = (e: EmployeeItem) => {
    setEditingId(e.id);
    setFullName(e.fullName);
    setFullNameAr(e.fullNameAr || '');
    setDesignation(e.designation);
    setDepartment(e.department);
    setPhone(e.phone);
    setEmail(e.email);
    setEmirate(e.emirate);
    setSalary(e.salary || 8000);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFullName('');
    setFullNameAr('');
    setDesignation('Dispatcher');
    setDepartment('Operations');
    setPhone('');
    setEmail('');
    setEmirate('Dubai');
    setSalary(8000);
  };

  // Save / Update
  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم الموظف' : 'Please enter employee name');
      return;
    }

    if (editingId) {
      const updated = employees.map((emp) => {
        if (emp.id === editingId) {
          return {
            ...emp,
            fullName: fullName.trim(),
            fullNameAr: fullNameAr.trim() || undefined,
            designation,
            department,
            phone: phone.trim() || '0500000000',
            email: email.trim() || 'staff@omex.ae',
            emirate,
            salary: Number(salary) || 8000,
          };
        }
        return emp;
      });
      saveEmployees(updated);
      showToast(lang === 'ar' ? 'تم تحديث بيانات الموظف بنجاح' : 'Employee updated successfully');
    } else {
      const newEmp: EmployeeItem = {
        id: `emp-${Math.floor(100 + Math.random() * 900)}`,
        fullName: fullName.trim(),
        fullNameAr: fullNameAr.trim() || undefined,
        designation,
        department,
        phone: phone.trim() || '0501112233',
        email: email.trim() || 'new.staff@omex.ae',
        emirate,
        salary: Number(salary) || 8000,
        isActive: true,
      };
      saveEmployees([newEmp, ...employees]);
      showToast(lang === 'ar' ? 'تم إضافة الموظف بنجاح' : 'Employee created successfully');
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
            <UserCheck className="w-6 h-6 text-[#E87722]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'إدارة موظفي الشركة والكادر الإداري' : 'Company Employees & Staff Directory'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'إدارة الموظفين والإداريين، الأقسام، المسميات الوظيفية، وفروع التوصيل'
                : 'Manage staff profiles, designations, operational departments, and branch assignments'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setEmployees(DEFAULT_EMPLOYEES);
              showToast(lang === 'ar' ? 'تم تحديث قائمة الموظفين' : 'Employees reset to defaults');
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
        {/* Total Employees */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي الموظفين' : 'Total Staff'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Active Staff */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'على رأس العمل' : 'Active Staff'}
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{stats.active}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Operations */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'العمليات والتوجيه' : 'Operations'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.ops}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Finance */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'المحاسبة والمالية' : 'Finance'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.finance}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
        </div>

        {/* Customer Care */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'خدمة العملاء' : 'Customer Care'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.care}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Warehouse */}
        <div className="bg-teal-50/70 border border-teal-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إدارة المستودعات' : 'Warehouse'}
            </p>
            <p className="text-2xl font-black text-teal-900 mt-1">{stats.warehouse}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Blocked / Leave */}
        <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجازة / محظور' : 'Inactive / Leave'}
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
                      ? 'بحث باسم الموظف، المسمى، الهاتف، أو القسم...'
                      : 'Search staff name, title, department, phone...'
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
              {/* Department Filter */}
              <select
                value={deptFilter}
                onChange={(e) => {
                  setDeptFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 cursor-pointer"
              >
                <option value="All">{lang === 'ar' ? 'جميع الأقسام (All Depts)' : 'All Departments'}</option>
                <option value="Operations">{lang === 'ar' ? 'العمليات (Operations)' : 'Operations'}</option>
                <option value="Finance">{lang === 'ar' ? 'المحاسبة (Finance)' : 'Finance'}</option>
                <option value="Customer Care">{lang === 'ar' ? 'خدمة العملاء (Customer Care)' : 'Customer Care'}</option>
                <option value="Warehouse">{lang === 'ar' ? 'المستودعات (Warehouse)' : 'Warehouse'}</option>
                <option value="Logistics">{lang === 'ar' ? 'الدعم الفني والخدمات' : 'Logistics'}</option>
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
                <option value="Active">{lang === 'ar' ? 'على رأس العمل (Active)' : 'Active'}</option>
                <option value="Blocked">{lang === 'ar' ? 'محظور / إجازة (Blocked)' : 'Blocked'}</option>
              </select>
            </div>
          </div>

          {/* Directory Header Sub-bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'قائمة الموظفين والكادر الإداري' : 'Employees Staff Roster'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedEmployees.length} من أصل ${filteredEmployees.length} موظف`
                : `Showing ${paginatedEmployees.length} of ${filteredEmployees.length} employees`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الموظف والرمز' : 'EMPLOYEE & ID'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'المسمى والقسم' : 'DESIGNATION & DEPT'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'معلومات الاتصال' : 'CONTACT INFO'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الفرع / الإمارة' : 'EMIRATE'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد موظفون مطابقون للبحث' : 'No employees matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedEmployees.map((e) => {
                    const isBlocked = e.isActive === false;

                    return (
                      <tr
                        key={e.id}
                        className={`hover:bg-slate-50/80 transition ${
                          editingId === e.id ? 'bg-indigo-50/60' : ''
                        }`}
                      >
                        {/* Options */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(e.id)}
                              title={
                                isBlocked
                                  ? lang === 'ar'
                                    ? 'تنشيط الموظف'
                                    : 'Activate Employee'
                                  : lang === 'ar'
                                  ? 'حظر / إجازة'
                                  : 'Block Employee'
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
                              onClick={() => handleEditClick(e)}
                              title={lang === 'ar' ? 'تعديل البيانات' : 'Edit Employee'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteEmployee(e.id)}
                              title={lang === 'ar' ? 'حذف الموظف' : 'Delete Employee'}
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
                              ? 'نشط'
                              : 'Active'}
                          </span>
                        </td>

                        {/* Employee & ID */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xs shrink-0">
                              {e.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{e.fullName}</p>
                              {e.fullNameAr && (
                                <p className="text-[11px] text-slate-500 font-semibold">{e.fullNameAr}</p>
                              )}
                              <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                                ID: {e.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Designation & Dept */}
                        <td className="py-3.5 px-5">
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {e.designation}
                            </span>
                            <p className="text-[11px] text-slate-600 font-bold mt-1">
                              {e.department}
                            </p>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-5">
                          <div className="space-y-0.5">
                            <p className="text-slate-800 font-mono font-bold flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {e.phone}
                            </p>
                            <p className="text-slate-500 text-[11px] flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {e.email}
                            </p>
                          </div>
                        </td>

                        {/* Emirate */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                            {e.emirate}
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
              <UserCheck className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل بيانات الموظف'
                    : 'Edit Employee'
                  : lang === 'ar'
                  ? 'إضافة موظف جديد'
                  : 'Add New Employee'}
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
              ? 'أدخل بيانات الموظف ليتمكن من استلام صلاحيات النظام وإدارة الشحنات'
              : 'Enter staff credentials for access and operation tasks'}
          </p>

          <form onSubmit={handleSaveEmployee} className="space-y-4">
            {/* Full Name EN */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم الموظف (English)' : 'Full Name (EN)'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ahmed Al Mansoori"
                required
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
              />
            </div>

            {/* Full Name AR */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'اسم الموظف (بالعربية)' : 'Full Name (AR)'}
              </label>
              <input
                type="text"
                value={fullNameAr}
                onChange={(e) => setFullNameAr(e.target.value)}
                placeholder="مثال: أحمد المنصوري"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 text-end"
              />
            </div>

            {/* Designation & Dept */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'المسمى الوظيفي' : 'Designation'}
                </label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Dispatcher">Dispatcher</option>
                  <option value="Senior Dispatcher">Senior Dispatcher</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Chief Accountant">Chief Accountant</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Warehouse Supervisor">Warehouse Supervisor</option>
                  <option value="Fleet Coordinator">Fleet Coordinator</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'القسم' : 'Department'}
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                >
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="Customer Care">Customer Care</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>
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
                  {lang === 'ar' ? 'الإمارة / الفرع' : 'Emirate Branch'}
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
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                </select>
              </div>
            </div>

            {/* Email & Salary */}
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
                  {lang === 'ar' ? 'الراتب الشهري AED' : 'Monthly Salary AED'}
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
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
                    ? 'تحديث بيانات الموظف'
                    : 'Update Employee'
                  : lang === 'ar'
                  ? 'حفظ الموظف (Save)'
                  : 'Save Employee'}
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
