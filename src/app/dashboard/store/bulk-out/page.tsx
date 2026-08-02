'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Archive } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"batchNo","en":"Batch No","ar":"رقم الدفعة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"totalPcs","en":"Total Pieces","ar":"إجمالي القطع"},{"key":"scanned","en":"Scanned","ar":"تم المسح"},{"key":"time","en":"Time","ar":"الوقت"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"batchNo":"BOUT-20240115-01","driver":"Ahmed K.","totalPcs":20,"scanned":20,"time":"10:00 AM","status":"Dispatched"},{"id":2,"batchNo":"BOUT-20240115-02","driver":"Mohammed A.","totalPcs":15,"scanned":15,"time":"10:15 AM","status":"Dispatched"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Bulk Out Scan"
      titleAr="مسح خروج مجمع"
      descriptionEn="Bulk scan outgoing packages"
      descriptionAr="مسح مجمع للطرود الخارجة"
      icon={Archive}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Dispatched":"bg-blue-100 text-blue-700","In Progress":"bg-amber-100 text-amber-700"}} createLabelEn="New Batch" createLabelAr="دفعة جديدة"
    />
  );
}
