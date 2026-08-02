#!/bin/bash
BASE="/Users/hany/Desktop/omex system/src/app/dashboard"

create_page() {
  local dir="$1" titleEn="$2" titleAr="$3" descEn="$4" descAr="$5" icon="$6" colsJson="$7" rowsJson="$8" extras="${9:-}"
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

# ── Store / Scan ──
create_page "store/in-scan" "In Scan" "مسح الدخول" "Scan packages entering the store" "مسح الطرود الداخلة للمخزن" "ScanLine" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"scannedBy","en":"Scanned By","ar":"المسؤول"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"barcode":"OMX001234567","orderNo":"OMX-20240115-001","client":"Noon.com","scannedBy":"Ahmed K.","time":"09:15 AM","status":"Received"},{"id":2,"barcode":"OMX001234568","orderNo":"OMX-20240115-002","client":"Namshi","scannedBy":"Ahmed K.","time":"09:16 AM","status":"Received"},{"id":3,"barcode":"OMX001234569","orderNo":"OMX-20240115-003","client":"Mumzworld","scannedBy":"Mohammed A.","time":"09:20 AM","status":"Received"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Received":"bg-green-100 text-green-700","Error":"bg-red-100 text-red-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"'

create_page "store/out-scan" "Out Scan" "مسح الخروج" "Scan packages leaving the store" "مسح الطرود الخارجة من المخزن" "ScanLine" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"scannedBy","en":"Scanned By","ar":"المسؤول"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"barcode":"OMX001234567","orderNo":"OMX-20240115-001","driver":"Ahmed K.","scannedBy":"Warehouse M.","time":"10:30 AM","status":"Dispatched"},{"id":2,"barcode":"OMX001234568","orderNo":"OMX-20240115-002","driver":"Ahmed K.","scannedBy":"Warehouse M.","time":"10:31 AM","status":"Dispatched"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Dispatched":"bg-blue-100 text-blue-700","Error":"bg-red-100 text-red-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"'

create_page "store/delivery-scan" "Delivery Scan" "مسح التوصيل" "Scan packages on delivery confirmation" "مسح الطرود عند تأكيد التوصيل" "Truck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"barcode":"OMX001234567","orderNo":"OMX-20240115-001","driver":"Ahmed K.","customer":"Khalid M.","time":"02:15 PM","status":"Delivered"},{"id":2,"barcode":"OMX001234568","orderNo":"OMX-20240115-002","driver":"Ahmed K.","customer":"Aisha A.","time":"02:45 PM","status":"Delivered"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"'

create_page "store/bulk-in" "Bulk In Scan" "مسح دخول مجمع" "Bulk scan incoming packages" "مسح مجمع للطرود الداخلة" "Archive" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"batchNo","en":"Batch No","ar":"رقم الدفعة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"totalPcs","en":"Total Pieces","ar":"إجمالي القطع"},{"key":"scanned","en":"Scanned","ar":"تم المسح"},{"key":"errors","en":"Errors","ar":"الأخطاء"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"batchNo":"BIN-20240115-01","client":"Noon.com","totalPcs":120,"scanned":120,"errors":0,"status":"Completed"},{"id":2,"batchNo":"BIN-20240115-02","client":"Namshi","totalPcs":85,"scanned":83,"errors":2,"status":"Completed"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","In Progress":"bg-blue-100 text-blue-700"}} createLabelEn="New Batch" createLabelAr="دفعة جديدة"'

create_page "store/bulk-out" "Bulk Out Scan" "مسح خروج مجمع" "Bulk scan outgoing packages" "مسح مجمع للطرود الخارجة" "Archive" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"batchNo","en":"Batch No","ar":"رقم الدفعة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"totalPcs","en":"Total Pieces","ar":"إجمالي القطع"},{"key":"scanned","en":"Scanned","ar":"تم المسح"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"batchNo":"BOUT-20240115-01","driver":"Ahmed K.","totalPcs":20,"scanned":20,"time":"10:00 AM","status":"Dispatched"},{"id":2,"batchNo":"BOUT-20240115-02","driver":"Mohammed A.","totalPcs":15,"scanned":15,"time":"10:15 AM","status":"Dispatched"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Dispatched":"bg-blue-100 text-blue-700","In Progress":"bg-amber-100 text-amber-700"}} createLabelEn="New Batch" createLabelAr="دفعة جديدة"'

