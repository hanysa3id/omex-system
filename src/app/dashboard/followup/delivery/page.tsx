'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Truck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"attempts","en":"Attempts","ar":"المحاولات"},{"key":"lastUpdate","en":"Last Update","ar":"آخر تحديث"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"orderNo":"OMX-20240115-005","driver":"Ahmed K.","area":"Deira","attempts":2,"lastUpdate":"10:30 AM","status":"In Progress"},{"id":2,"orderNo":"OMX-20240115-008","driver":"Mohammed A.","area":"JBR","attempts":1,"lastUpdate":"11:15 AM","status":"Delayed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Delivery Order Followup"
      titleAr="متابعة طلبات التوصيل"
      descriptionEn="Follow up on delivery orders"
      descriptionAr="متابعة طلبات التوصيل"
      icon={Truck}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"In Progress":"bg-blue-100 text-blue-700","Delayed":"bg-amber-100 text-amber-700","Completed":"bg-green-100 text-green-700"}} showCreate={false}
    />
  );
}
