'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  LayoutDashboard,
  Boxes,
  Users,
  PackageCheck,
  Truck,
  Wallet,
  MapPin,
  Car,
  FileBarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  ListFilter,
  Grid3X3,
  Upload,
  MapPinned,
  Building2,
  BarChart3,
  FileText,
  RefreshCw,
  ArrowUpCircle,
  PackagePlus,
  List,
  RotateCcw,
  Clock,
  ShieldCheck,
  DollarSign,
  Search,
  Receipt,
  User,
  BarChart,
  Activity,
  MessageSquare,
  Mail,
  MessageCircle,
  FileDown,
  Hash,
  Replace,
  Lock,
  RefreshCcw,
  UserCheck,
  Wrench,
  Fuel,
  FileCheck,
  Shield,
  ClipboardCheck,
  Gauge,
  AlertTriangle,
  History,
  Ban,
  Navigation,
  Home,
  MapIcon,
  Send,
  Tag,
  Printer,
  ClipboardList,
  ScanLine,
  Package,
  Archive,
  Warehouse,
  CircleAlert,
  X,
  type LucideIcon,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (val: boolean) => void;
}

interface SubItem {
  name: string;
  nameAr: string;
  href: string;
  icon: LucideIcon;
}

interface NavSection {
  id: string;
  name: string;
  nameAr: string;
  icon: LucideIcon;
  href?: string;
  subItems?: SubItem[];
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const { t, lang, dir } = useI18n();
  const [openSections, setOpenSections] = useState<string[]>(['home', 'orders']);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const sections: NavSection[] = [
    {
      id: 'home',
      name: 'Home',
      nameAr: 'الرئيسية',
      icon: Home,
      subItems: [
        { name: 'Dashboard', nameAr: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Vehicle Dashboard', nameAr: 'لوحة المركبات', href: '/dashboard/vehicle-dashboard', icon: Car },
      ],
    },
    {
      id: 'masters',
      name: 'Masters',
      nameAr: 'البيانات الأساسية',
      icon: Boxes,
      subItems: [
        { name: 'Emirates', nameAr: 'الإمارات', href: '/dashboard/masters/emirates', icon: MapPin },
        { name: 'Areas', nameAr: 'المناطق', href: '/dashboard/masters/areas', icon: MapIcon },
        { name: 'Locations', nameAr: 'المواقع', href: '/dashboard/masters/locations', icon: Send },
        { name: 'Expenses', nameAr: 'المصروفات', href: '/dashboard/masters/expenses', icon: DollarSign },
        { name: 'Reasons', nameAr: 'الأسباب', href: '/dashboard/masters/reasons', icon: CircleAlert },
        { name: 'Types', nameAr: 'الأنواع', href: '/dashboard/masters/types', icon: Tag },
        { name: 'Vehicles', nameAr: 'المركبات', href: '/dashboard/masters/vehicles', icon: Car },
        { name: 'Designations', nameAr: 'المسميات الوظيفية', href: '/dashboard/masters/designations', icon: UserCheck },
      ],
    },
    {
      id: 'accounts',
      name: 'Accounts',
      nameAr: 'الحسابات',
      icon: Users,
      subItems: [
        { name: 'Employees', nameAr: 'الموظفون', href: '/dashboard/accounts/employees', icon: UserCheck },
        { name: 'Clients', nameAr: 'العملاء التجار', href: '/dashboard/accounts/clients', icon: Building2 },
        { name: 'Customers', nameAr: 'المستلمون', href: '/dashboard/accounts/customers', icon: User },
        { name: 'Agents', nameAr: 'الوكلاء', href: '/dashboard/accounts/agents', icon: Users },
        { name: 'Users', nameAr: 'المستخدمون', href: '/dashboard/accounts/users', icon: User },
      ],
    },
    {
      id: 'orders',
      name: 'Orders',
      nameAr: 'الطلبات',
      icon: PackageCheck,
      subItems: [
        { name: 'Create Order', nameAr: 'إنشاء طلب', href: '/dashboard/orders/create', icon: PlusCircle },
        { name: 'Order List', nameAr: 'قائمة الطلبات', href: '/dashboard/orders/list', icon: ListFilter },
        { name: "Today's Orders", nameAr: 'طلبات اليوم', href: '/dashboard/orders/today', icon: Clock },
        { name: 'Hold Orders', nameAr: 'الطلبات المجمدة', href: '/dashboard/orders/hold', icon: Ban },
        { name: 'Reverse Cancel', nameAr: 'إلغاء الإلغاء', href: '/dashboard/orders/reverse', icon: RefreshCcw },
        { name: 'Batch Print', nameAr: 'طباعة مجمعة', href: '/dashboard/orders/batch-print', icon: Printer },
      ],
    },
    {
      id: 'uploads',
      name: 'Uploads',
      nameAr: 'رفع البيانات',
      icon: Upload,
      subItems: [
        { name: 'Order Upload', nameAr: 'رفع الطلبات', href: '/dashboard/uploads/orders', icon: Upload },
        { name: 'Location Upload', nameAr: 'رفع المواقع', href: '/dashboard/uploads/locations', icon: MapPinned },
        { name: 'Client Upload', nameAr: 'رفع العملاء', href: '/dashboard/uploads/clients', icon: Building2 },
      ],
    },
    {
      id: 'delivery',
      name: 'Delivery',
      nameAr: 'التوصيل',
      icon: Truck,
      subItems: [
        { name: 'Delivery Allocation', nameAr: 'توزيع الشحنات', href: '/dashboard/delivery/allocation', icon: Grid3X3 },
        { name: 'Delivery Notes', nameAr: 'بوالص التوصيل', href: '/dashboard/delivery/notes', icon: FileText },
        { name: 'Delivery Statistics', nameAr: 'إحصائيات التوصيل', href: '/dashboard/delivery/statistics', icon: BarChart3 },
        { name: 'Delivery Exchange', nameAr: 'تبديل التوصيل', href: '/dashboard/delivery/exchange', icon: RefreshCw },
        { name: 'Push Order', nameAr: 'دفع الطلب', href: '/dashboard/delivery/push', icon: ArrowUpCircle },
      ],
    },
    {
      id: 'shipments',
      name: 'Shipments',
      nameAr: 'الشحنات',
      icon: PackagePlus,
      subItems: [
        { name: 'New Shipment', nameAr: 'شحنة جديدة', href: '/dashboard/shipments/new', icon: PlusCircle },
        { name: 'Shipment List', nameAr: 'قائمة الشحنات', href: '/dashboard/shipments/list', icon: List },
      ],
    },
    {
      id: 'financials',
      name: 'Payments',
      nameAr: 'المدفوعات',
      icon: Wallet,
      href: '/dashboard/financials',
    },
    {
      id: 'returns',
      name: 'Returns',
      nameAr: 'المرتجعات',
      icon: RotateCcw,
      subItems: [
        { name: 'Create Return', nameAr: 'إنشاء مرتجع', href: '/dashboard/returns/create', icon: PlusCircle },
        { name: 'Client Returns', nameAr: 'مرتجعات العملاء', href: '/dashboard/returns/clients', icon: Building2 },
        { name: 'Pending Returns', nameAr: 'مرتجعات قيد الانتظار', href: '/dashboard/returns/pending', icon: Clock },
      ],
    },
    {
      id: 'approvals',
      name: 'Approvals',
      nameAr: 'الموافقات',
      icon: ShieldCheck,
      subItems: [
        { name: 'Shipment Approval', nameAr: 'موافقة الشحنات', href: '/dashboard/approvals/shipments', icon: PackagePlus },
        { name: 'Payment Approvals', nameAr: 'موافقة المدفوعات', href: '/dashboard/approvals/payments', icon: DollarSign },
        { name: 'Return Approvals', nameAr: 'موافقة المرتجعات', href: '/dashboard/approvals/returns', icon: RotateCcw },
      ],
    },
    {
      id: 'followup',
      name: 'Followup',
      nameAr: 'المتابعة',
      icon: ClipboardList,
      subItems: [
        { name: 'Delivery Order Followup', nameAr: 'متابعة طلبات التوصيل', href: '/dashboard/followup/delivery', icon: Truck },
        { name: 'Pickup Order Followup', nameAr: 'متابعة طلبات الاستلام', href: '/dashboard/followup/pickup', icon: Package },
        { name: 'Driver Followup', nameAr: 'متابعة السائقين', href: '/dashboard/followup/driver', icon: UserCheck },
        { name: 'Payment Followup', nameAr: 'متابعة المدفوعات', href: '/dashboard/followup/payment', icon: DollarSign },
        { name: 'Return Followup', nameAr: 'متابعة المرتجعات', href: '/dashboard/followup/returns', icon: RotateCcw },
      ],
    },
    {
      id: 'expenses',
      name: 'Expenses',
      nameAr: 'المصروفات',
      icon: Receipt,
      subItems: [
        { name: 'Driver Expense', nameAr: 'مصروفات السائق', href: '/dashboard/expenses/driver', icon: Car },
        { name: 'Company Expense', nameAr: 'مصروفات الشركة', href: '/dashboard/expenses/company', icon: Building2 },
      ],
    },
    {
      id: 'store',
      name: 'Store',
      nameAr: 'المخزن',
      icon: Warehouse,
      subItems: [
        { name: 'In Scan', nameAr: 'مسح الدخول', href: '/dashboard/store/in-scan', icon: ScanLine },
        { name: 'Out Scan', nameAr: 'مسح الخروج', href: '/dashboard/store/out-scan', icon: ScanLine },
        { name: 'Delivery Scan', nameAr: 'مسح التوصيل', href: '/dashboard/store/delivery-scan', icon: Truck },
        { name: 'Bulk In Scan', nameAr: 'مسح دخول مجمع', href: '/dashboard/store/bulk-in', icon: Archive },
        { name: 'Bulk Out Scan', nameAr: 'مسح خروج مجمع', href: '/dashboard/store/bulk-out', icon: Archive },
        { name: 'Pickup Scan', nameAr: 'مسح الاستلام', href: '/dashboard/store/pickup-scan', icon: Package },
      ],
    },
    {
      id: 'tracking',
      name: 'Tracking',
      nameAr: 'التتبع',
      icon: Search,
      subItems: [
        { name: 'Track By Voucher', nameAr: 'تتبع بالبوليصة', href: '/dashboard/tracking/voucher', icon: Receipt },
        { name: 'Track By Bill', nameAr: 'تتبع بالفاتورة', href: '/dashboard/tracking/bill', icon: FileText },
        { name: 'Track By Customer', nameAr: 'تتبع بالعميل', href: '/dashboard/tracking/customer', icon: User },
        { name: 'Driver Tracking', nameAr: 'تتبع السائق', href: '/dashboard/tracking/driver', icon: Navigation },
        { name: 'Activity Tracker', nameAr: 'تتبع النشاطات', href: '/dashboard/tracking/activity', icon: Activity },
      ],
    },
    {
      id: 'messages',
      name: 'Messages',
      nameAr: 'الرسائل',
      icon: MessageSquare,
      subItems: [
        { name: 'Draft Emails', nameAr: 'مسودات البريد', href: '/dashboard/messages/emails', icon: Mail },
        { name: 'Draft SMS', nameAr: 'مسودات الرسائل', href: '/dashboard/messages/sms', icon: MessageCircle },
        { name: 'Delivery Note SMS', nameAr: 'رسائل بوالص التوصيل', href: '/dashboard/messages/delivery-sms', icon: FileDown },
      ],
    },
    {
      id: 'fleet',
      name: 'Vehicle Management',
      nameAr: 'إدارة المركبات',
      icon: Car,
      subItems: [
        { name: 'Vehicle List', nameAr: 'قائمة المركبات', href: '/dashboard/fleet/list', icon: Car },
        { name: 'Assignments', nameAr: 'التعيينات', href: '/dashboard/fleet/assignments', icon: UserCheck },
        { name: 'Maintenance', nameAr: 'الصيانة', href: '/dashboard/fleet/maintenance', icon: Wrench },
        { name: 'Fuel Logs', nameAr: 'سجل الوقود', href: '/dashboard/fleet/fuel', icon: Fuel },
        { name: 'Documents', nameAr: 'المستندات', href: '/dashboard/fleet/documents', icon: FileCheck },
        { name: 'Insurance', nameAr: 'التأمين', href: '/dashboard/fleet/insurance', icon: Shield },
        { name: 'Permits', nameAr: 'التصاريح', href: '/dashboard/fleet/permits', icon: ClipboardCheck },
        { name: 'Inspections', nameAr: 'الفحوصات', href: '/dashboard/fleet/inspections', icon: ClipboardCheck },
        { name: 'Vehicle Expenses', nameAr: 'مصروفات المركبات', href: '/dashboard/fleet/expenses', icon: DollarSign },
        { name: 'Odometer Logs', nameAr: 'سجل العداد', href: '/dashboard/fleet/odometer', icon: Gauge },
        { name: 'Accidents', nameAr: 'الحوادث', href: '/dashboard/fleet/accidents', icon: AlertTriangle },
        { name: 'Service History', nameAr: 'سجل الخدمة', href: '/dashboard/fleet/service-history', icon: History },
        { name: 'Fine Records', nameAr: 'سجل المخالفات', href: '/dashboard/fleet/fines', icon: Ban },
      ],
    },
    {
      id: 'reports',
      name: 'Reports',
      nameAr: 'التقارير',
      icon: FileBarChart,
      subItems: [
        { name: 'Order Reports', nameAr: 'تقارير الطلبات', href: '/dashboard/reports/orders', icon: PackageCheck },
        { name: 'Pickup Reports', nameAr: 'تقارير الاستلام', href: '/dashboard/reports/pickup', icon: Package },
        { name: 'Delivery Reports', nameAr: 'تقارير التوصيل', href: '/dashboard/reports/delivery', icon: Truck },
        { name: 'Shipment Reports', nameAr: 'تقارير الشحنات', href: '/dashboard/reports/shipments', icon: PackagePlus },
        { name: 'Clients Reports', nameAr: 'تقارير العملاء التجار', href: '/dashboard/reports/clients', icon: Building2 },
        { name: 'Customer Reports', nameAr: 'تقارير المستلمين', href: '/dashboard/reports/customers', icon: Users },
        { name: 'Employee Reports', nameAr: 'تقارير الموظفين', href: '/dashboard/reports/employees', icon: UserCheck },
        { name: 'Agent Reports', nameAr: 'تقارير الوكلاء', href: '/dashboard/reports/agents', icon: User },
        { name: 'Expense Reports', nameAr: 'تقارير المصروفات', href: '/dashboard/reports/expenses', icon: DollarSign },
        { name: 'Payment Report', nameAr: 'تقارير المدفوعات', href: '/dashboard/reports/payments', icon: Wallet },
        { name: 'Return Report', nameAr: 'تقارير المرتجعات', href: '/dashboard/reports/returns', icon: RotateCcw },
        { name: 'Financial Reports', nameAr: 'التقارير المالية', href: '/dashboard/reports/financial', icon: BarChart },
      ],
    },
    {
      id: 'counters',
      name: 'Counters',
      nameAr: 'العدادات',
      icon: Hash,
      subItems: [
        { name: 'Counter Nos', nameAr: 'أرقام العدادات', href: '/dashboard/counters/numbers', icon: Hash },
        { name: 'Change Store Ref', nameAr: 'تغيير مرجع المخزن', href: '/dashboard/counters/change-ref', icon: Replace },
        { name: 'Area Store No Lock', nameAr: 'قفل رقم المنطقة', href: '/dashboard/counters/area-lock', icon: Lock },
        { name: 'Update Store Ref No', nameAr: 'تحديث رقم المرجع', href: '/dashboard/counters/update-ref', icon: RefreshCcw },
      ],
    },
  ];

  const sidebarContent = (isMobile: boolean = false) => (
    <div
      className={`flex flex-col h-full text-white shadow-xl ${
        isMobile ? 'w-80' : collapsed ? 'w-20' : 'w-72'
      }`}
      style={{ backgroundColor: '#169C47' }}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-emerald-600/40 shrink-0">
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/logo.png"
              alt="Omex Express Logo"
              className="w-10 h-10 object-contain bg-white rounded-xl p-0.5 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <h1 className="font-bold text-lg leading-tight tracking-wide">OMEX EXPRESS</h1>
              <p className="text-xs text-emerald-100/80 truncate">Delivery Services</p>
            </div>
          </div>
        )}

