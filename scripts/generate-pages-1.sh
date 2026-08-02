#!/bin/bash
# Script to generate all new pages for the OMEX system
BASE="/Users/hany/Desktop/omex system/src/app/dashboard"

# ── Helper function ──
create_page() {
  local dir="$1"
  local titleEn="$2"
  local titleAr="$3"
  local descEn="$4"
  local descAr="$5"
  local icon="$6"
  local colsJson="$7"
  local rowsJson="$8"
  local extras="${9:-}"

  mkdir -p "$BASE/$dir"
  cat > "$BASE/$dir/page.tsx" << ENDOFFILE
'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { ${icon} } from 'lucide-react';

const columns = ${colsJson};

const sampleRows = ${rowsJson};

export default function Page() {
  return (
    <PageScaffold
      titleEn="${titleEn}"
      titleAr="${titleAr}"
      descriptionEn="${descEn}"
      descriptionAr="${descAr}"
      icon={${icon}}
      columns={columns}
      rows={sampleRows}
      ${extras}
    />
  );
}
ENDOFFILE
}

# ── Vehicle Dashboard ──
mkdir -p "$BASE/vehicle-dashboard"
cat > "$BASE/vehicle-dashboard/page.tsx" << 'EOF'
'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Car, Fuel, Wrench, AlertTriangle, Gauge, CheckCircle, XCircle, Clock } from 'lucide-react';

const stats = [
  { labelEn: 'Total Vehicles', labelAr: 'إجمالي المركبات', value: 48, icon: Car, color: 'bg-emerald-500' },
  { labelEn: 'Active', labelAr: 'نشط', value: 36, icon: CheckCircle, color: 'bg-green-500' },
  { labelEn: 'In Maintenance', labelAr: 'في الصيانة', value: 5, icon: Wrench, color: 'bg-amber-500' },
  { labelEn: 'Inactive', labelAr: 'غير نشط', value: 7, icon: XCircle, color: 'bg-red-500' },
];

const vehicles = [
  { plate: 'DXB A-12345', model: 'Toyota Hiace 2024', driver: 'Ahmed Khalil', status: 'Active', fuel: 78, km: 1250 },
  { plate: 'SHJ B-67890', model: 'Nissan NV350 2023', driver: 'Mohammed Ali', status: 'Active', fuel: 45, km: 890 },
  { plate: 'AJM C-11223', model: 'Ford Transit 2024', driver: 'Omar Hassan', status: 'Maintenance', fuel: 92, km: 340 },
  { plate: 'ABD D-44556', model: 'Mitsubishi L300 2023', driver: 'Saif Rashid', status: 'Active', fuel: 61, km: 2100 },
  { plate: 'FJR E-78901', model: 'Toyota Hiace 2023', driver: 'Yusuf Karim', status: 'Inactive', fuel: 15, km: 0 },
];

