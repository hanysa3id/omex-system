'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Package } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"pickupNo","en":"Pickup No","ar":"رقم الاستلام"},{"key":"client","en":"Client","ar":"العميل"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"items","en":"Items","ar":"العناصر"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"pickupNo":"PKP-20240115-01","client":"Noon.com","driver":"Ahmed K.","items":25,"status":"In Progress"},{"id":2,"pickupNo":"PKP-20240115-02","client":"Namshi","driver":"Omar H.","items":12,"status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Pickup Order Followup"
      titleAr="متابعة طلبات الاستلام"
      descriptionEn="Follow up on pickup orders"
      descriptionAr="متابعة طلبات الاستلام"
      icon={Package}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"In Progress":"bg-blue-100 text-blue-700","Completed":"bg-green-100 text-green-700"}} showCreate={false}
    />
  );
}
