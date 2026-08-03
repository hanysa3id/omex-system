'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Archive } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"batchNo","en":"Batch No","ar":"رقم الدفعة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"totalPcs","en":"Total Pieces","ar":"إجمالي القطع"},{"key":"scanned","en":"Scanned","ar":"تم المسح"},{"key":"errors","en":"Errors","ar":"الأخطاء"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"batchNo":"BIN-20240115-01","client":"Noon.com","totalPcs":120,"scanned":120,"errors":0,"status":"Completed"},{"id":2,"batchNo":"BIN-20240115-02","client":"Namshi","totalPcs":85,"scanned":83,"errors":2,"status":"Completed"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Bulk In Scan"
      titleAr="مسح دخول مجمع"
      descriptionEn="Bulk scan incoming packages"
      descriptionAr="مسح مجمع للطرود الداخلة"
      icon={Archive}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCameraScanner={true} statusKey="status" statusColors={{"Completed":"bg-green-100 text-green-700","In Progress":"bg-blue-100 text-blue-700"}} createLabelEn="New Batch" createLabelAr="دفعة جديدة"
    />
  );
}
