'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Clock } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"daysPending","en":"Days Pending","ar":"أيام الانتظار"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"returnNo":"RET-20240115-01","orderNo":"OMX-20240110-015","client":"Noon.com","reason":"Wrong item","daysPending":5,"status":"Pending"},{"id":2,"returnNo":"RET-20240113-04","orderNo":"OMX-20240108-022","client":"Namshi","reason":"Damaged","daysPending":7,"status":"Overdue"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Pending Returns"
      titleAr="مرتجعات قيد الانتظار"
      descriptionEn="View pending return requests"
      descriptionAr="عرض المرتجعات المعلقة"
      icon={Clock}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Overdue":"bg-red-100 text-red-700"}} showCreate={false}
    />
  );
}