        {collapsed && !isMobile && (
          <img
            src="/logo.png"
            alt="Omex Express Logo"
            className="mx-auto w-10 h-10 object-contain bg-white rounded-xl p-0.5 shadow-md shrink-0"
          />
        )}

        {isMobile ? (
          <button
            onClick={() => setMobileOpen?.(false)}
            className="p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 transition-colors text-emerald-100"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 transition-colors text-emerald-100 hidden md:flex items-center justify-center shrink-0"
          >
            {dir === 'rtl' ? (
              collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-transparent">
        {sections.map((section) => {
          const Icon = section.icon;
          const hasSubItems = section.subItems && section.subItems.length > 0;
          const isOpen = openSections.includes(section.id);
          const isActive = section.href
            ? pathname === section.href
            : section.subItems?.some((sub) => pathname === sub.href);

          return (
            <div key={section.id}>
              {section.href ? (
                <Link
                  href={section.href}
                  onClick={() => isMobile && setMobileOpen?.(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                    isActive
                      ? 'bg-white text-[#169C47] font-semibold shadow-md'
                      : 'text-emerald-50 hover:bg-emerald-700/50 hover:text-white'
                  }`}
                  title={collapsed && !isMobile ? (lang === 'ar' ? section.nameAr : section.name) : undefined}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[#169C47]' : 'text-emerald-200 group-hover:text-white'}`} />
                  {(!collapsed || isMobile) && (
                    <span className="truncate text-[13px]">{lang === 'ar' ? section.nameAr : section.name}</span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                    isActive
                      ? 'bg-emerald-800/80 text-white font-semibold'
                      : 'text-emerald-50 hover:bg-emerald-700/50 hover:text-white'
                  }`}
                  title={collapsed && !isMobile ? (lang === 'ar' ? section.nameAr : section.name) : undefined}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-emerald-200 group-hover:text-white'}`} />
                  {(!collapsed || isMobile) && (
                    <>
                      <span className="truncate text-[13px] flex-1 text-start">{lang === 'ar' ? section.nameAr : section.name}</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                      )}
                    </>
                  )}
                </button>
              )}

              {/* Sub-Items */}
              {(!collapsed || isMobile) && hasSubItems && isOpen && (
                <div className="ps-5 pe-1 py-1 space-y-0.5 border-s-2 border-emerald-500/30 ms-5 mt-1 mb-1">
                  {section.subItems!.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    const SubIcon = sub.icon;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => isMobile && setMobileOpen?.(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${
                          isSubActive
                            ? 'bg-white text-[#169C47] font-bold shadow-sm'
                            : 'text-emerald-100/90 hover:text-white hover:bg-emerald-700/40'
                        }`}
                      >
                        <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-[#169C47]' : ''}`} />
                        <span className="truncate">{lang === 'ar' ? sub.nameAr : sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2.5 border-t border-emerald-600/40 space-y-2 shrink-0">
        <Link
          href="/login"
          onClick={() => isMobile && setMobileOpen?.(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-100 hover:bg-emerald-700/60 hover:text-white text-sm font-medium transition-colors"
          title={collapsed && !isMobile ? t.nav.logout : undefined}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {(!collapsed || isMobile) && <span className="text-[13px]">{t.nav.logout}</span>}
        </Link>

        {(!collapsed || isMobile) && (
          <div className="bg-emerald-800/60 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-[#169C47] font-bold flex items-center justify-center text-xs shadow shrink-0">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Admin Dispatcher</p>
              <p className="text-[10px] text-emerald-200 truncate">admin@omex.ae</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex relative h-full shrink-0">
        {sidebarContent(false)}
      </aside>

      {/* Mobile Slide-over Drawer Backdrop */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen?.(false)}
          />
          <div className="relative z-10 flex-1 max-w-xs h-full animate-in slide-in-from-start">
            {sidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
