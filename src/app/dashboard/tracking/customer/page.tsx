'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { User } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"totalOrders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"delivered","en":"Delivered","ar":"تم التوصيل"},{"key":"pending","en":"Pending","ar":"قيد الانتظار"}];
const sampleRows = [{"id":1,"customer":"Khalid Al Maktoum","phone":"+971551234567","totalOrders":12,"delivered":10,"pending":2},{"id":2,"customer":"Aisha Mohammed","phone":"+971552345678","totalOrders":8,"delivered":8,"pending":0}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Track By Customer"
      titleAr="تتبع بالعميل"
      descriptionEn="Track orders by customer"
      descriptionAr="تتبع الطلبات بحسب المستلم"
      icon={User}
      columns={columns}
      rows={sampleRows}
      showCreate={false}
    />
  );
}
