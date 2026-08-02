'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Building2 } from 'lucide-react';

const columns = [{"key":"client","en":"Client","ar":"العميل"},{"key":"totalOrders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"revenue","en":"Revenue","ar":"الإيرادات"},{"key":"avgPerDay","en":"Avg/Day","ar":"المتوسط/يوم"}];
const sampleRows = [{"client":"Noon.com","totalOrders":4520,"delivered":4200,"revenue":"67,800 AED","avgPerDay":146},{"client":"Namshi","totalOrders":2310,"delivered":2180,"revenue":"34,650 AED","avgPerDay":75},{"client":"Mumzworld","totalOrders":1280,"delivered":1200,"revenue":"19,200 AED","avgPerDay":41}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Clients Reports"
      titleAr="تقارير العملاء التجار"
      descriptionEn="Client analytics and performance"
      descriptionAr="تحليلات وأداء العملاء التجار"
      icon={Building2}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
