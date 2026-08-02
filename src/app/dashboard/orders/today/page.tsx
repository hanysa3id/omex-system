'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Clock } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"orderNo":"OMX-20240115-001","client":"Noon.com","customer":"Khalid M.","area":"Deira","amount":"120 AED","status":"Delivered"},{"id":2,"orderNo":"OMX-20240115-002","client":"Namshi","customer":"Aisha A.","area":"JBR","amount":"85 AED","status":"Out for Delivery"},{"id":3,"orderNo":"OMX-20240115-003","client":"Mumzworld","customer":"Hassan S.","area":"Khalifa City","amount":"210 AED","status":"Pending"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Today'\''s Orders"
      titleAr="طلبات اليوم"
      descriptionEn="View all orders for today"
      descriptionAr="عرض جميع طلبات اليوم"
      icon={Clock}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Out for Delivery":"bg-blue-100 text-blue-700","Pending":"bg-amber-100 text-amber-700","Failed":"bg-red-100 text-red-700"}}
    />
  );
}
