'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Package } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"barcode","en":"Barcode","ar":"الباركود"},{"key":"client","en":"Client","ar":"العميل"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"items","en":"Items","ar":"العناصر"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"barcode":"PKP001234567","client":"Noon.com","driver":"Ahmed K.","items":25,"time":"08:30 AM","status":"Picked Up"},{"id":2,"barcode":"PKP001234568","client":"Namshi","driver":"Omar H.","items":12,"time":"09:00 AM","status":"Picked Up"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Pickup Scan"
      titleAr="مسح الاستلام"
      descriptionEn="Scan packages picked up from clients"
      descriptionAr="مسح الطرود المستلمة من العملاء"
      icon={Package}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCameraScanner={true} statusKey="status" statusColors={{"Picked Up":"bg-green-100 text-green-700","In Progress":"bg-blue-100 text-blue-700"}} createLabelEn="Start Scan" createLabelAr="بدء المسح"
    />
  );
}
