'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RotateCcw } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"returnNo":"RET-20240115-01","orderNo":"OMX-20240110-015","client":"Noon.com","reason":"Damaged item","date":"2024-01-15","status":"Processing"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Create Return"
      titleAr="إنشاء مرتجع"
      descriptionEn="Create a new return request"
      descriptionAr="إنشاء طلب مرتجع جديد"
      icon={RotateCcw}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Processing":"bg-blue-100 text-blue-700","Completed":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} createLabelEn="New Return" createLabelAr="مرتجع جديد"
    />
  );
}
