'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { DollarSign } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"paymentNo","en":"Payment No","ar":"رقم الدفعة"},{"key":"client","en":"Client","ar":"العميل"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"method","en":"Method","ar":"الطريقة"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"paymentNo":"PAY-20240115-01","client":"Noon.com","amount":"45,200 AED","method":"Bank Transfer","status":"Pending"},{"id":2,"paymentNo":"PAY-20240114-02","client":"Namshi","amount":"23,100 AED","method":"Cheque","status":"Approved"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Payment Approvals"
      titleAr="موافقة المدفوعات"
      descriptionEn="Approve pending payments"
      descriptionAr="الموافقة على المدفوعات المعلقة"
      icon={DollarSign}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Pending":"bg-amber-100 text-amber-700","Approved":"bg-green-100 text-green-700","Rejected":"bg-red-100 text-red-700"}} showCreate={false}
    />
  );
}