create_page "store/pickup-scan" "Pickup Scan" "مسح الاستلام" "Scan packages picked up from clients" "مسح الطرود المستلمة من العملاء" "Package" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"client","en":"Client","ar":"العميل"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"items","en":"Items","ar":"العناصر"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"barcode":"PKP001234567","client":"Noon.com","driver":"Ahmed K.","items":25,"time":"08:30 AM","status":"Picked Up"},{"id":2,"barcode":"PKP001234568","client":"Namshi","driver":"Omar H.","items":12,"time":"09:00 AM","status":"Picked Up"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Picked Up":"bg-green-100 text-green-700","In Progress":"bg-blue-100 text-blue-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"'

# ── Tracking Sub-pages ──
create_page "tracking/voucher" "Track By Voucher" "تتبع بالبوليصة" "Track orders by voucher number" "تتبع الطلبات برقم البوليصة" "Receipt" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"voucherNo","en":"Voucher No","ar":"رقم البوليصة"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"lastUpdate","en":"Last Update","ar":"آخر تحديث"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"voucherNo":"VCH-20240115-001","orderNo":"OMX-20240115-001","client":"Noon.com","customer":"Khalid M.","lastUpdate":"02:15 PM","status":"Delivered"},{"id":2,"voucherNo":"VCH-20240115-002","orderNo":"OMX-20240115-002","client":"Namshi","customer":"Aisha A.","lastUpdate":"11:30 AM","status":"Out for Delivery"}]' \
  'statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Out for Delivery":"bg-blue-100 text-blue-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}'

create_page "tracking/bill" "Track By Bill" "تتبع بالفاتورة" "Track orders by bill number" "تتبع الطلبات برقم الفاتورة" "FileText" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"billNo","en":"Bill No","ar":"رقم الفاتورة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"billNo":"BILL-20240115-01","client":"Noon.com","orders":45,"amount":"12,500 AED","status":"Paid"},{"id":2,"billNo":"BILL-20240114-02","client":"Namshi","orders":28,"amount":"8,200 AED","status":"Pending"}]' \
  'statusKey="status" statusColors={{"Paid":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}'

create_page "tracking/customer" "Track By Customer" "تتبع بالعميل" "Track orders by customer" "تتبع الطلبات بحسب المستلم" "User" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"totalOrders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"pending","en":"Pending","ar":"قيد الانتظار"}]' \
  '[{"id":1,"customer":"Khalid Al Maktoum","phone":"+971551234567","totalOrders":12,"delivered":10,"pending":2},{"id":2,"customer":"Aisha Mohammed","phone":"+971552345678","totalOrders":8,"delivered":8,"pending":0}]' \
  'showCreate={false}'

# ── Messages ──
create_page "messages/emails" "Draft Emails" "مسودات البريد" "Manage email drafts and templates" "إدارة مسودات وقوالب البريد" "Mail" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"subject","en":"Subject","ar":"الموضوع"},{"key":"to","en":"To","ar":"إلى"},{"key":"type","en":"Type","ar":"النوع"},{"key":"createdAt","en":"Created","ar":"تاريخ الإنشاء"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"subject":"Monthly Invoice - January 2024","to":"noon@example.com","type":"Invoice","createdAt":"2024-01-15","status":"Draft"},{"id":2,"subject":"Delivery Confirmation","to":"client@example.com","type":"Notification","createdAt":"2024-01-14","status":"Sent"}]' \
  'statusKey="status" statusColors={{"Draft":"bg-amber-100 text-amber-700","Sent":"bg-green-100 text-green-700"}} createLabelEn="New Email" createLabelAr="بريد جديد"'

