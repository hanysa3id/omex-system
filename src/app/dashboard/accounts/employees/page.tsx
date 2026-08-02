'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { UserCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Name","ar":"الاسم"},{"key":"designation","en":"Designation","ar":"المسمى"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"Ahmed Khalil","designation":"Dispatcher","phone":"+971501234567","emirate":"Dubai","status":"Active"},{"id":2,"name":"Fatima Al Hashimi","designation":"Accountant","phone":"+971502345678","emirate":"Abu Dhabi","status":"Active"},{"id":3,"name":"Mohammed Rashed","designation":"Driver","phone":"+971503456789","emirate":"Sharjah","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Employees"
      titleAr="الموظفون"
      descriptionEn="Manage company employees"
      descriptionAr="إدارة موظفي الشركة"
      icon={UserCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
