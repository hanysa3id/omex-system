'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { ClipboardCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"permitType","en":"Permit Type","ar":"نوع التصريح"},{"key":"number","en":"Number","ar":"الرقم"},{"key":"issueDate","en":"Issue Date","ar":"تاريخ الإصدار"},{"key":"expiry","en":"Expiry","ar":"الانتهاء"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","permitType":"Commercial License","number":"PRM-2024-001","issueDate":"2024-01-01","expiry":"2025-01-01","status":"Valid"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Permits"
      titleAr="التصاريح"
      descriptionEn="Vehicle permits and licenses"
      descriptionAr="تصاريح ورخص المركبات"
      icon={ClipboardCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Valid":"bg-green-100 text-green-700","Expired":"bg-red-100 text-red-700"}}
    />
  );
}