create_page "messages/sms" "Draft SMS" "مسودات الرسائل" "Manage SMS drafts and templates" "إدارة مسودات وقوالب الرسائل القصيرة" "MessageCircle" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"template","en":"Template","ar":"القالب"},{"key":"message","en":"Message Preview","ar":"معاينة الرسالة"},{"key":"type","en":"Type","ar":"النوع"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"template":"Delivery OTP","message":"Your OTP is {code}. Valid for 5 min.","type":"Transactional","status":"Active"},{"id":2,"template":"Delivery Notification","message":"Your order {orderNo} is out for delivery.","type":"Notification","status":"Active"},{"id":3,"template":"Failed Delivery","message":"Delivery attempt for {orderNo} failed.","type":"Alert","status":"Draft"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Draft":"bg-amber-100 text-amber-700"}} createLabelEn="New Template" createLabelAr="قالب جديد"'

create_page "messages/delivery-sms" "Delivery Note SMS" "رسائل بوالص التوصيل" "Send SMS notifications for delivery notes" "إرسال رسائل قصيرة لبوالص التوصيل" "FileDown" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"noteNo","en":"Delivery Note","ar":"رقم البوليصة"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"message","en":"Message","ar":"الرسالة"},{"key":"sentAt","en":"Sent At","ar":"وقت الإرسال"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"noteNo":"DN-20240115-01","phone":"+971551234567","message":"Your delivery DN-01 is on the way","sentAt":"10:35 AM","status":"Delivered"},{"id":2,"noteNo":"DN-20240115-02","phone":"+971552345678","message":"Your delivery DN-02 is on the way","sentAt":"10:36 AM","status":"Delivered"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}'

# ── Fleet expanded sub-pages ──
create_page "fleet/assignments" "Assignments" "التعيينات" "Vehicle-driver assignments" "تعيينات السائقين للمركبات" "UserCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"startDate","en":"Start Date","ar":"تاريخ البداية"},{"key":"endDate","en":"End Date","ar":"تاريخ النهاية"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed Khalil","startDate":"2024-01-01","endDate":"—","status":"Active"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed Ali","startDate":"2024-01-01","endDate":"—","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Ended":"bg-gray-100 text-gray-700"}}'

create_page "fleet/fuel" "Fuel Logs" "سجل الوقود" "Track vehicle fuel consumption" "تتبع استهلاك الوقود" "Fuel" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"liters","en":"Liters","ar":"لتر"},{"key":"cost","en":"Cost","ar":"التكلفة"},{"key":"odometer","en":"Odometer","ar":"العداد"},{"key":"date","en":"Date","ar":"التاريخ"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed K.","liters":"45","cost":"135 AED","odometer":"52,340","date":"2024-01-15"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed A.","liters":"38","cost":"114 AED","odometer":"41,200","date":"2024-01-15"}]' \
  'showDateFilter={true} createLabelEn="Add Log" createLabelAr="إضافة سجل"'

create_page "fleet/documents" "Documents" "المستندات" "Vehicle documents and registrations" "مستندات وتسجيلات المركبات" "FileCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"docType","en":"Document Type","ar":"نوع المستند"},{"key":"number","en":"Number","ar":"الرقم"},{"key":"expiry","en":"Expiry Date","ar":"تاريخ الانتهاء"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","docType":"Registration","number":"REG-2024-001","expiry":"2025-01-15","status":"Valid"},{"id":2,"vehicle":"SHJ B-67890","docType":"Registration","number":"REG-2024-002","expiry":"2024-03-20","status":"Expiring Soon"}]' \
  'statusKey="status" statusColors={{"Valid":"bg-green-100 text-green-700","Expiring Soon":"bg-amber-100 text-amber-700","Expired":"bg-red-100 text-red-700"}}'

