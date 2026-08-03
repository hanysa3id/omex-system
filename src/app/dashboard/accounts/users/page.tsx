'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { useData } from '@/lib/context/DataContext';
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Briefcase,
  Truck,
  Building2,
  Search,
  RefreshCw,
  Filter,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  UserPlus,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Key,
} from 'lucide-react';

export type UserRole = 'Admin' | 'Employee' | 'Driver' | 'Client';
export type UserStatus = 'Active' | 'Blocked';

export interface PortalUser {
  id: string;
  userCode: string;
  username: string;
  role: UserRole;
  linkedAccountName: string;
  linkedAccountPhone: string;
  linkedAccountId?: string;
  status: UserStatus;
  createdAt: string;
}

const INITIAL_PORTAL_USERS: PortalUser[] = [
  {
    id: '1',
    userCode: '50010',
    username: 'admin.omex',
    role: 'Admin',
    linkedAccountName: 'System Administrator',
    linkedAccountPhone: '0501234567',
    status: 'Active',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    userCode: '50011',
    username: 'dispatcher.dubai',
    role: 'Employee',
    linkedAccountName: 'Khalid Al Mansoori',
    linkedAccountPhone: '0569876543',
    status: 'Active',
    createdAt: '2024-01-05',
  },
  {
    id: '3',
    userCode: '50012',
    username: 'driver.ahmed',
    role: 'Driver',
    linkedAccountName: 'Ahmed K.',
    linkedAccountPhone: '0505555501',
    status: 'Active',
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    userCode: '50013',
    username: 'driver.omar',
    role: 'Driver',
    linkedAccountName: 'Omar H.',
    linkedAccountPhone: '0505555502',
    status: 'Active',
    createdAt: '2024-01-11',
  },
  {
    id: '5',
    userCode: '50014',
    username: 'noon.client',
    role: 'Client',
    linkedAccountName: 'Noon.com Express',
    linkedAccountPhone: '0543210987',
    status: 'Active',
    createdAt: '2024-01-12',
  },
  {
    id: '6',
    userCode: '50015',
    username: 'namshi.client',
    role: 'Client',
    linkedAccountName: 'Namshi Fashion LLC',
    linkedAccountPhone: '0587654321',
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: '7',
    userCode: '50016',
    username: 'emp.sara',
    role: 'Employee',
    linkedAccountName: 'Sara Al Maktoum',
    linkedAccountPhone: '0521112233',
    status: 'Active',
    createdAt: '2024-01-18',
  },
  {
    id: '8',
    userCode: '50017',
    username: 'driver.khalid',
    role: 'Driver',
    linkedAccountName: 'Khalid M.',
    linkedAccountPhone: '0505555503',
    status: 'Blocked',
    createdAt: '2024-01-20',
  },
  {
    id: '9',
    userCode: '50018',
    username: 'emp.fahad',
    role: 'Employee',
    linkedAccountName: 'Fahad Al Qasimi',
    linkedAccountPhone: '0562223344',
    status: 'Active',
    createdAt: '2024-01-22',
  },
  {
    id: '10',
    userCode: '50019',
    username: 'amazon.client',
    role: 'Client',
    linkedAccountName: 'Amazon UAE LLC',
    linkedAccountPhone: '0509998877',
    status: 'Active',
    createdAt: '2024-01-25',
  },
  {
    id: '11',
    userCode: '50020',
    username: 'driver.tariq',
    role: 'Driver',
    linkedAccountName: 'Tariq A.',
    linkedAccountPhone: '0505555504',
    status: 'Blocked',
    createdAt: '2024-01-28',
  },
  {
    id: '12',
    userCode: '50021',
    username: 'admin.support',
    role: 'Admin',
    linkedAccountName: 'IT Operations Team',
    linkedAccountPhone: '0500001122',
    status: 'Active',
    createdAt: '2024-02-01',
  },
];

