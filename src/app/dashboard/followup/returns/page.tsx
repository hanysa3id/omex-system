'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RotateCcw } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"returnNo","en":"Return No","ar":"رقم المرتجع"},{"key":"client","en":"Client","ar":"العميل"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"daysPending","en":"Days Pending","ar":"أيام الانتظار"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"returnNo":"RET-20240115-01","client":"Noon.com","driver":"Ahmed K.","daysPending":1,"status":"Pickup Scheduled"},{"id":2,"returnNo":"RET-20240113-04","client":"Namshi","driver":"—","daysPending":3,"status":"Awaiting Pickup"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Return Followup"
      titleAr="متابعة المرتجعات"
      descriptionEn="Follow up on pending returns"
      descriptionAr="متابعة المرتجعات المعلقة"
      icon={RotateCcw}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Pickup Scheduled":"bg-blue-100 text-blue-700","Awaiting Pickup":"bg-amber-100 text-amber-700","Picked Up":"bg-green-100 text-green-700"}} showCreate={false}
    />
  );
}
