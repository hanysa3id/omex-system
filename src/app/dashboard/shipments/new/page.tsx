'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { PackagePlus } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"shipmentNo","en":"Shipment No","ar":"رقم الشحنة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"destination","en":"Destination","ar":"الوجهة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"shipmentNo":"SHP-20240115-01","client":"Noon.com","orders":45,"destination":"Abu Dhabi","date":"2024-01-15","status":"Processing"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="New Shipment"
      titleAr="شحنة جديدة"
      descriptionEn="Create a new shipment batch"
      descriptionAr="إنشاء دفعة شحن جديدة"
      icon={PackagePlus}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Processing":"bg-blue-100 text-blue-700","Shipped":"bg-green-100 text-green-700","Received":"bg-emerald-100 text-emerald-700"}} createLabelEn="New Shipment" createLabelAr="شحنة جديدة"
    />
  );
}
