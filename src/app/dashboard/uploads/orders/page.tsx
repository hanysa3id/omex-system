'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Upload } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"fileName","en":"File Name","ar":"اسم الملف"},{"key":"uploadDate","en":"Upload Date","ar":"تاريخ الرفع"},{"key":"records","en":"Records","ar":"السجلات"},{"key":"success","en":"Success","ar":"ناجح"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"fileName":"orders_jan15.xlsx","uploadDate":"2024-01-15","records":250,"success":245,"failed":5,"status":"Completed"},{"id":2,"fileName":"orders_jan14.xlsx","uploadDate":"2024-01-14","records":180,"success":180,"failed":0,"status":"Completed"},{"id":3,"fileName":"orders_jan13.csv","uploadDate":"2024-01-13","records":320,"success":310,"failed":10,"status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Order Upload"
      titleAr="رفع الطلبات"
      descriptionEn="Bulk upload orders via Excel/CSV"
      descriptionAr="رفع الطلبات عبر Excel/CSV"
      icon={Upload}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Processing":"bg-blue-100 text-blue-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Upload File" createLabelAr="رفع ملف"
    />
  );
}