export default function VehicleDashboardPage() {
  const { lang } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? 'لوحة المركبات' : 'Vehicle Dashboard'}</h1>
        <p className="text-sm text-gray-500 mt-1">{lang === 'ar' ? 'نظرة عامة على حالة الأسطول' : 'Fleet status overview'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`${s.color} text-white p-2.5 rounded-xl`}><Icon className="w-5 h-5" /></div>
                <span className="text-3xl font-black text-gray-900">{s.value}</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">{lang === 'ar' ? s.labelAr : s.labelEn}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{lang === 'ar' ? 'حالة المركبات' : 'Vehicle Status'}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'اللوحة' : 'Plate'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الموديل' : 'Model'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'السائق' : 'Driver'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'الوقود %' : 'Fuel %'}</th>
                <th className="px-5 py-3 text-start text-xs font-semibold text-gray-500 uppercase">{lang === 'ar' ? 'كم اليوم' : 'KM Today'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vehicles.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="px-5 py-3.5 font-mono font-semibold text-gray-900">{v.plate}</td>
                  <td className="px-5 py-3.5 text-gray-700">{v.model}</td>
                  <td className="px-5 py-3.5 text-gray-700">{v.driver}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      v.status === 'Active' ? 'bg-green-100 text-green-700' :
                      v.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{v.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${v.fuel > 50 ? 'bg-green-500' : v.fuel > 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: v.fuel + '%' }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{v.fuel}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-700">{v.km.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
EOF

# ── Masters Sub-pages ──
create_page "masters/emirates" "Emirates" "الإمارات" "Manage UAE emirates" "إدارة الإمارات" "MapPin" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Name","ar":"الاسم"},{"key":"nameAr","en":"Arabic Name","ar":"الاسم بالعربي"},{"key":"code","en":"Code","ar":"الرمز"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Dubai","nameAr":"دبي","code":"DXB","status":"Active"},{"id":2,"name":"Abu Dhabi","nameAr":"أبوظبي","code":"AUH","status":"Active"},{"id":3,"name":"Sharjah","nameAr":"الشارقة","code":"SHJ","status":"Active"},{"id":4,"name":"Ajman","nameAr":"عجمان","code":"AJM","status":"Active"},{"id":5,"name":"Ras Al Khaimah","nameAr":"رأس الخيمة","code":"RAK","status":"Active"},{"id":6,"name":"Fujairah","nameAr":"الفجيرة","code":"FJR","status":"Active"},{"id":7,"name":"Umm Al Quwain","nameAr":"أم القيوين","code":"UAQ","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "masters/areas" "Areas" "المناطق" "Manage delivery areas" "إدارة مناطق التوصيل" "MapPin" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Area Name","ar":"اسم المنطقة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"code","en":"Code","ar":"الرمز"},{"key":"deliveryFee","en":"Delivery Fee","ar":"رسوم التوصيل"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Deira","emirate":"Dubai","code":"DXB-DEI","deliveryFee":"15 AED","status":"Active"},{"id":2,"name":"Bur Dubai","emirate":"Dubai","code":"DXB-BUR","deliveryFee":"15 AED","status":"Active"},{"id":3,"name":"JBR","emirate":"Dubai","code":"DXB-JBR","deliveryFee":"20 AED","status":"Active"},{"id":4,"name":"Al Nahda","emirate":"Sharjah","code":"SHJ-NAH","deliveryFee":"25 AED","status":"Active"},{"id":5,"name":"Khalifa City","emirate":"Abu Dhabi","code":"AUH-KHC","deliveryFee":"35 AED","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "masters/locations" "Locations" "المواقع" "Manage delivery locations" "إدارة مواقع التوصيل" "MapPin" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Location","ar":"الموقع"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"lat","en":"Latitude","ar":"خط العرض"},{"key":"lng","en":"Longitude","ar":"خط الطول"}]' \
  '[{"id":1,"name":"Gold Souk","area":"Deira","emirate":"Dubai","lat":"25.2682","lng":"55.2962"},{"id":2,"name":"City Walk","area":"Bur Dubai","emirate":"Dubai","lat":"25.2084","lng":"55.2636"},{"id":3,"name":"The Walk","area":"JBR","emirate":"Dubai","lat":"25.0768","lng":"55.1340"}]'

