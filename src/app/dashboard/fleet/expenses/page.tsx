'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { DollarSign } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"type","en":"Expense Type","ar":"نوع المصروف"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","type":"Fuel","amount":"135 AED","date":"2024-01-15","status":"Approved"},{"id":2,"vehicle":"DXB A-12345","type":"Salik Toll","amount":"8 AED","date":"2024-01-15","status":"Approved"},{"id":3,"vehicle":"SHJ B-67890","type":"Tire Replace","amount":"1,200 AED","date":"2024-01-14","status":"Pending"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Vehicle Expenses"
      titleAr="مصروفات المركبات"
      descriptionEn="Track all vehicle-related expenses"
      descriptionAr="تتبع جميع مصروفات المركبات"
      icon={DollarSign}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Approved":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}
    />
  );
}
