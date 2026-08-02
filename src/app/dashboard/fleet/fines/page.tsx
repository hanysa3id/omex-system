'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Ban } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"violation","en":"Violation","ar":"المخالفة"},{"key":"amount","en":"Fine Amount","ar":"مبلغ المخالفة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed K.","violation":"Speed limit exceeded","amount":"600 AED","date":"2024-01-12","status":"Paid"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed A.","violation":"Parking violation","amount":"200 AED","date":"2024-01-14","status":"Unpaid"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Fine Records"
      titleAr="سجل المخالفات"
      descriptionEn="Traffic fines and violations"
      descriptionAr="المخالفات المرورية"
      icon={Ban}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Paid":"bg-green-100 text-green-700","Unpaid":"bg-red-100 text-red-700"}}
    />
  );
}
