'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Building2 } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"category","en":"Category","ar":"الفئة"},{"key":"description","en":"Description","ar":"الوصف"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"approvedBy","en":"Approved By","ar":"معتمد من"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"category":"Office","description":"Monthly rent - Dubai office","amount":"15,000 AED","date":"2024-01-01","approvedBy":"Admin","status":"Paid"},{"id":2,"category":"IT","description":"Software licenses","amount":"3,500 AED","date":"2024-01-05","approvedBy":"Admin","status":"Paid"},{"id":3,"category":"Maintenance","description":"Vehicle service - 3 vans","amount":"4,200 AED","date":"2024-01-10","approvedBy":"Admin","status":"Pending"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Company Expenses"
      titleAr="مصروفات الشركة"
      descriptionEn="Manage company operational expenses"
      descriptionAr="إدارة المصروفات التشغيلية للشركة"
      icon={Building2}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Paid":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}} createLabelEn="Add Expense" createLabelAr="إضافة مصروف"
    />
  );
}