create_page "fleet/insurance" "Insurance" "التأمين" "Vehicle insurance policies" "وثائق تأمين المركبات" "Shield" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"provider","en":"Provider","ar":"المزود"},{"key":"policyNo","en":"Policy No","ar":"رقم البوليصة"},{"key":"premium","en":"Premium","ar":"القسط"},{"key":"expiry","en":"Expiry","ar":"الانتهاء"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","provider":"Oman Insurance","policyNo":"INS-2024-001","premium":"3,500 AED","expiry":"2025-01-15","status":"Active"},{"id":2,"vehicle":"SHJ B-67890","provider":"AXA Gulf","policyNo":"INS-2024-002","premium":"3,200 AED","expiry":"2024-06-20","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Expiring":"bg-amber-100 text-amber-700","Expired":"bg-red-100 text-red-700"}}'

create_page "fleet/permits" "Permits" "التصاريح" "Vehicle permits and licenses" "تصاريح ورخص المركبات" "ClipboardCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"permitType","en":"Permit Type","ar":"نوع التصريح"},{"key":"number","en":"Number","ar":"الرقم"},{"key":"issueDate","en":"Issue Date","ar":"تاريخ الإصدار"},{"key":"expiry","en":"Expiry","ar":"الانتهاء"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","permitType":"Commercial License","number":"PRM-2024-001","issueDate":"2024-01-01","expiry":"2025-01-01","status":"Valid"}]' \
  'statusKey="status" statusColors={{"Valid":"bg-green-100 text-green-700","Expired":"bg-red-100 text-red-700"}}'

create_page "fleet/inspections" "Inspections" "الفحوصات" "Vehicle inspection records" "سجلات فحص المركبات" "ClipboardCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"type","en":"Inspection Type","ar":"نوع الفحص"},{"key":"inspector","en":"Inspector","ar":"الفاحص"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"nextDue","en":"Next Due","ar":"الموعد القادم"},{"key":"result","en":"Result","ar":"النتيجة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","type":"Annual RTA","inspector":"RTA Dubai","date":"2024-01-10","nextDue":"2025-01-10","result":"Passed"},{"id":2,"vehicle":"SHJ B-67890","type":"Pre-trip","inspector":"Ahmed K.","date":"2024-01-15","nextDue":"2024-01-16","result":"Passed"}]' \
  'statusKey="result" statusColors={{"Passed":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}}'

create_page "fleet/expenses" "Vehicle Expenses" "مصروفات المركبات" "Track all vehicle-related expenses" "تتبع جميع مصروفات المركبات" "DollarSign" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"type","en":"Expense Type","ar":"نوع المصروف"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","type":"Fuel","amount":"135 AED","date":"2024-01-15","status":"Approved"},{"id":2,"vehicle":"DXB A-12345","type":"Salik Toll","amount":"8 AED","date":"2024-01-15","status":"Approved"},{"id":3,"vehicle":"SHJ B-67890","type":"Tire Replace","amount":"1,200 AED","date":"2024-01-14","status":"Pending"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Approved":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}'

create_page "fleet/odometer" "Odometer Logs" "سجل العداد" "Track vehicle mileage" "تتبع المسافات المقطوعة" "Gauge" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"startKm","en":"Start KM","ar":"بداية الكم"},{"key":"endKm","en":"End KM","ar":"نهاية الكم"},{"key":"totalKm","en":"Total KM","ar":"إجمالي الكم"},{"key":"date","en":"Date","ar":"التاريخ"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed K.","startKm":"52,100","endKm":"52,340","totalKm":"240","date":"2024-01-15"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed A.","startKm":"41,050","endKm":"41,200","totalKm":"150","date":"2024-01-15"}]' \
  'showDateFilter={true} createLabelEn="Add Log" createLabelAr="إضافة سجل"'

