'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { User } from 'lucide-react';

const columns = [{"key":"agent","en":"Agent","ar":"الوكيل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"commission","en":"Commission","ar":"العمولة"},{"key":"rate","en":"Success Rate","ar":"نسبة النجاح"}];
const sampleRows = [{"agent":"Express Delivery Co.","orders":1500,"delivered":1420,"commission":"18,000 AED","rate":"94.7%"},{"agent":"Speed Cargo","orders":800,"delivered":740,"commission":"7,400 AED","rate":"92.5%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Agent Reports"
      titleAr="تقارير الوكلاء"
      descriptionEn="Agent performance and commission reports"
      descriptionAr="تقارير أداء وعمولات الوكلاء"
      icon={User}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
