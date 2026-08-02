'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Tag } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Type Name","ar":"اسم النوع"},{"key":"category","en":"Category","ar":"الفئة"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"Same Day","category":"Delivery","status":"Active"},{"id":2,"name":"Next Day","category":"Delivery","status":"Active"},{"id":3,"name":"Express","category":"Delivery","status":"Active"},{"id":4,"name":"Standard","category":"Shipment","status":"Active"},{"id":5,"name":"Bulk","category":"Shipment","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Types"
      titleAr="الأنواع"
      descriptionEn="Manage order and shipment types"
      descriptionAr="إدارة أنواع الطلبات والشحنات"
      icon={Tag}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
