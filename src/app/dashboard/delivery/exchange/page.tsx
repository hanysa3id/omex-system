'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RefreshCw } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"fromDriver","en":"From Driver","ar":"من السائق"},{"key":"toDriver","en":"To Driver","ar":"إلى السائق"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"orderNo":"OMX-20240115-005","fromDriver":"Ahmed K.","toDriver":"Mohammed A.","reason":"Area reassignment","date":"2024-01-15","status":"Completed"},{"id":2,"orderNo":"OMX-20240115-012","fromDriver":"Omar H.","toDriver":"Saif R.","reason":"Vehicle breakdown","date":"2024-01-15","status":"Pending"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Delivery Exchange"
      titleAr="تبديل التوصيل"
      descriptionEn="Exchange deliveries between drivers"
      descriptionAr="تبديل التوصيلات بين السائقين"
      icon={RefreshCw}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}
    />
  );
}
