'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Gauge } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"startKm","en":"Start KM","ar":"بداية الكم"},{"key":"endKm","en":"End KM","ar":"نهاية الكم"},{"key":"totalKm","en":"Total KM","ar":"إجمالي الكم"},{"key":"date","en":"Date","ar":"التاريخ"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed K.","startKm":"52,100","endKm":"52,340","totalKm":"240","date":"2024-01-15"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed A.","startKm":"41,050","endKm":"41,200","totalKm":"150","date":"2024-01-15"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Odometer Logs"
      titleAr="سجل العداد"
      descriptionEn="Track vehicle mileage"
      descriptionAr="تتبع المسافات المقطوعة"
      icon={Gauge}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} createLabelEn="Add Log" createLabelAr="إضافة سجل"
    />
  );
}
