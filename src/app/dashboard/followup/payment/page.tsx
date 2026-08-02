'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { DollarSign } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"client","en":"Client","ar":"العميل"},{"key":"invoiceNo","en":"Invoice No","ar":"رقم الفاتورة"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"dueDate","en":"Due Date","ar":"تاريخ الاستحقاق"},{"key":"daysOverdue","en":"Days Overdue","ar":"أيام التأخير"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"client":"Noon.com","invoiceNo":"INV-20240101","amount":"45,200 AED","dueDate":"2024-01-15","daysOverdue":0,"status":"Due Today"},{"id":2,"client":"Namshi","invoiceNo":"INV-20231228","amount":"23,100 AED","dueDate":"2024-01-10","daysOverdue":5,"status":"Overdue"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Payment Followup"
      titleAr="متابعة المدفوعات"
      descriptionEn="Follow up on pending payments"
      descriptionAr="متابعة المدفوعات المعلقة"
      icon={DollarSign}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Due Today":"bg-amber-100 text-amber-700","Overdue":"bg-red-100 text-red-700","Paid":"bg-green-100 text-green-700"}} showCreate={false}
    />
  );
}
