'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { AlertTriangle } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"type","en":"Type","ar":"النوع"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"reason":"Customer not available","type":"Delivery Failure","status":"Active"},{"id":2,"reason":"Wrong address","type":"Delivery Failure","status":"Active"},{"id":3,"reason":"Damaged item","type":"Return","status":"Active"},{"id":4,"reason":"Wrong item","type":"Return","status":"Active"},{"id":5,"reason":"Customer refused","type":"Return","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Reasons"
      titleAr="الأسباب"
      descriptionEn="Manage failure and return reasons"
      descriptionAr="إدارة أسباب الفشل والمرتجعات"
      icon={AlertTriangle}
      columns={columns}
      rows={sampleRows}
      statusKey="type" statusColors={{"Delivery Failure":"bg-red-100 text-red-700","Return":"bg-amber-100 text-amber-700"}}
    />
  );
}
