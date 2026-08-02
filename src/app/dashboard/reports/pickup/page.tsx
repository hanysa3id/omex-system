'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Package } from 'lucide-react';

const columns = [{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalPickups","en":"Total Pickups","ar":"إجمالي الاستلام"},{"key":"onTime","en":"On Time","ar":"في الوقت"},{"key":"late","en":"Late","ar":"متأخر"},{"key":"avgTime","en":"Avg Time (min)","ar":"متوسط الوقت (دقيقة)"}];
const sampleRows = [{"period":"Jan 2024","totalPickups":320,"onTime":290,"late":30,"avgTime":"25"},{"period":"Dec 2023","totalPickups":380,"onTime":350,"late":30,"avgTime":"22"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Pickup Reports"
      titleAr="تقارير الاستلام"
      descriptionEn="Pickup performance reports"
      descriptionAr="تقارير أداء الاستلام"
      icon={Package}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
