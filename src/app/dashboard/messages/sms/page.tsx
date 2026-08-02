'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { MessageCircle } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"template","en":"Template","ar":"القالب"},{"key":"message","en":"Message Preview","ar":"معاينة الرسالة"},{"key":"type","en":"Type","ar":"النوع"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"template":"Delivery OTP","message":"Your OTP is {code}. Valid for 5 min.","type":"Transactional","status":"Active"},{"id":2,"template":"Delivery Notification","message":"Your order {orderNo} is out for delivery.","type":"Notification","status":"Active"},{"id":3,"template":"Failed Delivery","message":"Delivery attempt for {orderNo} failed.","type":"Alert","status":"Draft"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Draft SMS"
      titleAr="مسودات الرسائل"
      descriptionEn="Manage SMS drafts and templates"
      descriptionAr="إدارة مسودات وقوالب الرسائل القصيرة"
      icon={MessageCircle}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Draft":"bg-amber-100 text-amber-700"}} createLabelEn="New Template" createLabelAr="قالب جديد"
    />
  );
}
