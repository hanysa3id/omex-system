'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Mail } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"subject","en":"Subject","ar":"الموضوع"},{"key":"to","en":"To","ar":"إلى"},{"key":"type","en":"Type","ar":"النوع"},{"key":"createdAt","en":"Created","ar":"تاريخ الإنشاء"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"subject":"Monthly Invoice - January 2024","to":"noon@example.com","type":"Invoice","createdAt":"2024-01-15","status":"Draft"},{"id":2,"subject":"Delivery Confirmation","to":"client@example.com","type":"Notification","createdAt":"2024-01-14","status":"Sent"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Draft Emails"
      titleAr="مسودات البريد"
      descriptionEn="Manage email drafts and templates"
      descriptionAr="إدارة مسودات وقوالب البريد"
      icon={Mail}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Draft":"bg-amber-100 text-amber-700","Sent":"bg-green-100 text-green-700"}} createLabelEn="New Email" createLabelAr="بريد جديد"
    />
  );
}