create_page "masters/expenses" "Expense Types" "أنواع المصروفات" "Manage expense categories" "إدارة فئات المصروفات" "DollarSign" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Expense Type","ar":"نوع المصروف"},{"key":"category","en":"Category","ar":"الفئة"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Fuel","category":"Vehicle","status":"Active"},{"id":2,"name":"Toll Fee","category":"Vehicle","status":"Active"},{"id":3,"name":"Office Rent","category":"Company","status":"Active"},{"id":4,"name":"Driver Salary","category":"HR","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "masters/reasons" "Reasons" "الأسباب" "Manage failure and return reasons" "إدارة أسباب الفشل والمرتجعات" "AlertTriangle" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"type","en":"Type","ar":"النوع"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"reason":"Customer not available","type":"Delivery Failure","status":"Active"},{"id":2,"reason":"Wrong address","type":"Delivery Failure","status":"Active"},{"id":3,"reason":"Damaged item","type":"Return","status":"Active"},{"id":4,"reason":"Wrong item","type":"Return","status":"Active"},{"id":5,"reason":"Customer refused","type":"Return","status":"Active"}]' \
  'statusKey="type" statusColors={{"Delivery Failure":"bg-red-100 text-red-700","Return":"bg-amber-100 text-amber-700"}}'

create_page "masters/types" "Types" "الأنواع" "Manage order and shipment types" "إدارة أنواع الطلبات والشحنات" "Tag" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Type Name","ar":"اسم النوع"},{"key":"category","en":"Category","ar":"الفئة"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Same Day","category":"Delivery","status":"Active"},{"id":2,"name":"Next Day","category":"Delivery","status":"Active"},{"id":3,"name":"Express","category":"Delivery","status":"Active"},{"id":4,"name":"Standard","category":"Shipment","status":"Active"},{"id":5,"name":"Bulk","category":"Shipment","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "masters/vehicles" "Vehicles Master" "المركبات" "Manage vehicle models and types" "إدارة أنواع وموديلات المركبات" "Car" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"type","en":"Vehicle Type","ar":"نوع المركبة"},{"key":"capacity","en":"Capacity (KG)","ar":"السعة (كجم)"},{"key":"fuelType","en":"Fuel Type","ar":"نوع الوقود"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"type":"Van","capacity":"1500","fuelType":"Diesel","status":"Active"},{"id":2,"type":"Truck","capacity":"5000","fuelType":"Diesel","status":"Active"},{"id":3,"type":"Motorcycle","capacity":"50","fuelType":"Petrol","status":"Active"},{"id":4,"type":"Sedan","capacity":"200","fuelType":"Petrol","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "masters/designations" "Designations" "المسميات الوظيفية" "Manage employee designations" "إدارة المسميات الوظيفية" "UserCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"title","en":"Designation","ar":"المسمى"},{"key":"department","en":"Department","ar":"القسم"},{"key":"level","en":"Level","ar":"المستوى"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"title":"Dispatcher","department":"Operations","level":"Senior","status":"Active"},{"id":2,"title":"Driver","department":"Delivery","level":"Junior","status":"Active"},{"id":3,"title":"Accountant","department":"Finance","level":"Mid","status":"Active"},{"id":4,"title":"Warehouse Manager","department":"Store","level":"Senior","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

# ── Accounts Sub-pages ──
create_page "accounts/employees" "Employees" "الموظفون" "Manage company employees" "إدارة موظفي الشركة" "UserCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Name","ar":"الاسم"},{"key":"designation","en":"Designation","ar":"المسمى"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Ahmed Khalil","designation":"Dispatcher","phone":"+971501234567","emirate":"Dubai","status":"Active"},{"id":2,"name":"Fatima Al Hashimi","designation":"Accountant","phone":"+971502345678","emirate":"Abu Dhabi","status":"Active"},{"id":3,"name":"Mohammed Rashed","designation":"Driver","phone":"+971503456789","emirate":"Sharjah","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "accounts/clients" "Clients" "العملاء التجار" "Manage business clients" "إدارة العملاء التجار" "Building2" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"company","en":"Company","ar":"الشركة"},{"key":"contact","en":"Contact","ar":"جهة الاتصال"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"orders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"company":"Noon.com","contact":"Ali Hassan","phone":"+971501111111","emirate":"Dubai","orders":4520,"status":"Active"},{"id":2,"company":"Namshi","contact":"Sara Ahmed","phone":"+971502222222","emirate":"Dubai","orders":2310,"status":"Active"},{"id":3,"company":"Mumzworld","contact":"Layla Khalil","phone":"+971503333333","emirate":"Abu Dhabi","orders":1280,"status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "accounts/customers" "Customers" "المستلمون" "Manage end customers" "إدارة المستلمين" "User" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Name","ar":"الاسم"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"totalOrders","en":"Orders","ar":"الطلبات"}]' \
  '[{"id":1,"name":"Khalid Al Maktoum","phone":"+971551234567","area":"Deira","emirate":"Dubai","totalOrders":12},{"id":2,"name":"Aisha Mohammed","phone":"+971552345678","area":"JBR","emirate":"Dubai","totalOrders":8},{"id":3,"name":"Hassan Saeed","phone":"+971553456789","area":"Khalifa City","emirate":"Abu Dhabi","totalOrders":5}]'

create_page "accounts/agents" "Agents" "الوكلاء" "Manage delivery agents" "إدارة وكلاء التوصيل" "Users" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Agent Name","ar":"اسم الوكيل"},{"key":"company","en":"Company","ar":"الشركة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"commission","en":"Commission %","ar":"العمولة %"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Express Delivery Co.","company":"Express LLC","emirate":"Dubai","commission":"12%","status":"Active"},{"id":2,"name":"Speed Cargo","company":"Speed FZE","emirate":"Sharjah","commission":"10%","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}'

