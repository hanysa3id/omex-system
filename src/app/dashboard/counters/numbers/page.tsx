'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Hash } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Counter Name","ar":"اسم العداد"},{"key":"prefix","en":"Prefix","ar":"البادئة"},{"key":"lastNo","en":"Last Number","ar":"آخر رقم"},{"key":"nextNo","en":"Next Number","ar":"الرقم التالي"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"name":"Order Number","prefix":"OMX","lastNo":"20240115-042","nextNo":"20240115-043","status":"Active"},{"id":2,"name":"Shipment Number","prefix":"SHP","lastNo":"20240115-03","nextNo":"20240115-04","status":"Active"},{"id":3,"name":"Invoice Number","prefix":"INV","lastNo":"20240115-08","nextNo":"20240115-09","status":"Active"},{"id":4,"name":"Return Number","prefix":"RET","lastNo":"20240115-02","nextNo":"20240115-03","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Counter Nos"
      titleAr="أرقام العدادات"
      descriptionEn="Manage auto-incrementing counters"
      descriptionAr="إدارة العدادات التلقائية"
      icon={Hash}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Paused":"bg-amber-100 text-amber-700"}}
    />
  );
}
