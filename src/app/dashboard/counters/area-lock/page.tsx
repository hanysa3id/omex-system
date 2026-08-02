'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Lock } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"storeNo","en":"Store No","ar":"رقم المخزن"},{"key":"lockedBy","en":"Locked By","ar":"تم القفل بواسطة"},{"key":"lockDate","en":"Lock Date","ar":"تاريخ القفل"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"area":"Deira","storeNo":"STR-DXB-A01","lockedBy":"Admin","lockDate":"2024-01-15","status":"Locked"},{"id":2,"area":"JBR","storeNo":"STR-DXB-A03","lockedBy":"Admin","lockDate":"2024-01-15","status":"Unlocked"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Area Store No Lock"
      titleAr="قفل رقم المنطقة"
      descriptionEn="Lock area store numbers"
      descriptionAr="قفل أرقام مخازن المناطق"
      icon={Lock}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Locked":"bg-red-100 text-red-700","Unlocked":"bg-green-100 text-green-700"}}
    />
  );
}