create_page "accounts/users" "Users" "المستخدمون" "Manage system users and roles" "إدارة المستخدمين والأدوار" "User" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Username","ar":"اسم المستخدم"},{"key":"email","en":"Email","ar":"البريد"},{"key":"role","en":"Role","ar":"الدور"},{"key":"lastLogin","en":"Last Login","ar":"آخر دخول"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"admin","email":"admin@omex.ae","role":"Admin","lastLogin":"2024-01-15 09:30","status":"Active"},{"id":2,"name":"dispatcher1","email":"dispatch@omex.ae","role":"Dispatcher","lastLogin":"2024-01-15 08:45","status":"Active"},{"id":3,"name":"driver.ahmed","email":"ahmed@omex.ae","role":"Driver","lastLogin":"2024-01-14 17:20","status":"Active"}]' \
  'statusKey="role" statusColors={{"Admin":"bg-purple-100 text-purple-700","Dispatcher":"bg-blue-100 text-blue-700","Driver":"bg-green-100 text-green-700","Accountant":"bg-amber-100 text-amber-700"}}'

# ── Orders: Batch Print, Today, Hold, Reverse ──
create_page "orders/batch-print" "Batch Print" "طباعة مجمعة" "Print multiple order labels" "طباعة بوالص متعددة" "Printer" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240115-001","client":"Noon.com","customer":"Khalid M.","area":"Deira","status":"Ready"},{"id":2,"orderNo":"OMX-20240115-002","client":"Namshi","customer":"Aisha A.","area":"JBR","status":"Ready"},{"id":3,"orderNo":"OMX-20240115-003","client":"Mumzworld","customer":"Hassan S.","area":"Khalifa City","status":"Ready"}]' \
  'statusKey="status" statusColors={{"Ready":"bg-green-100 text-green-700","Printed":"bg-blue-100 text-blue-700"}}'

create_page "orders/today" "Today'\''s Orders" "طلبات اليوم" "View all orders for today" "عرض جميع طلبات اليوم" "Clock" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240115-001","client":"Noon.com","customer":"Khalid M.","area":"Deira","amount":"120 AED","status":"Delivered"},{"id":2,"orderNo":"OMX-20240115-002","client":"Namshi","customer":"Aisha A.","area":"JBR","amount":"85 AED","status":"Out for Delivery"},{"id":3,"orderNo":"OMX-20240115-003","client":"Mumzworld","customer":"Hassan S.","area":"Khalifa City","amount":"210 AED","status":"Pending"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Out for Delivery":"bg-blue-100 text-blue-700","Pending":"bg-amber-100 text-amber-700","Failed":"bg-red-100 text-red-700"}}'

create_page "orders/hold" "Hold Orders" "الطلبات المجمدة" "Manage held orders" "إدارة الطلبات المجمدة" "Ban" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"reason","en":"Hold Reason","ar":"سبب التجميد"},{"key":"holdDate","en":"Hold Date","ar":"تاريخ التجميد"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240113-042","client":"Noon.com","reason":"Customer request","holdDate":"2024-01-13","status":"On Hold"},{"id":2,"orderNo":"OMX-20240114-015","client":"Namshi","reason":"Address issue","holdDate":"2024-01-14","status":"On Hold"}]' \
  'statusKey="status" statusColors={{"On Hold":"bg-amber-100 text-amber-700","Released":"bg-green-100 text-green-700"}}'

create_page "orders/reverse" "Reverse Cancel" "إلغاء الإلغاء" "Reverse cancelled orders" "استعادة الطلبات الملغية" "RefreshCcw" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"cancelDate","en":"Cancel Date","ar":"تاريخ الإلغاء"},{"key":"reason","en":"Cancel Reason","ar":"سبب الإلغاء"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240110-022","client":"Noon.com","cancelDate":"2024-01-10","reason":"Duplicate order","status":"Cancelled"},{"id":2,"orderNo":"OMX-20240112-038","client":"Namshi","cancelDate":"2024-01-12","reason":"Customer request","status":"Reversed"}]' \
  'statusKey="status" statusColors={{"Cancelled":"bg-red-100 text-red-700","Reversed":"bg-green-100 text-green-700"}}'

echo "✅ All pages created successfully!"
