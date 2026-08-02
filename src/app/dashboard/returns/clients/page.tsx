'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Building2 } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"client","en":"Client","ar":"العميل"},{"key":"totalItems","en":"Items","ar":"العناصر"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"returnNo":"RET-20240115-01","client":"Noon.com","totalItems":3,"amount":"450 AED","status":"Pending"},{"id":2,"returnNo":"RET-20240114-02","client":"Namshi","totalItems":1,"amount":"120 AED","status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Client Returns"
      titleAr="مرتجعات العملاء"
      descriptionEn="View client-initiated returns"
      descriptionAr="عرض المرتجعات من العملاء"
      icon={Building2}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Completed":"bg-green-100 text-green-700"}} showCreate={false}
    />
  );
}
