'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { UserCheck } from 'lucide-react';

const columns = [{"key":"employee","en":"Employee","ar":"الموظف"},{"key":"designation","en":"Designation","ar":"المسمى"},{"key":"ordersHandled","en":"Orders Handled","ar":"الطلبات المعالجة"},{"key":"avgPerDay","en":"Avg/Day","ar":"المتوسط/يوم"},{"key":"rating","en":"Rating","ar":"التقييم"}];
const sampleRows = [{"employee":"Ahmed Khalil","designation":"Driver","ordersHandled":320,"avgPerDay":16,"rating":"4.8/5"},{"employee":"Mohammed Ali","designation":"Driver","ordersHandled":280,"avgPerDay":14,"rating":"4.6/5"},{"employee":"Fatima H.","designation":"Dispatcher","ordersHandled":1200,"avgPerDay":60,"rating":"4.9/5"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Employee Reports"
      titleAr="تقارير الموظفين"
      descriptionEn="Employee performance reports"
      descriptionAr="تقارير أداء الموظفين"
      icon={UserCheck}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
