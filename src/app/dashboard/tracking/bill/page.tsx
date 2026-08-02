'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { FileText } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"billNo","en":"Bill No","ar":"رقم الفاتورة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"billNo":"BILL-20240115-01","client":"Noon.com","orders":45,"amount":"12,500 AED","status":"Paid"},{"id":2,"billNo":"BILL-20240114-02","client":"Namshi","orders":28,"amount":"8,200 AED","status":"Pending"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Track By Bill"
      titleAr="تتبع بالفاتورة"
      descriptionEn="Track orders by bill number"
      descriptionAr="تتبع الطلبات برقم الفاتورة"
      icon={FileText}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Paid":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}
    />
  );
}
