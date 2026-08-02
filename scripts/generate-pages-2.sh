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

# ── Uploads ──
create_page "uploads/orders" "Order Upload" "رفع الطلبات" "Bulk upload orders via Excel/CSV" "رفع الطلبات عبر Excel/CSV" "Upload" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"fileName","en":"File Name","ar":"اسم الملف"},{"key":"uploadDate","en":"Upload Date","ar":"تاريخ الرفع"},{"key":"records","en":"Records","ar":"السجلات"},{"key":"success","en":"Success","ar":"ناجح"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"fileName":"orders_jan15.xlsx","uploadDate":"2024-01-15","records":250,"success":245,"failed":5,"status":"Completed"},{"id":2,"fileName":"orders_jan14.xlsx","uploadDate":"2024-01-14","records":180,"success":180,"failed":0,"status":"Completed"},{"id":3,"fileName":"orders_jan13.csv","uploadDate":"2024-01-13","records":320,"success":310,"failed":10,"status":"Completed"}]' \
  'statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Processing":"bg-blue-100 text-blue-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Upload File" createLabelAr="رفع ملف"'

create_page "uploads/locations" "Location Upload" "رفع المواقع" "Bulk upload delivery locations" "رفع مواقع التوصيل" "MapPinned" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"fileName","en":"File Name","ar":"اسم الملف"},{"key":"uploadDate","en":"Upload Date","ar":"تاريخ الرفع"},{"key":"records","en":"Records","ar":"السجلات"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"fileName":"locations_dubai.xlsx","uploadDate":"2024-01-15","records":150,"status":"Completed"},{"id":2,"fileName":"locations_sharjah.csv","uploadDate":"2024-01-14","records":80,"status":"Completed"}]' \
  'statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Upload File" createLabelAr="رفع ملف"'

create_page "uploads/clients" "Client Upload" "رفع العملاء" "Bulk upload client data" "رفع بيانات العملاء" "Building2" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"fileName","en":"File Name","ar":"اسم الملف"},{"key":"uploadDate","en":"Upload Date","ar":"تاريخ الرفع"},{"key":"records","en":"Records","ar":"السجلات"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"fileName":"clients_jan.xlsx","uploadDate":"2024-01-15","records":45,"status":"Completed"}]' \
  'statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Upload File" createLabelAr="رفع ملف"'

# ── Delivery ──
create_page "delivery/notes" "Delivery Notes" "بوالص التوصيل" "Manage delivery notes" "إدارة بوالص التوصيل" "FileText" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"noteNo","en":"Note No","ar":"رقم البوليصة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"noteNo":"DN-20240115-01","driver":"Ahmed Khalil","orders":15,"area":"Deira","date":"2024-01-15","status":"Active"},{"id":2,"noteNo":"DN-20240115-02","driver":"Mohammed Ali","orders":12,"area":"JBR","date":"2024-01-15","status":"Completed"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Active":"bg-blue-100 text-blue-700","Completed":"bg-green-100 text-green-700"}}'

