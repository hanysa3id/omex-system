'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { DollarSign } from 'lucide-react';

const columns = [{"key":"category","en":"Category","ar":"الفئة"},{"key":"thisMonth","en":"This Month","ar":"هذا الشهر"},{"key":"lastMonth","en":"Last Month","ar":"الشهر الماضي"},{"key":"change","en":"Change %","ar":"التغيير %"},{"key":"budget","en":"Budget","ar":"الميزانية"}];
const sampleRows = [{"category":"Fuel","thisMonth":"12,500 AED","lastMonth":"11,800 AED","change":"+5.9%","budget":"15,000 AED"},{"category":"Maintenance","thisMonth":"8,200 AED","lastMonth":"6,500 AED","change":"+26.2%","budget":"10,000 AED"},{"category":"Fines","thisMonth":"1,400 AED","lastMonth":"800 AED","change":"+75%","budget":"2,000 AED"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Expense Reports"
      titleAr="تقارير المصروفات"
      descriptionEn="Expense analytics and breakdown"
      descriptionAr="تحليلات وتفصيل المصروفات"
      icon={DollarSign}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
