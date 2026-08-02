'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Wallet } from 'lucide-react';

const columns = [{"key":"period","en":"Period","ar":"الفترة"},{"key":"totalInvoiced","en":"Invoiced","ar":"المفوتر"},{"key":"collected","en":"Collected","ar":"المحصل"},{"key":"pending","en":"Pending","ar":"قيد الانتظار"},{"key":"collectionRate","en":"Rate","ar":"النسبة"}];
const sampleRows = [{"period":"Jan 2024","totalInvoiced":"245,000 AED","collected":"218,000 AED","pending":"27,000 AED","collectionRate":"89%"},{"period":"Dec 2023","totalInvoiced":"280,000 AED","collected":"268,000 AED","pending":"12,000 AED","collectionRate":"95.7%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Payment Reports"
      titleAr="تقارير المدفوعات"
      descriptionEn="Payment collection and reconciliation"
      descriptionAr="تقارير تحصيل ومطابقة المدفوعات"
      icon={Wallet}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
