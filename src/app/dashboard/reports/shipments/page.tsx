'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { PackagePlus } from 'lucide-react';

const columns = [{"key":"period","en":"Period","ar":"الفترة"},{"key":"total","en":"Total Shipments","ar":"إجمالي الشحنات"},{"key":"weight","en":"Total Weight (KG)","ar":"الوزن الإجمالي (كجم)"},{"key":"avgOrders","en":"Avg Orders/Shipment","ar":"متوسط الطلبات/شحنة"},{"key":"onTime","en":"On Time %","ar":"في الوقت %"}];
const sampleRows = [{"period":"Jan 2024","total":85,"weight":"12,500","avgOrders":53,"onTime":"91%"},{"period":"Dec 2023","total":102,"weight":"15,300","avgOrders":50,"onTime":"93%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Shipment Reports"
      titleAr="تقارير الشحنات"
      descriptionEn="Shipment analytics"
      descriptionAr="تحليلات الشحنات"
      icon={PackagePlus}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
