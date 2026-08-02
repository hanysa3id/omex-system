'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { ArrowUpCircle } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"driver","en":"Assigned Driver","ar":"السائق المعين"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"orderNo":"OMX-20240115-020","client":"Noon.com","area":"Deira","driver":"Ahmed K.","status":"Pushed"},{"id":2,"orderNo":"OMX-20240115-021","client":"Namshi","area":"JBR","driver":"—","status":"Awaiting"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Push Order"
      titleAr="دفع الطلب"
      descriptionEn="Push orders to drivers for delivery"
      descriptionAr="دفع الطلبات للسائقين للتوصيل"
      icon={ArrowUpCircle}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Pushed":"bg-green-100 text-green-700","Awaiting":"bg-amber-100 text-amber-700"}}
    />
  );
}
