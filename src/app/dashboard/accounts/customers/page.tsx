'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { User } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Name","ar":"الاسم"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"totalOrders","en":"Orders","ar":"الطلبات"}];

const sampleRows = [{"id":1,"name":"Khalid Al Maktoum","phone":"+971551234567","area":"Deira","emirate":"Dubai","totalOrders":12},{"id":2,"name":"Aisha Mohammed","phone":"+971552345678","area":"JBR","emirate":"Dubai","totalOrders":8},{"id":3,"name":"Hassan Saeed","phone":"+971553456789","area":"Khalifa City","emirate":"Abu Dhabi","totalOrders":5}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Customers"
      titleAr="المستلمون"
      descriptionEn="Manage end customers"
      descriptionAr="إدارة المستلمين"
      icon={User}
      columns={columns}
      rows={sampleRows}
      
    />
  );
}
