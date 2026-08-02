'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { RefreshCcw } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"store","en":"Store","ar":"المخزن"},{"key":"currentRef","en":"Current Ref","ar":"المرجع الحالي"},{"key":"newRef","en":"New Ref","ar":"المرجع الجديد"},{"key":"updatedBy","en":"Updated By","ar":"تم التحديث بواسطة"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"store":"Dubai Main","currentRef":"STR-DXB-A01","newRef":"STR-DXB-M01","updatedBy":"Admin","status":"Pending"},{"id":2,"store":"Sharjah Hub","currentRef":"STR-SHJ-B02","newRef":"STR-SHJ-H02","updatedBy":"Admin","status":"Applied"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Update Store Ref No"
      titleAr="تحديث رقم المرجع"
      descriptionEn="Update store reference numbers"
      descriptionAr="تحديث أرقام مراجع المخازن"
      icon={RefreshCcw}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Applied":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}
    />
  );
}
