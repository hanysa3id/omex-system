'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { MapPinned } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"fileName","en":"File Name","ar":"اسم الملف"},{"key":"uploadDate","en":"Upload Date","ar":"تاريخ الرفع"},{"key":"records","en":"Records","ar":"السجلات"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"fileName":"locations_dubai.xlsx","uploadDate":"2024-01-15","records":150,"status":"Completed"},{"id":2,"fileName":"locations_sharjah.csv","uploadDate":"2024-01-14","records":80,"status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Location Upload"
      titleAr="رفع المواقع"
      descriptionEn="Bulk upload delivery locations"
      descriptionAr="رفع مواقع التوصيل"
      icon={MapPinned}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Upload File" createLabelAr="رفع ملف"
    />
  );
}