export default function UsersManagementPage() {
  const { lang } = useI18n();
  const { clients, drivers } = useData();

  // State
  const [users, setUsers] = useState<PortalUser[]>(INITIAL_PORTAL_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formRole, setFormRole] = useState<UserRole>('Driver');
  const [formLinkedName, setFormLinkedName] = useState('');
  const [formLinkedPhone, setFormLinkedPhone] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountSearch, setAccountSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omex_system_data_v1_portal_users');
      if (saved) {
        setUsers(JSON.parse(saved));
      }
    } catch {
      // fallback to initial
    }
  }, []);

  // Save to localStorage
  const saveUsers = (newUsers: PortalUser[]) => {
    setUsers(newUsers);
    try {
      localStorage.setItem('omex_system_data_v1_portal_users', JSON.stringify(newUsers));
    } catch {
      // ignore
    }
  };

  // Toast notification
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Statistics
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === 'Active').length;
    const blocked = users.filter((u) => u.status === 'Blocked').length;
    const admin = users.filter((u) => u.role === 'Admin').length;
    const employee = users.filter((u) => u.role === 'Employee').length;
    const driver = users.filter((u) => u.role === 'Driver').length;
    const client = users.filter((u) => u.role === 'Client').length;

    return { total, active, blocked, admin, employee, driver, client };
  }, [users]);

  // Available linked accounts for selection
  const availableAccounts = useMemo(() => {
    const searchLower = accountSearch.toLowerCase().trim();
    if (formRole === 'Client') {
      return clients
        .map((c) => ({ id: String(c.id), name: c.companyName || 'Client', phone: c.phone || '0500000000' }))
        .filter((a) => a.name.toLowerCase().includes(searchLower) || a.phone.includes(searchLower));
    } else if (formRole === 'Driver') {
      return drivers
        .map((d) => ({ id: String(d.id), name: d.fullName || 'Driver', phone: d.phone || '0505555500' }))
        .filter((a) => a.name.toLowerCase().includes(searchLower) || a.phone.includes(searchLower));
    } else if (formRole === 'Employee') {
      const emps = [
        { id: 'e1', name: 'Khalid Al Mansoori', phone: '0569876543' },
        { id: 'e2', name: 'Sara Al Maktoum', phone: '0521112233' },
        { id: 'e3', name: 'Fahad Al Qasimi', phone: '0562223344' },
        { id: 'e4', name: 'Warehouse Supervisor', phone: '0504443322' },
        { id: 'e5', name: 'Accountant General', phone: '0553332211' },
      ];
      return emps.filter((a) => a.name.toLowerCase().includes(searchLower) || a.phone.includes(searchLower));
    } else {
      const admins = [
        { id: 'a1', name: 'System Administrator', phone: '0501234567' },
        { id: 'a2', name: 'Operations Director', phone: '0509998877' },
        { id: 'a3', name: 'IT Security Manager', phone: '0500001122' },
      ];
      return admins.filter((a) => a.name.toLowerCase().includes(searchLower) || a.phone.includes(searchLower));
    }
  }, [formRole, clients, drivers, accountSearch]);

  // Filtered Users for Table
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        !search ||
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.linkedAccountName.toLowerCase().includes(search.toLowerCase()) ||
        u.linkedAccountPhone.includes(search) ||
        u.userCode.includes(search);

      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Toggle user Active / Blocked status
  const handleToggleStatus = (id: string) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        const nextStatus: UserStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    });
    saveUsers(updated);
    showToast(lang === 'ar' ? 'تم تغيير حالة المستخدم بنجاح' : 'User status updated successfully');
  };

  // Delete user
  const handleDeleteUser = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?')) {
      const updated = users.filter((u) => u.id !== id);
      saveUsers(updated);
      showToast(lang === 'ar' ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully');
      if (editingId === id) resetForm();
    }
  };

  // Edit user click
  const handleEditClick = (u: PortalUser) => {
    setEditingId(u.id);
    setFormRole(u.role);
    setFormLinkedName(u.linkedAccountName);
    setFormLinkedPhone(u.linkedAccountPhone);
    setFormUsername(u.username);
    setFormPassword('');
    setFormConfirmPassword('');
    setAccountSearch('');
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setFormRole('Driver');
    setFormLinkedName('');
    setFormLinkedPhone('');
    setFormUsername('');
    setFormPassword('');
    setFormConfirmPassword('');
    setAccountSearch('');
  };

  // Save / Update User
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formUsername.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم المستخدم' : 'Please enter a username');
      return;
    }

    if (!formLinkedName.trim()) {
      showToast(lang === 'ar' ? 'يرجى اختيار الحساب المرتبط' : 'Please select a linked account');
      return;
    }

    if (!editingId && (!formPassword || formPassword.length < 4)) {
      showToast(lang === 'ar' ? 'يرجى إدخال كلمة مرور مكونة من 4 أحرف على الأقل' : 'Password must be at least 4 characters');
      return;
    }

    if (formPassword && formPassword !== formConfirmPassword) {
      showToast(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (editingId) {
      // Update
      const updated = users.map((u) => {
        if (u.id === editingId) {
          return {
            ...u,
            role: formRole,
            linkedAccountName: formLinkedName,
            linkedAccountPhone: formLinkedPhone || '0500000000',
            username: formUsername.trim(),
          };
        }
        return u;
      });
      saveUsers(updated);
      showToast(lang === 'ar' ? 'تم تحديث بيانات المستخدم بنجاح' : 'User updated successfully');
    } else {
      // Check duplicate username
      if (users.some((u) => u.username.toLowerCase() === formUsername.trim().toLowerCase())) {
        showToast(lang === 'ar' ? 'اسم المستخدم موجود بالفعل' : 'Username already exists');
        return;
      }

      const nextCode = `500${users.length + 10}`;
      const newUser: PortalUser = {
        id: Date.now().toString(),
        userCode: nextCode,
        username: formUsername.trim(),
        role: formRole,
        linkedAccountName: formLinkedName,
        linkedAccountPhone: formLinkedPhone || '0500000000',
        status: 'Active',
        createdAt: new Date().toISOString().slice(0, 10),
      };

      saveUsers([newUser, ...users]);
      showToast(lang === 'ar' ? 'تم إنشاء حساب المستخدم بنجاح' : 'User created successfully');
    }

    resetForm();
  };

  // Role badge helper
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Client':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Driver':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Employee':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Toast Notification */}
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
              {lang === 'ar' ? 'إدارة المستخدمين والصلاحيات' : 'Users Management'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'إنشاء حسابات البوابة وربطها بالعملاء والسائقين والموظفين وإدارة الوصول'
                : 'Create portal users, link accounts to clients & drivers, and manage access'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setUsers(INITIAL_PORTAL_USERS);
              showToast(lang === 'ar' ? 'تم تحديث البيانات وإعادتها للافتراضي' : 'Data refreshed to defaults');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            {lang === 'ar' ? 'تحديث البيانات' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* 2. Colorful Metric Cards Row (Similar to Reference UI) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Client Users */}
        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition">
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ar' ? 'عملاء البوابة' : 'Client Users'}
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{stats.client}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Driver Users */}
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition">
          <div>
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              {lang === 'ar' ? 'سائقين' : 'Driver Users'}
            </p>
            <p className="text-2xl font-black text-blue-900 mt-1">{stats.driver}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Employee Users */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition">
          <div>
            <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              {lang === 'ar' ? 'موظفين' : 'Employee Users'}
            </p>
            <p className="text-2xl font-black text-amber-900 mt-1">{stats.employee}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Admin Users */}
        <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">
              {lang === 'ar' ? 'مدراء النظام' : 'Admin Users'}
            </p>
            <p className="text-2xl font-black text-purple-900 mt-1">{stats.admin}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        {/* Blocked */}
        <div className="bg-red-50/70 border border-red-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition">
          <div>
            <p className="text-[11px] font-bold text-red-700 uppercase tracking-wide">
              {lang === 'ar' ? 'حسابات محظورة' : 'Blocked'}
            </p>
            <p className="text-2xl font-black text-red-900 mt-1">{stats.blocked}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        {/* Active */}
        <div className="bg-teal-50/70 border border-teal-200/70 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition">
          <div>
            <p className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
              {lang === 'ar' ? 'حسابات نشطة' : 'Active'}
            </p>
            <p className="text-2xl font-black text-teal-900 mt-1">{stats.active}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-slate-100/90 border border-slate-300/80 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-sm transition col-span-2 sm:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              {lang === 'ar' ? 'إجمالي الحسابات' : 'Total Users'}
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Main Split Area: Table (Left) + Create/Edit Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Table Section (3 cols on desktop) */}
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
                      ? 'بحث باسم المستخدم، الحساب المرتبط، أو الهاتف...'
                      : 'Search user / client / employee...'
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
              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 cursor-pointer"
              >
                <option value="All">{lang === 'ar' ? 'جميع الأدوار (All Roles)' : 'All Roles'}</option>
                <option value="Client">{lang === 'ar' ? 'عميل (Client)' : 'Client'}</option>
                <option value="Driver">{lang === 'ar' ? 'سائق (Driver)' : 'Driver'}</option>
                <option value="Employee">{lang === 'ar' ? 'موظف (Employee)' : 'Employee'}</option>
                <option value="Admin">{lang === 'ar' ? 'مدير نظام (Admin)' : 'Admin'}</option>
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
              <Users className="w-4 h-4 text-[#352F7A]" />
              <span className="text-sm font-bold text-slate-800">
                {lang === 'ar' ? 'دليل المستخدمين' : 'User Directory'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {lang === 'ar'
                ? `عرض ${paginatedUsers.length} من أصل ${filteredUsers.length} مستخدم`
                : `Showing ${paginatedUsers.length} of ${filteredUsers.length} users`}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الخيارات' : 'OPTIONS'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'الحساب المرتبط' : 'LINKED ACCOUNT'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'ar' ? 'الدور' : 'ROLE'}</th>
                  <th className="py-3.5 px-5 text-start">{lang === 'ar' ? 'المستخدم (USER)' : 'USER'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold">
                        {lang === 'ar' ? 'لا توجد حسابات مطابقة للبحث' : 'No users matching filter criteria'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((u) => {
                    const isBlocked = u.status === 'Blocked';
                    const avatarLetter = u.username.charAt(0).toUpperCase();

                    return (
                      <tr
                        key={u.id}
                        className={`hover:bg-slate-50/80 transition ${
                          editingId === u.id ? 'bg-indigo-50/60' : ''
                        }`}
                      >
                        {/* Options */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Lock / Unlock toggle button */}
                            <button
                              onClick={() => handleToggleStatus(u.id)}
                              title={
                                isBlocked
                                  ? lang === 'ar'
                                    ? 'تنشيط الحساب'
                                    : 'Unlock Account'
                                  : lang === 'ar'
                                  ? 'حظر الحساب'
                                  : 'Block Account'
                              }
                              className={`p-1.5 rounded-lg transition ${
                                isBlocked
                                  ? 'text-red-500 hover:bg-red-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {isBlocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                            </button>

                            {/* Edit Button */}
                            <button
                              onClick={() => handleEditClick(u)}
                              title={lang === 'ar' ? 'تعديل البيانات' : 'Edit User'}
                              className="p-1.5 rounded-lg text-[#E87722] hover:bg-orange-50 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              title={lang === 'ar' ? 'حذف المستخدم' : 'Delete User'}
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

                        {/* Linked Account */}
                        <td className="py-3.5 px-5">
                          <div>
                            <p className="font-bold text-slate-900">{u.linkedAccountName}</p>
                            <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {u.linkedAccountPhone}
                            </p>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${getRoleBadge(
                              u.role
                            )}`}
                          >
                            {lang === 'ar' && u.role === 'Admin'
                              ? 'مدير (Admin)'
                              : lang === 'ar' && u.role === 'Employee'
                              ? 'موظف (Employee)'
                              : lang === 'ar' && u.role === 'Driver'
                              ? 'سائق (Driver)'
                              : lang === 'ar' && u.role === 'Client'
                              ? 'عميل (Client)'
                              : u.role}
                          </span>
                        </td>

                        {/* User Column (Avatar + Username + ID) */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                              {avatarLetter}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{u.username}</p>
                              <p className="text-[10px] text-slate-400 font-mono font-bold">
                                ID: {u.userCode}
                              </p>
                            </div>
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

        {/* Right Create / Edit User Sidebar (1 col on desktop) */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#E87722]" />
              <h3 className="font-black text-base text-slate-900">
                {editingId
                  ? lang === 'ar'
                    ? 'تعديل المستخدم'
                    : 'Edit User'
                  : lang === 'ar'
                  ? 'إنشاء مستخدم جديد'
                  : 'Create User'}
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
              ? 'اختر الدور واربط الحساب بموظف أو سائق أو عميل لإدارة الصلاحية'
              : 'Choose a role and link the user to a client or employee'}
          </p>

          <form onSubmit={handleSaveUser} className="space-y-4">
            {/* Role Selector Pill Buttons */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'الدور (Role)' : 'Role'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Driver', 'Admin', 'Client', 'Employee'] as UserRole[]).map((r) => {
                  const isSelected = formRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setFormRole(r);
                        setFormLinkedName('');
                        setFormLinkedPhone('');
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-extrabold transition border ${
                        isSelected
                          ? r === 'Client'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : r === 'Driver'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : r === 'Employee'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {lang === 'ar' && r === 'Driver'
                        ? 'سائق'
                        : lang === 'ar' && r === 'Admin'
                        ? 'مدير'
                        : lang === 'ar' && r === 'Client'
                        ? 'عميل'
                        : lang === 'ar' && r === 'Employee'
                        ? 'موظف'
                        : r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Linked Account Selection with Dropdown */}
            <div className="relative">
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                {lang === 'ar' ? 'ربط الحساب (Linked Account)' : 'Linked Account Name'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formLinkedName || accountSearch}
                  onChange={(e) => {
                    setAccountSearch(e.target.value);
                    setFormLinkedName(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={
                    lang === 'ar'
                      ? `ابحث عن اسم ${formRole === 'Client' ? 'عميل' : formRole === 'Driver' ? 'سائق' : 'موظف'}...`
                      : `Search available ${formRole.toLowerCase()}s...`
                  }
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 focus:border-[#352F7A]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3" />
              </div>

              {/* Suggestions Dropdown */}
              {isDropdownOpen && availableAccounts.length > 0 && (
                <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-44 overflow-y-auto divide-y divide-slate-100">
                  {availableAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      onClick={() => {
                        setFormLinkedName(acc.name);
                        setFormLinkedPhone(acc.phone);
                        setIsDropdownOpen(false);
                      }}
                      className="px-3.5 py-2.5 hover:bg-indigo-50/70 cursor-pointer transition flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800">{acc.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{acc.phone}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#352F7A] bg-indigo-50 px-2 py-0.5 rounded-md">
                        {lang === 'ar' ? 'اختيار' : 'Select'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Phone */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                {lang === 'ar' ? 'رقم الهاتف المرتبط' : 'Linked Mobile No'}
              </label>
              <input
                type="text"
                value={formLinkedPhone}
                onChange={(e) => setFormLinkedPhone(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: 0501234567' : 'e.g. 0501234567'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 focus:border-[#352F7A]"
              />
            </div>

            {/* Account Selected Badge Preview Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
              {formLinkedName ? (
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#352F7A] flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{formLinkedName}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{formLinkedPhone || '-'}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center w-full py-1">
                  <p className="text-[11px] font-bold text-slate-500">
                    {lang === 'ar' ? 'لم يتم اختيار حساب مرتبط' : 'No account selected'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {lang === 'ar'
                      ? 'اختر عميلاً أو سائقاً أو موظفاً من البحث'
                      : 'Select a client or employee for this login'}
                  </p>
                </div>
              )}
            </div>

            {/* Login Username */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                {lang === 'ar' ? 'اسم المستخدم (User Name)' : 'User Name'}
              </label>
              <input
                type="text"
                value={formUsername}
                onChange={(e) => setFormUsername(e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل اسم الدخول...' : 'Enter login username'}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 focus:border-[#352F7A]"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder={
                      editingId
                        ? lang === 'ar'
                          ? 'اتركها دون تغيير'
                          : 'Unchanged'
                        : lang === 'ar'
                        ? '••••••••'
                        : '••••••••'
                    }
                    className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                  {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm'}
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formConfirmPassword}
                  onChange={(e) => setFormConfirmPassword(e.target.value)}
                  placeholder={
                    editingId
                      ? lang === 'ar'
                        ? 'اتركها دون تغيير'
                        : 'Unchanged'
                      : lang === 'ar'
                      ? '••••••••'
                      : '••••••••'
                  }
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30"
                />
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="pt-3 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold text-white bg-[#169C47] hover:bg-[#138a3e] transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                {editingId
                  ? lang === 'ar'
                    ? 'تحديث الحساب'
                    : 'Update User'
                  : lang === 'ar'
                  ? 'حفظ المستخدم (Save)'
                  : 'Save User'}
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
