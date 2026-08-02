'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { DollarSign } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Expense Type","ar":"نوع المصروف"},{"key":"category","en":"Category","ar":"الفئة"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"Fuel","category":"Vehicle","status":"Active"},{"id":2,"name":"Toll Fee","category":"Vehicle","status":"Active"},{"id":3,"name":"Office Rent","category":"Company","status":"Active"},{"id":4,"name":"Driver Salary","category":"HR","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Expense Types"
      titleAr="أنواع المصروفات"
      descriptionEn="Manage expense categories"
      descriptionAr="إدارة فئات المصروفات"
      icon={DollarSign}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
