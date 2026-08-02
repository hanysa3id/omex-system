'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { UserCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"startDate","en":"Start Date","ar":"تاريخ البداية"},{"key":"endDate","en":"End Date","ar":"تاريخ النهاية"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","driver":"Ahmed Khalil","startDate":"2024-01-01","endDate":"—","status":"Active"},{"id":2,"vehicle":"SHJ B-67890","driver":"Mohammed Ali","startDate":"2024-01-01","endDate":"—","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Assignments"
      titleAr="التعيينات"
      descriptionEn="Vehicle-driver assignments"
      descriptionAr="تعيينات السائقين للمركبات"
      icon={UserCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Ended":"bg-gray-100 text-gray-700"}}
    />
  );
}
