'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { PackagePlus } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"shipmentNo","en":"Shipment No","ar":"رقم الشحنة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"orders","en":"Orders","ar":"الطلبات"},{"key":"requestedBy","en":"Requested By","ar":"مقدم الطلب"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"shipmentNo":"SHP-20240115-01","client":"Noon.com","orders":45,"requestedBy":"Ahmed K.","status":"Pending"},{"id":2,"shipmentNo":"SHP-20240115-02","client":"Namshi","orders":28,"requestedBy":"Mohammed A.","status":"Approved"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Shipment Approval"
      titleAr="موافقة الشحنات"
      descriptionEn="Approve pending shipments"
      descriptionAr="الموافقة على الشحنات المعلقة"
      icon={PackagePlus}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Approved":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} showCreate={false}
    />
  );
}
