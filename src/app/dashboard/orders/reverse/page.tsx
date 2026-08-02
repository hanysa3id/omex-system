'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RefreshCcw } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"cancelDate","en":"Cancel Date","ar":"تاريخ الإلغاء"},{"key":"reason","en":"Cancel Reason","ar":"سبب الإلغاء"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"orderNo":"OMX-20240110-022","client":"Noon.com","cancelDate":"2024-01-10","reason":"Duplicate order","status":"Cancelled"},{"id":2,"orderNo":"OMX-20240112-038","client":"Namshi","cancelDate":"2024-01-12","reason":"Customer request","status":"Reversed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Reverse Cancel"
      titleAr="إلغاء الإلغاء"
      descriptionEn="Reverse cancelled orders"
      descriptionAr="استعادة الطلبات الملغية"
      icon={RefreshCcw}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Cancelled":"bg-red-100 text-red-700","Reversed":"bg-green-100 text-green-700"}}
    />
  );
}
