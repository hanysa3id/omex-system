'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { FileDown } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"noteNo","en":"Delivery Note","ar":"رقم البوليصة"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"message","en":"Message","ar":"الرسالة"},{"key":"sentAt","en":"Sent At","ar":"وقت الإرسال"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"noteNo":"DN-20240115-01","phone":"+971551234567","message":"Your delivery DN-01 is on the way","sentAt":"10:35 AM","status":"Delivered"},{"id":2,"noteNo":"DN-20240115-02","phone":"+971552345678","message":"Your delivery DN-02 is on the way","sentAt":"10:36 AM","status":"Delivered"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Delivery Note SMS"
      titleAr="رسائل بوالص التوصيل"
      descriptionEn="Send SMS notifications for delivery notes"
      descriptionAr="إرسال رسائل قصيرة لبوالص التوصيل"
      icon={FileDown}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}
    />
  );
}