create_page "delivery/exchange" "Delivery Exchange" "تبديل التوصيل" "Exchange deliveries between drivers" "تبديل التوصيلات بين السائقين" "RefreshCw" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"fromDriver","en":"From Driver","ar":"من السائق"},{"key":"toDriver","en":"To Driver","ar":"إلى السائق"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240115-005","fromDriver":"Ahmed K.","toDriver":"Mohammed A.","reason":"Area reassignment","date":"2024-01-15","status":"Completed"},{"id":2,"orderNo":"OMX-20240115-012","fromDriver":"Omar H.","toDriver":"Saif R.","reason":"Vehicle breakdown","date":"2024-01-15","status":"Pending"}]' \
  'statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}'

create_page "delivery/push" "Push Order" "دفع الطلب" "Push orders to drivers for delivery" "دفع الطلبات للسائقين للتوصيل" "ArrowUpCircle" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"driver","en":"Assigned Driver","ar":"السائق المعين"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240115-020","client":"Noon.com","area":"Deira","driver":"Ahmed K.","status":"Pushed"},{"id":2,"orderNo":"OMX-20240115-021","client":"Namshi","area":"JBR","driver":"—","status":"Awaiting"}]' \
  'statusKey="status" statusColors={{"Pushed":"bg-green-100 text-green-700","Awaiting":"bg-amber-100 text-amber-700"}}'

# ── Shipments ──
create_page "shipments/new" "New Shipment" "شحنة جديدة" "Create a new shipment batch" "إنشاء دفعة شحن جديدة" "PackagePlus" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"shipmentNo","en":"Shipment No","ar":"رقم الشحنة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"destination","en":"Destination","ar":"الوجهة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"shipmentNo":"SHP-20240115-01","client":"Noon.com","orders":45,"destination":"Abu Dhabi","date":"2024-01-15","status":"Processing"}]' \
  'statusKey="status" statusColors={{"Processing":"bg-blue-100 text-blue-700","Shipped":"bg-green-100 text-green-700","Received":"bg-emerald-100 text-emerald-700"}} createLabelEn="New Shipment" createLabelAr="شحنة جديدة"'

create_page "shipments/list" "Shipment List" "قائمة الشحنات" "View all shipments" "عرض جميع الشحنات" "List" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"shipmentNo","en":"Shipment No","ar":"رقم الشحنة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"weight","en":"Weight (KG)","ar":"الوزن (كجم)"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"shipmentNo":"SHP-20240115-01","client":"Noon.com","orders":45,"weight":"320","status":"In Transit"},{"id":2,"shipmentNo":"SHP-20240114-03","client":"Namshi","orders":28,"weight":"185","status":"Delivered"},{"id":3,"shipmentNo":"SHP-20240113-02","client":"Mumzworld","orders":62,"weight":"410","status":"Delivered"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"In Transit":"bg-blue-100 text-blue-700","Delivered":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}'

# ── Returns ──
create_page "returns/create" "Create Return" "إنشاء مرتجع" "Create a new return request" "إنشاء طلب مرتجع جديد" "RotateCcw" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"returnNo":"RET-20240115-01","orderNo":"OMX-20240110-015","client":"Noon.com","reason":"Damaged item","date":"2024-01-15","status":"Processing"}]' \
  'statusKey="status" statusColors={{"Processing":"bg-blue-100 text-blue-700","Completed":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} createLabelEn="New Return" createLabelAr="مرتجع جديد"'

create_page "returns/clients" "Client Returns" "مرتجعات العملاء" "View client-initiated returns" "عرض المرتجعات من العملاء" "Building2" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"client","en":"Client","ar":"العميل"},{"key":"totalItems","en":"Items","ar":"العناصر"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"returnNo":"RET-20240115-01","client":"Noon.com","totalItems":3,"amount":"450 AED","status":"Pending"},{"id":2,"returnNo":"RET-20240114-02","client":"Namshi","totalItems":1,"amount":"120 AED","status":"Completed"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Completed":"bg-green-100 text-green-700"}} showCreate={false}'

create_page "returns/pending" "Pending Returns" "مرتجعات قيد الانتظار" "View pending return requests" "عرض المرتجعات المعلقة" "Clock" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"daysPending","en":"Days Pending","ar":"أيام الانتظار"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"returnNo":"RET-20240115-01","orderNo":"OMX-20240110-015","client":"Noon.com","reason":"Wrong item","daysPending":5,"status":"Pending"},{"id":2,"returnNo":"RET-20240113-04","orderNo":"OMX-20240108-022","client":"Namshi","reason":"Damaged","daysPending":7,"status":"Overdue"}]' \
  'statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Overdue":"bg-red-100 text-red-700"}} showCreate={false}'

