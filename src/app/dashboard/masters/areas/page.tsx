'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { MapPin } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Area Name","ar":"اسم المنطقة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"code","en":"Code","ar":"الرمز"},{"key":"deliveryFee","en":"Delivery Fee","ar":"رسوم التوصيل"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"Deira","emirate":"Dubai","code":"DXB-DEI","deliveryFee":"15 AED","status":"Active"},{"id":2,"name":"Bur Dubai","emirate":"Dubai","code":"DXB-BUR","deliveryFee":"15 AED","status":"Active"},{"id":3,"name":"JBR","emirate":"Dubai","code":"DXB-JBR","deliveryFee":"20 AED","status":"Active"},{"id":4,"name":"Al Nahda","emirate":"Sharjah","code":"SHJ-NAH","deliveryFee":"25 AED","status":"Active"},{"id":5,"name":"Khalifa City","emirate":"Abu Dhabi","code":"AUH-KHC","deliveryFee":"35 AED","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Areas"
      titleAr="المناطق"
      descriptionEn="Manage delivery areas"
      descriptionAr="إدارة مناطق التوصيل"
      icon={MapPin}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
