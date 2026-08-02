'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Shield } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"provider","en":"Provider","ar":"المزود"},{"key":"policyNo","en":"Policy No","ar":"رقم البوليصة"},{"key":"premium","en":"Premium","ar":"القسط"},{"key":"expiry","en":"Expiry","ar":"الانتهاء"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"DXB A-12345","provider":"Oman Insurance","policyNo":"INS-2024-001","premium":"3,500 AED","expiry":"2025-01-15","status":"Active"},{"id":2,"vehicle":"SHJ B-67890","provider":"AXA Gulf","policyNo":"INS-2024-002","premium":"3,200 AED","expiry":"2024-06-20","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Insurance"
      titleAr="التأمين"
      descriptionEn="Vehicle insurance policies"
      descriptionAr="وثائق تأمين المركبات"
      icon={Shield}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Expiring":"bg-amber-100 text-amber-700","Expired":"bg-red-100 text-red-700"}}
    />
  );
}