# ── Approvals ──
create_page "approvals/shipments" "Shipment Approval" "موافقة الشحنات" "Approve pending shipments" "الموافقة على الشحنات المعلقة" "PackagePlus" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"shipmentNo","en":"Shipment No","ar":"رقم الشحنة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"requestedBy","en":"Requested By","ar":"مقدم الطلب"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"shipmentNo":"SHP-20240115-01","client":"Noon.com","orders":45,"requestedBy":"Ahmed K.","status":"Pending"},{"id":2,"shipmentNo":"SHP-20240115-02","client":"Namshi","orders":28,"requestedBy":"Mohammed A.","status":"Approved"}]' \
  'statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Approved":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} showCreate={false}'

create_page "approvals/payments" "Payment Approvals" "موافقة المدفوعات" "Approve pending payments" "الموافقة على المدفوعات المعلقة" "DollarSign" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"paymentNo","en":"Payment No","ar":"رقم الدفعة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"method","en":"Method","ar":"الطريقة"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"paymentNo":"PAY-20240115-01","client":"Noon.com","amount":"45,200 AED","method":"Bank Transfer","status":"Pending"},{"id":2,"paymentNo":"PAY-20240114-02","client":"Namshi","amount":"23,100 AED","method":"Cheque","status":"Approved"}]' \
  'statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Approved":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} showCreate={false}'

create_page "approvals/returns" "Return Approvals" "موافقة المرتجعات" "Approve pending returns" "الموافقة على المرتجعات المعلقة" "RotateCcw" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"client","en":"Client","ar":"العميل"},{"key":"items","en":"Items","ar":"العناصر"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"returnNo":"RET-20240115-01","client":"Noon.com","items":3,"reason":"Damaged","status":"Pending"},{"id":2,"returnNo":"RET-20240114-02","client":"Namshi","items":1,"reason":"Wrong item","status":"Approved"}]' \
  'statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Approved":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} showCreate={false}'

# ── Followup ──
create_page "followup/delivery" "Delivery Order Followup" "متابعة طلبات التوصيل" "Follow up on delivery orders" "متابعة طلبات التوصيل" "Truck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"attempts","en":"Attempts","ar":"المحاولات"},{"key":"lastUpdate","en":"Last Update","ar":"آخر تحديث"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"orderNo":"OMX-20240115-005","driver":"Ahmed K.","area":"Deira","attempts":2,"lastUpdate":"10:30 AM","status":"In Progress"},{"id":2,"orderNo":"OMX-20240115-008","driver":"Mohammed A.","area":"JBR","attempts":1,"lastUpdate":"11:15 AM","status":"Delayed"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"In Progress":"bg-blue-100 text-blue-700","Delayed":"bg-amber-100 text-amber-700","Completed":"bg-green-100 text-green-700"}} showCreate={false}'

create_page "followup/pickup" "Pickup Order Followup" "متابعة طلبات الاستلام" "Follow up on pickup orders" "متابعة طلبات الاستلام" "Package" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"pickupNo","en":"Pickup No","ar":"رقم الاستلام"},{"key":"client","en":"Client","ar":"العميل"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"items","en":"Items","ar":"العناصر"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"pickupNo":"PKP-20240115-01","client":"Noon.com","driver":"Ahmed K.","items":25,"status":"In Progress"},{"id":2,"pickupNo":"PKP-20240115-02","client":"Namshi","driver":"Omar H.","items":12,"status":"Completed"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"In Progress":"bg-blue-100 text-blue-700","Completed":"bg-green-100 text-green-700"}} showCreate={false}'

create_page "followup/driver" "Driver Followup" "متابعة السائقين" "Track driver daily activity" "تتبع نشاط السائق اليومي" "UserCheck" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"assigned","en":"Assigned","ar":"المعين"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"remaining","en":"Remaining","ar":"المتبقي"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"driver":"Ahmed Khalil","assigned":20,"delivered":15,"failed":2,"remaining":3,"status":"Active"},{"id":2,"driver":"Mohammed Ali","assigned":18,"delivered":18,"failed":0,"remaining":0,"status":"Done"},{"id":3,"driver":"Omar Hassan","assigned":15,"delivered":8,"failed":1,"remaining":6,"status":"Active"}]' \
  'statusKey="status" statusColors={{"Active":"bg-blue-100 text-blue-700","Done":"bg-green-100 text-green-700","Offline":"bg-gray-100 text-gray-700"}} showCreate={false}'

