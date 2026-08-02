'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Users } from 'lucide-react';

const columns = [{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"totalCustomers","en":"Customers","ar":"المستلمون"},{"key":"totalOrders","en":"Orders","ar":"الطلبات"},{"key":"avgOrders","en":"Avg Orders","ar":"متوسط الطلبات"},{"key":"satisfaction","en":"Satisfaction","ar":"الرضا"}];
const sampleRows = [{"emirate":"Dubai","totalCustomers":5200,"totalOrders":12000,"avgOrders":"2.3","satisfaction":"4.5/5"},{"emirate":"Abu Dhabi","totalCustomers":2100,"totalOrders":4800,"avgOrders":"2.3","satisfaction":"4.3/5"},{"emirate":"Sharjah","totalCustomers":1800,"totalOrders":3600,"avgOrders":"2.0","satisfaction":"4.2/5"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Customer Reports"
      titleAr="تقارير المستلمين"
      descriptionEn="Customer analytics"
      descriptionAr="تحليلات المستلمين"
      icon={Users}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
