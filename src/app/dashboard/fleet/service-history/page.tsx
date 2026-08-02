'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { History } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"service","en":"Service","ar":"الخدمة"},{"key":"workshop","en":"Workshop","ar":"الورشة"},{"key":"cost","en":"Cost","ar":"التكلفة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"nextService","en":"Next Service","ar":"الخدمة القادمة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","service":"Oil Change","workshop":"Al Futtaim","cost":"350 AED","date":"2024-01-10","nextService":"2024-04-10"},{"id":2,"vehicle":"SHJ B-67890","service":"Brake Pads","workshop":"Quick Fit","cost":"800 AED","date":"2024-01-08","nextService":"2024-07-08"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Service History"
      titleAr="سجل الخدمة"
      descriptionEn="Vehicle service and maintenance history"
      descriptionAr="سجل الخدمة والصيانة"
      icon={History}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true}
    />
  );
}
