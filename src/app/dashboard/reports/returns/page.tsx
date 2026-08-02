'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RotateCcw } from 'lucide-react';

const columns = [{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalReturns","en":"Total Returns","ar":"إجمالي المرتجعات"},{"key":"processed","en":"Processed","ar":"تمت معالجته"},{"key":"pending","en":"Pending","ar":"قيد الانتظار"},{"key":"returnRate","en":"Return Rate","ar":"نسبة الإرجاع"}];
const sampleRows = [{"period":"Jan 2024","totalReturns":180,"processed":150,"pending":30,"returnRate":"4.0%"},{"period":"Dec 2023","totalReturns":210,"processed":200,"pending":10,"returnRate":"4.1%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Return Reports"
      titleAr="تقارير المرتجعات"
      descriptionEn="Return analytics and trends"
      descriptionAr="تحليلات واتجاهات المرتجعات"
      icon={RotateCcw}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
