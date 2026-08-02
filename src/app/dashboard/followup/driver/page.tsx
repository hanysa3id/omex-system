'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { UserCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"assigned","en":"Assigned","ar":"المعين"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"failed","en":"Failed","ar":"فاشل"},{"key":"remaining","en":"Remaining","ar":"المتبقي"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"driver":"Ahmed Khalil","assigned":20,"delivered":15,"failed":2,"remaining":3,"status":"Active"},{"id":2,"driver":"Mohammed Ali","assigned":18,"delivered":18,"failed":0,"remaining":0,"status":"Done"},{"id":3,"driver":"Omar Hassan","assigned":15,"delivered":8,"failed":1,"remaining":6,"status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Driver Followup"
      titleAr="متابعة السائقين"
      descriptionEn="Track driver daily activity"
      descriptionAr="تتبع نشاط السائق اليومي"
      icon={UserCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-blue-100 text-blue-700","Done":"bg-green-100 text-green-700","Offline":"bg-gray-100 text-gray-700"}} showCreate={false}
    />
  );
}
