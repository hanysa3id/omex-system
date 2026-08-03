'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Truck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"barcode":"OMX001234567","orderNo":"OMX-20240115-001","driver":"Ahmed K.","customer":"Khalid M.","time":"02:15 PM","status":"Delivered"},{"id":2,"barcode":"OMX001234568","orderNo":"OMX-20240115-002","driver":"Ahmed K.","customer":"Aisha A.","time":"02:45 PM","status":"Delivered"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Delivery Scan"
      titleAr="مسح التوصيل"
      descriptionEn="Scan packages on delivery confirmation"
      descriptionAr="مسح الطرود عند تأكيد التوصيل"
      icon={Truck}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCameraScanner={true} statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Failed":"bg-red-100 text-red-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"
    />
  );
}
