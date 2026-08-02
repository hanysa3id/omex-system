'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { FileText } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"noteNo","en":"Note No","ar":"رقم البوليصة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"noteNo":"DN-20240115-01","driver":"Ahmed Khalil","orders":15,"area":"Deira","date":"2024-01-15","status":"Active"},{"id":2,"noteNo":"DN-20240115-02","driver":"Mohammed Ali","orders":12,"area":"JBR","date":"2024-01-15","status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Delivery Notes"
      titleAr="بوالص التوصيل"
      descriptionEn="Manage delivery notes"
      descriptionAr="إدارة بوالص التوصيل"
      icon={FileText}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Active":"bg-blue-100 text-blue-700","Completed":"bg-green-100 text-green-700"}}
    />
  );
}
