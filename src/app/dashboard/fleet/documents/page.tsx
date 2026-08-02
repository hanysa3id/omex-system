'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { FileCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"docType","en":"Document Type","ar":"نوع المستند"},{"key":"number","en":"Number","ar":"الرقم"},{"key":"expiry","en":"Expiry Date","ar":"تاريخ الانتهاء"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","docType":"Registration","number":"REG-2024-001","expiry":"2025-01-15","status":"Valid"},{"id":2,"vehicle":"SHJ B-67890","docType":"Registration","number":"REG-2024-002","expiry":"2024-03-20","status":"Expiring Soon"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Documents"
      titleAr="المستندات"
      descriptionEn="Vehicle documents and registrations"
      descriptionAr="مستندات وتسجيلات المركبات"
      icon={FileCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Valid":"bg-green-100 text-green-700","Expiring Soon":"bg-amber-100 text-amber-700","Expired":"bg-red-100 text-red-700"}}
    />
  );
}