create_page "fleet/accidents" "Accidents" "الحوادث" "Vehicle accident records" "سجل حوادث المركبات" "AlertTriangle" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"location","en":"Location","ar":"الموقع"},{"key":"damage","en":"Damage Cost","ar":"تكلفة الضرر"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"AJM C-11223","driver":"Omar Hassan","date":"2024-01-12","location":"Al Nahda, Sharjah","damage":"4,500 AED","status":"Under Review"},{"id":2,"vehicle":"DXB A-12345","driver":"Ahmed K.","date":"2023-11-05","location":"Deira, Dubai","damage":"1,200 AED","status":"Resolved"}]' \
  'statusKey="status" statusColors={{"Under Review":"bg-amber-100 text-amber-700","Resolved":"bg-green-100 text-green-700","Claimed":"bg-blue-100 text-blue-700"}}'

create_page "fleet/service-history" "Service History" "سجل الخدمة" "Vehicle service and maintenance history" "سجل الخدمة والصيانة" "History" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"service","en":"Service","ar":"الخدمة"},{"key":"workshop","en":"Workshop","ar":"الورشة"},{"key":"cost","en":"Cost","ar":"التكلفة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"nextService","en":"Next Service","ar":"الخدمة القادمة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","service":"Oil Change","workshop":"Al Futtaim","cost":"350 AED","date":"2024-01-10","nextService":"2024-04-10"},{"id":2,"vehicle":"SHJ B-67890","service":"Brake Pads","workshop":"Quick Fit","cost":"800 AED","date":"2024-01-08","nextService":"2024-07-08"}]' \
  'showDateFilter={true}'

create_page "fleet/fines" "Fine Records" "سجل المخالفات" "Traffic fines and violations" "المخالفات المرورية" "Ban" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"violation","en":"Violation","ar":"المخالفة"},{"key":"amount","en":"Fine Amount","ar":"مبلغ المخالفة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed K.","violation":"Speed limit exceeded","amount":"600 AED","date":"2024-01-12","status":"Paid"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed A.","violation":"Parking violation","amount":"200 AED","date":"2024-01-14","status":"Unpaid"}]' \
  'statusKey="status" statusColors={{"Paid":"bg-green-100 text-green-700","Unpaid":"bg-red-100 text-red-700"}}'

# ── Reports ──
create_page "reports/orders" "Order Reports" "تقارير الطلبات" "Order analytics and reports" "تحليلات وتقارير الطلبات" "PackageCheck" \
  '[{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalOrders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"cancelled","en":"Cancelled","ar":"ملغى"},{"key":"rate","en":"Success Rate","ar":"نسبة النجاح"}]' \
  '[{"period":"Jan 2024","totalOrders":4520,"delivered":4200,"failed":180,"cancelled":140,"rate":"92.9%"},{"period":"Dec 2023","totalOrders":5100,"delivered":4800,"failed":200,"cancelled":100,"rate":"94.1%"},{"period":"Nov 2023","totalOrders":3800,"delivered":3500,"failed":150,"cancelled":150,"rate":"92.1%"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/pickup" "Pickup Reports" "تقارير الاستلام" "Pickup performance reports" "تقارير أداء الاستلام" "Package" \
  '[{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalPickups","en":"Total Pickups","ar":"إجمالي الاستلام"},{"key":"onTime","en":"On Time","ar":"في الوقت"},{"key":"late","en":"Late","ar":"متأخر"},{"key":"avgTime","en":"Avg Time (min)","ar":"متوسط الوقت (دقيقة)"}]' \
  '[{"period":"Jan 2024","totalPickups":320,"onTime":290,"late":30,"avgTime":"25"},{"period":"Dec 2023","totalPickups":380,"onTime":350,"late":30,"avgTime":"22"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/delivery" "Delivery Reports" "تقارير التوصيل" "Delivery performance analytics" "تحليلات أداء التوصيل" "Truck" \
  '[{"key":"period","en":"Period","ar":"الفترة"},{"key":"total","en":"Total","ar":"الإجمالي"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"avgTime","en":"Avg Time (hr)","ar":"متوسط الوقت (ساعة)"},{"key":"rate","en":"Success Rate","ar":"نسبة النجاح"}]' \
  '[{"period":"Jan 2024","total":4520,"delivered":4200,"failed":320,"avgTime":"4.2","rate":"92.9%"},{"period":"Dec 2023","total":5100,"delivered":4800,"failed":300,"avgTime":"3.8","rate":"94.1%"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/shipments" "Shipment Reports" "تقارير الشحنات" "Shipment analytics" "تحليلات الشحنات" "PackagePlus" \
  '[{"key":"period","en":"Period","ar":"الفترة"},{"key":"total","en":"Total Shipments","ar":"إجمالي الشحنات"},{"key":"weight","en":"Total Weight (KG)","ar":"الوزن الإجمالي (كجم)"},{"key":"avgOrders","en":"Avg Orders/Shipment","ar":"متوسط الطلبات/شحنة"},{"key":"onTime","en":"On Time %","ar":"في الوقت %"}]' \
  '[{"period":"Jan 2024","total":85,"weight":"12,500","avgOrders":53,"onTime":"91%"},{"period":"Dec 2023","total":102,"weight":"15,300","avgOrders":50,"onTime":"93%"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/clients" "Clients Reports" "تقارير العملاء التجار" "Client analytics and performance" "تحليلات وأداء العملاء التجار" "Building2" \
  '[{"key":"client","en":"Client","ar":"العميل"},{"key":"totalOrders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"revenue","en":"Revenue","ar":"الإيرادات"},{"key":"avgPerDay","en":"Avg/Day","ar":"المتوسط/يوم"}]' \
  '[{"client":"Noon.com","totalOrders":4520,"delivered":4200,"revenue":"67,800 AED","avgPerDay":146},{"client":"Namshi","totalOrders":2310,"delivered":2180,"revenue":"34,650 AED","avgPerDay":75},{"client":"Mumzworld","totalOrders":1280,"delivered":1200,"revenue":"19,200 AED","avgPerDay":41}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/customers" "Customer Reports" "تقارير المستلمين" "Customer analytics" "تحليلات المستلمين" "Users" \
  '[{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"totalCustomers","en":"Customers","ar":"المستلمون"},{"key":"totalOrders","en":"Orders","ar":"الطلبات"},{"key":"avgOrders","en":"Avg Orders","ar":"متوسط الطلبات"},{"key":"satisfaction","en":"Satisfaction","ar":"الرضا"}]' \
  '[{"emirate":"Dubai","totalCustomers":5200,"totalOrders":12000,"avgOrders":"2.3","satisfaction":"4.5/5"},{"emirate":"Abu Dhabi","totalCustomers":2100,"totalOrders":4800,"avgOrders":"2.3","satisfaction":"4.3/5"},{"emirate":"Sharjah","totalCustomers":1800,"totalOrders":3600,"avgOrders":"2.0","satisfaction":"4.2/5"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/employees" "Employee Reports" "تقارير الموظفين" "Employee performance reports" "تقارير أداء الموظفين" "UserCheck" \
  '[{"key":"employee","en":"Employee","ar":"الموظف"},{"key":"designation","en":"Designation","ar":"المسمى"},{"key":"ordersHandled","en":"Orders Handled","ar":"الطلبات المعالجة"},{"key":"avgPerDay","en":"Avg/Day","ar":"المتوسط/يوم"},{"key":"rating","en":"Rating","ar":"التقييم"}]' \
  '[{"employee":"Ahmed Khalil","designation":"Driver","ordersHandled":320,"avgPerDay":16,"rating":"4.8/5"},{"employee":"Mohammed Ali","designation":"Driver","ordersHandled":280,"avgPerDay":14,"rating":"4.6/5"},{"employee":"Fatima H.","designation":"Dispatcher","ordersHandled":1200,"avgPerDay":60,"rating":"4.9/5"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/agents" "Agent Reports" "تقارير الوكلاء" "Agent performance and commission reports" "تقارير أداء وعمولات الوكلاء" "User" \
  '[{"key":"agent","en":"Agent","ar":"الوكيل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"commission","en":"Commission","ar":"العمولة"},{"key":"rate","en":"Success Rate","ar":"نسبة النجاح"}]' \
  '[{"agent":"Express Delivery Co.","orders":1500,"delivered":1420,"commission":"18,000 AED","rate":"94.7%"},{"agent":"Speed Cargo","orders":800,"delivered":740,"commission":"7,400 AED","rate":"92.5%"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/expenses" "Expense Reports" "تقارير المصروفات" "Expense analytics and breakdown" "تحليلات وتفصيل المصروفات" "DollarSign" \
  '[{"key":"category","en":"Category","ar":"الفئة"},{"key":"thisMonth","en":"This Month","ar":"هذا الشهر"},{"key":"lastMonth","en":"Last Month","ar":"الشهر الماضي"},{"key":"change","en":"Change %","ar":"التغيير %"},{"key":"budget","en":"Budget","ar":"الميزانية"}]' \
  '[{"category":"Fuel","thisMonth":"12,500 AED","lastMonth":"11,800 AED","change":"+5.9%","budget":"15,000 AED"},{"category":"Maintenance","thisMonth":"8,200 AED","lastMonth":"6,500 AED","change":"+26.2%","budget":"10,000 AED"},{"category":"Fines","thisMonth":"1,400 AED","lastMonth":"800 AED","change":"+75%","budget":"2,000 AED"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/payments" "Payment Reports" "تقارير المدفوعات" "Payment collection and reconciliation" "تقارير تحصيل ومطابقة المدفوعات" "Wallet" \
  '[{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalInvoiced","en":"Invoiced","ar":"المفوتر"},{"key":"collected","en":"Collected","ar":"المحصل"},{"key":"pending","en":"Pending","ar":"قيد الانتظار"},{"key":"collectionRate","en":"Rate","ar":"النسبة"}]' \
  '[{"period":"Jan 2024","totalInvoiced":"245,000 AED","collected":"218,000 AED","pending":"27,000 AED","collectionRate":"89%"},{"period":"Dec 2023","totalInvoiced":"280,000 AED","collected":"268,000 AED","pending":"12,000 AED","collectionRate":"95.7%"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/returns" "Return Reports" "تقارير المرتجعات" "Return analytics and trends" "تحليلات واتجاهات المرتجعات" "RotateCcw" \
  '[{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalReturns","en":"Total Returns","ar":"إجمالي المرتجعات"},{"key":"processed","en":"Processed","ar":"تمت معالجته"},{"key":"pending","en":"Pending","ar":"قيد الانتظار"},{"key":"returnRate","en":"Return Rate","ar":"نسبة الإرجاع"}]' \
  '[{"period":"Jan 2024","totalReturns":180,"processed":150,"pending":30,"returnRate":"4.0%"},{"period":"Dec 2023","totalReturns":210,"processed":200,"pending":10,"returnRate":"4.1%"}]' \
  'showDateFilter={true} showCreate={false}'

create_page "reports/financial" "Financial Reports" "التقارير المالية" "Financial summaries and P&L" "الملخصات المالية والأرباح والخسائر" "BarChart" \
  '[{"key":"metric","en":"Metric","ar":"المقياس"},{"key":"thisMonth","en":"This Month","ar":"هذا الشهر"},{"key":"lastMonth","en":"Last Month","ar":"الشهر الماضي"},{"key":"ytd","en":"YTD","ar":"منذ بداية العام"},{"key":"change","en":"Change","ar":"التغيير"}]' \
  '[{"metric":"Revenue","thisMonth":"245,000 AED","lastMonth":"280,000 AED","ytd":"245,000 AED","change":"-12.5%"},{"metric":"Expenses","thisMonth":"82,000 AED","lastMonth":"78,000 AED","ytd":"82,000 AED","change":"+5.1%"},{"metric":"Net Profit","thisMonth":"163,000 AED","lastMonth":"202,000 AED","ytd":"163,000 AED","change":"-19.3%"},{"metric":"COD Collected","thisMonth":"120,000 AED","lastMonth":"145,000 AED","ytd":"120,000 AED","change":"-17.2%"}]' \
  'showDateFilter={true} showCreate={false}'

# ── Counters ──
create_page "counters/numbers" "Counter Nos" "أرقام العدادات" "Manage auto-incrementing counters" "إدارة العدادات التلقائية" "Hash" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Counter Name","ar":"اسم العداد"},{"key":"prefix","en":"Prefix","ar":"البادئة"},{"key":"lastNo","en":"Last Number","ar":"آخر رقم"},{"key":"nextNo","en":"Next Number","ar":"الرقم التالي"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"name":"Order Number","prefix":"OMX","lastNo":"20240115-042","nextNo":"20240115-043","status":"Active"},{"id":2,"name":"Shipment Number","prefix":"SHP","lastNo":"20240115-03","nextNo":"20240115-04","status":"Active"},{"id":3,"name":"Invoice Number","prefix":"INV","lastNo":"20240115-08","nextNo":"20240115-09","status":"Active"},{"id":4,"name":"Return Number","prefix":"RET","lastNo":"20240115-02","nextNo":"20240115-03","status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Paused":"bg-amber-100 text-amber-700"}}'

create_page "counters/change-ref" "Change Store Ref" "تغيير مرجع المخزن" "Change store reference numbers" "تغيير أرقام مراجع المخزن" "Replace" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"oldRef","en":"Old Reference","ar":"المرجع القديم"},{"key":"newRef","en":"New Reference","ar":"المرجع الجديد"},{"key":"changedBy","en":"Changed By","ar":"تم التغيير بواسطة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"oldRef":"STR-DXB-001","newRef":"STR-DXB-A01","changedBy":"Admin","date":"2024-01-15","status":"Applied"},{"id":2,"oldRef":"STR-SHJ-002","newRef":"STR-SHJ-B02","changedBy":"Admin","date":"2024-01-14","status":"Applied"}]' \
  'statusKey="status" statusColors={{"Applied":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}'

create_page "counters/area-lock" "Area Store No Lock" "قفل رقم المنطقة" "Lock area store numbers" "قفل أرقام مخازن المناطق" "Lock" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"storeNo","en":"Store No","ar":"رقم المخزن"},{"key":"lockedBy","en":"Locked By","ar":"تم القفل بواسطة"},{"key":"lockDate","en":"Lock Date","ar":"تاريخ القفل"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"area":"Deira","storeNo":"STR-DXB-A01","lockedBy":"Admin","lockDate":"2024-01-15","status":"Locked"},{"id":2,"area":"JBR","storeNo":"STR-DXB-A03","lockedBy":"Admin","lockDate":"2024-01-15","status":"Unlocked"}]' \
  'statusKey="status" statusColors={{"Locked":"bg-red-100 text-red-700","Unlocked":"bg-green-100 text-green-700"}}'

create_page "counters/update-ref" "Update Store Ref No" "تحديث رقم المرجع" "Update store reference numbers" "تحديث أرقام مراجع المخازن" "RefreshCcw" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"store","en":"Store","ar":"المخزن"},{"key":"currentRef","en":"Current Ref","ar":"المرجع الحالي"},{"key":"newRef","en":"New Ref","ar":"المرجع الجديد"},{"key":"updatedBy","en":"Updated By","ar":"تم التحديث بواسطة"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"store":"Dubai Main","currentRef":"STR-DXB-A01","newRef":"STR-DXB-M01","updatedBy":"Admin","status":"Pending"},{"id":2,"store":"Sharjah Hub","currentRef":"STR-SHJ-B02","newRef":"STR-SHJ-H02","updatedBy":"Admin","status":"Applied"}]' \
  'statusKey="status" statusColors={{"Applied":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}'

echo "✅ Batch 3 ALL pages created!"
