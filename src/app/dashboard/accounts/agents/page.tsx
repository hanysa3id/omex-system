'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Users } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Agent Name","ar":"اسم الوكيل"},{"key":"company","en":"Company","ar":"الشركة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"commission","en":"Commission %","ar":"العمولة %"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"Express Delivery Co.","company":"Express LLC","emirate":"Dubai","commission":"12%","status":"Active"},{"id":2,"name":"Speed Cargo","company":"Speed FZE","emirate":"Sharjah","commission":"10%","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Agents"
      titleAr="الوكلاء"
      descriptionEn="Manage delivery agents"
      descriptionAr="إدارة وكلاء التوصيل"
      icon={Users}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
