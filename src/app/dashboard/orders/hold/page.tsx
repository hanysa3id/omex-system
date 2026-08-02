'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Ban } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"reason","en":"Hold Reason","ar":"سبب التجميد"},{"key":"holdDate","en":"Hold Date","ar":"تاريخ التجميد"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"orderNo":"OMX-20240113-042","client":"Noon.com","reason":"Customer request","holdDate":"2024-01-13","status":"On Hold"},{"id":2,"orderNo":"OMX-20240114-015","client":"Namshi","reason":"Address issue","holdDate":"2024-01-14","status":"On Hold"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Hold Orders"
      titleAr="الطلبات المجمدة"
      descriptionEn="Manage held orders"
      descriptionAr="إدارة الطلبات المجمدة"
      icon={Ban}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"On Hold":"bg-amber-100 text-amber-700","Released":"bg-green-100 text-green-700"}}
    />
  );
}
