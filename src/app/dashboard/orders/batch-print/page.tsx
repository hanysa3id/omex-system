'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Printer } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"area","en":"Area","ar":"المنطقة"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"orderNo":"OMX-20240115-001","client":"Noon.com","customer":"Khalid M.","area":"Deira","status":"Ready"},{"id":2,"orderNo":"OMX-20240115-002","client":"Namshi","customer":"Aisha A.","area":"JBR","status":"Ready"},{"id":3,"orderNo":"OMX-20240115-003","client":"Mumzworld","customer":"Hassan S.","area":"Khalifa City","status":"Ready"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Batch Print"
      titleAr="طباعة مجمعة"
      descriptionEn="Print multiple order labels"
      descriptionAr="طباعة بوالص متعددة"
      icon={Printer}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Ready":"bg-green-100 text-green-700","Printed":"bg-blue-100 text-blue-700"}}
    />
  );
}
