'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { PackageCheck } from 'lucide-react';

const columns = [{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalOrders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"cancelled","en":"Cancelled","ar":"ملغى"},{"key":"rate","en":"Success Rate","ar":"نسبة النجاح"}];
const sampleRows = [{"period":"Jan 2024","totalOrders":4520,"delivered":4200,"failed":180,"cancelled":140,"rate":"92.9%"},{"period":"Dec 2023","totalOrders":5100,"delivered":4800,"failed":200,"cancelled":100,"rate":"94.1%"},{"period":"Nov 2023","totalOrders":3800,"delivered":3500,"failed":150,"cancelled":150,"rate":"92.1%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Order Reports"
      titleAr="تقارير الطلبات"
      descriptionEn="Order analytics and reports"
      descriptionAr="تحليلات وتقارير الطلبات"
      icon={PackageCheck}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
