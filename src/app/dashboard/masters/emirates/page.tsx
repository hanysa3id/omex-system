'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { MapPin } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Name","ar":"الاسم"},{"key":"nameAr","en":"Arabic Name","ar":"الاسم بالعربي"},{"key":"code","en":"Code","ar":"الرمز"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"Dubai","nameAr":"دبي","code":"DXB","status":"Active"},{"id":2,"name":"Abu Dhabi","nameAr":"أبوظبي","code":"AUH","status":"Active"},{"id":3,"name":"Sharjah","nameAr":"الشارقة","code":"SHJ","status":"Active"},{"id":4,"name":"Ajman","nameAr":"عجمان","code":"AJM","status":"Active"},{"id":5,"name":"Ras Al Khaimah","nameAr":"رأس الخيمة","code":"RAK","status":"Active"},{"id":6,"name":"Fujairah","nameAr":"الفجيرة","code":"FJR","status":"Active"},{"id":7,"name":"Umm Al Quwain","nameAr":"أم القيوين","code":"UAQ","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Emirates"
      titleAr="الإمارات"
      descriptionEn="Manage UAE emirates"
      descriptionAr="إدارة الإمارات"
      icon={MapPin}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
