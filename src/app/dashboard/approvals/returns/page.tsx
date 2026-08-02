'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RotateCcw } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"client","en":"Client","ar":"العميل"},{"key":"items","en":"Items","ar":"العناصر"},{"key":"reason","en":"Reason","ar":"السبب"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"returnNo":"RET-20240115-01","client":"Noon.com","items":3,"reason":"Damaged","status":"Pending"},{"id":2,"returnNo":"RET-20240114-02","client":"Namshi","items":1,"reason":"Wrong item","status":"Approved"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Return Approvals"
      titleAr="موافقة المرتجعات"
      descriptionEn="Approve pending returns"
      descriptionAr="الموافقة على المرتجعات المعلقة"
      icon={RotateCcw}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Approved":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} showCreate={false}
    />
  );
}
