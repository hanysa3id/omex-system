'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Car } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"type","en":"Type","ar":"النوع"},{"key":"amount","en":"Amount","ar":"المبلغ"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"receipt","en":"Receipt","ar":"الإيصال"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"driver":"Ahmed Khalil","type":"Fuel","amount":"150 AED","date":"2024-01-15","receipt":"Yes","status":"Approved"},{"id":2,"driver":"Mohammed Ali","type":"Toll Fee","amount":"20 AED","date":"2024-01-15","receipt":"Yes","status":"Pending"},{"id":3,"driver":"Omar Hassan","type":"Parking","amount":"30 AED","date":"2024-01-15","receipt":"No","status":"Rejected"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Driver Expenses"
      titleAr="مصروفات السائقين"
      descriptionEn="Manage driver expenses and claims"
      descriptionAr="إدارة مصروفات ومطالبات السائقين"
      icon={Car}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} statusKey="status" statusColors={{"Approved":"bg-green-100 text-green-700","Pending":"bg-amber-100 text-amber-700","Rejected":"bg-red-100 text-red-700"}} createLabelEn="Add Expense" createLabelAr="إضافة مصروف"
    />
  );
}
