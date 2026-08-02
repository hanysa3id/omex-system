'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Truck } from 'lucide-react';

const columns = [{"key":"period","en":"Period","ar":"الفترة"},{"key":"total","en":"Total","ar":"الإجمالي"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"avgTime","en":"Avg Time (hr)","ar":"متوسط الوقت (ساعة)"},{"key":"rate","en":"Success Rate","ar":"نسبة النجاح"}];
const sampleRows = [{"period":"Jan 2024","total":4520,"delivered":4200,"failed":320,"avgTime":"4.2","rate":"92.9%"},{"period":"Dec 2023","total":5100,"delivered":4800,"failed":300,"avgTime":"3.8","rate":"94.1%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Delivery Reports"
      titleAr="تقارير التوصيل"
      descriptionEn="Delivery performance analytics"
      descriptionAr="تحليلات أداء التوصيل"
      icon={Truck}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
