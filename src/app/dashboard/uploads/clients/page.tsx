'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Building2 } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"fileName","en":"File Name","ar":"اسم الملف"},{"key":"uploadDate","en":"Upload Date","ar":"تاريخ الرفع"},{"key":"records","en":"Records","ar":"السجلات"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"fileName":"clients_jan.xlsx","uploadDate":"2024-01-15","records":45,"status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Client Upload"
      titleAr="رفع العملاء"
      descriptionEn="Bulk upload client data"
      descriptionAr="رفع بيانات العملاء"
      icon={Building2}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Upload File" createLabelAr="رفع ملف"
    />
  );
}
