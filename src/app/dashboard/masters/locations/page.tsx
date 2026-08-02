'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { MapPin } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Location","ar":"الموقع"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"lat","en":"Latitude","ar":"خط العرض"},{"key":"lng","en":"Longitude","ar":"خط الطول"}];

const sampleRows = [{"id":1,"name":"Gold Souk","area":"Deira","emirate":"Dubai","lat":"25.2682","lng":"55.2962"},{"id":2,"name":"City Walk","area":"Bur Dubai","emirate":"Dubai","lat":"25.2084","lng":"55.2636"},{"id":3,"name":"The Walk","area":"JBR","emirate":"Dubai","lat":"25.0768","lng":"55.1340"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Locations"
      titleAr="المواقع"
      descriptionEn="Manage delivery locations"
      descriptionAr="إدارة مواقع التوصيل"
      icon={MapPin}
      columns={columns}
      rows={sampleRows}
      
    />
  );
}
