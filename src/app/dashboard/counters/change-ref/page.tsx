'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Replace } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"oldRef","en":"Old Reference","ar":"المرجع القديم"},{"key":"newRef","en":"New Reference","ar":"المرجع الجديد"},{"key":"changedBy","en":"Changed By","ar":"تم التغيير بواسطة"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"oldRef":"STR-DXB-001","newRef":"STR-DXB-A01","changedBy":"Admin","date":"2024-01-15","status":"Applied"},{"id":2,"oldRef":"STR-SHJ-002","newRef":"STR-SHJ-B02","changedBy":"Admin","date":"2024-01-14","status":"Applied"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Change Store Ref"
      titleAr="تغيير مرجع المخزن"
      descriptionEn="Change store reference numbers"
      descriptionAr="تغيير أرقام مراجع المخزن"
      icon={Replace}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Applied":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700"}}
    />
  );
}