create_page "followup/payment" "Payment Followup" "متابعة المدفوعات" "Follow up on pending payments" "متابعة المدفوعات المعلقة" "DollarSign" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"client","en":"Client","ar":"العميل"},{"key":"invoiceNo","en":"Invoice No","ar":"رقم الفاتورة"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"dueDate","en":"Due Date","ar":"تاريخ الاستحقاق"},{"key":"daysOverdue","en":"Days Overdue","ar":"أيام التأخير"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"client":"Noon.com","invoiceNo":"INV-20240101","amount":"45,200 AED","dueDate":"2024-01-15","daysOverdue":0,"status":"Due Today"},{"id":2,"client":"Namshi","invoiceNo":"INV-20231228","amount":"23,100 AED","dueDate":"2024-01-10","daysOverdue":5,"status":"Overdue"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Due Today":"bg-amber-100 text-amber-700","Overdue":"bg-red-100 text-red-700","Paid":"bg-green-100 text-green-700"}} showCreate={false}'

create_page "followup/returns" "Return Followup" "متابعة المرتجعات" "Follow up on pending returns" "متابعة المرتجعات المعلقة" "RotateCcw" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"client","en":"Client","ar":"العميل"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"daysPending","en":"Days Pending","ar":"أيام الانتظار"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"returnNo":"RET-20240115-01","client":"Noon.com","driver":"Ahmed K.","daysPending":1,"status":"Pickup Scheduled"},{"id":2,"returnNo":"RET-20240113-04","client":"Namshi","driver":"—","daysPending":3,"status":"Awaiting Pickup"}]' \
  'statusKey="status" statusColors={{"Pickup Scheduled":"bg-blue-100 text-blue-700","Awaiting Pickup":"bg-amber-100 text-amber-700","Picked Up":"bg-green-100 text-green-700"}} showCreate={false}'

# ── Expenses ──
create_page "expenses/driver" "Driver Expenses" "مصروفات السائقين" "Manage driver expenses and claims" "إدارة مصروفات ومطالبات السائقين" "Car" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"type","en":"Type","ar":"النوع"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"receipt","en":"Receipt","ar":"الإيصال"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"driver":"Ahmed Khalil","type":"Fuel","amount":"150 AED","date":"2024-01-15","receipt":"Yes","status":"Approved"},{"id":2,"driver":"Mohammed Ali","type":"Toll Fee","amount":"20 AED","date":"2024-01-15","receipt":"Yes","status":"Pending"},{"id":3,"driver":"Omar Hassan","type":"Parking","amount":"30 AED","date":"2024-01-15","receipt":"No","status":"Rejected"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Approved":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700","Rejected":"bg-red-100 text-red-700"}} createLabelEn="Add Expense" createLabelAr="إضافة مصروف"'

create_page "expenses/company" "Company Expenses" "مصروفات الشركة" "Manage company operational expenses" "إدارة المصروفات التشغيلية للشركة" "Building2" \
  '[{"key":"id","en":"#","ar":"#"},{"key":"category","en":"Category","ar":"الفئة"},{"key":"description","en":"Description","ar":"الوصف"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"approvedBy","en":"Approved By","ar":"معتمد من"},{"key":"status","en":"Status","ar":"الحالة"}]' \
  '[{"id":1,"category":"Office","description":"Monthly rent - Dubai office","amount":"15,000 AED","date":"2024-01-01","approvedBy":"Admin","status":"Paid"},{"id":2,"category":"IT","description":"Software licenses","amount":"3,500 AED","date":"2024-01-05","approvedBy":"Admin","status":"Paid"},{"id":3,"category":"Maintenance","description":"Vehicle service - 3 vans","amount":"4,200 AED","date":"2024-01-10","approvedBy":"Admin","status":"Pending"}]' \
  'showDateFilter={true} statusKey="status" statusColors={{"Paid":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}} createLabelEn="Add Expense" createLabelAr="إضافة مصروف"'

echo "✅ Batch 2 pages created!"
