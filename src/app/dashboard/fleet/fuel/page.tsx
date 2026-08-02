'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Fuel } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"liters","en":"Liters","ar":"لتر"},{"key":"cost","en":"Cost","ar":"التكلفة"},{"key":"odometer","en":"Odometer","ar":"العداد"},{"key":"date","en":"Date","ar":"التاريخ"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed K.","liters":"45","cost":"135 AED","odometer":"52,340","date":"2024-01-15"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed A.","liters":"38","cost":"114 AED","odometer":"41,200","date":"2024-01-15"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Fuel Logs"
      titleAr="سجل الوقود"
      descriptionEn="Track vehicle fuel consumption"
      descriptionAr="تتبع استهلاك الوقود"
      icon={Fuel}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} createLabelEn="Add Log" createLabelAr="إضافة سجل"
    />
  );
}
