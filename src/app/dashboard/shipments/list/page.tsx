'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { List } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"shipmentNo","en":"Shipment No","ar":"رقم الشحنة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"weight","en":"Weight (KG)","ar":"الوزن (كجم)"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"shipmentNo":"SHP-20240115-01","client":"Noon.com","orders":45,"weight":"320","status":"In Transit"},{"id":2,"shipmentNo":"SHP-20240114-03","client":"Namshi","orders":28,"weight":"185","status":"Delivered"},{"id":3,"shipmentNo":"SHP-20240113-02","client":"Mumzworld","orders":62,"weight":"410","status":"Delivered"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Shipment List"
      titleAr="قائمة الشحنات"
      descriptionEn="View all shipments"
      descriptionAr="عرض جميع الشحنات"
      icon={List}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"In Transit":"bg-blue-100 text-blue-700","Delivered":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}
    />
  );
}
