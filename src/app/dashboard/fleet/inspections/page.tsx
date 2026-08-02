'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { ClipboardCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"type","en":"Inspection Type","ar":"نوع الفحص"},{"key":"inspector","en":"Inspector","ar":"الفاحص"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"nextDue","en":"Next Due","ar":"الموعد القادم"},{"key":"result","en":"Result","ar":"النتيجة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","type":"Annual RTA","inspector":"RTA Dubai","date":"2024-01-10","nextDue":"2025-01-10","result":"Passed"},{"id":2,"vehicle":"SHJ B-67890","type":"Pre-trip","inspector":"Ahmed K.","date":"2024-01-15","nextDue":"2024-01-16","result":"Passed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Inspections"
      titleAr="الفحوصات"
      descriptionEn="Vehicle inspection records"
      descriptionAr="سجلات فحص المركبات"
      icon={ClipboardCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="result" statusColors={{"Passed":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}}
    />
  );
}
