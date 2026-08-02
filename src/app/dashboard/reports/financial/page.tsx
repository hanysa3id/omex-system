'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { BarChart } from 'lucide-react';

const columns = [{"key":"metric","en":"Metric","ar":"المقياس"},{"key":"thisMonth","en":"This Month","ar":"هذا الشهر"},{"key":"lastMonth","en":"Last Month","ar":"الشهر الماضي"},{"key":"ytd","en":"YTD","ar":"منذ بداية العام"},{"key":"change","en":"Change","ar":"التغيير"}];
const sampleRows = [{"metric":"Revenue","thisMonth":"245,000 AED","lastMonth":"280,000 AED","ytd":"245,000 AED","change":"-12.5%"},{"metric":"Expenses","thisMonth":"82,000 AED","lastMonth":"78,000 AED","ytd":"82,000 AED","change":"+5.1%"},{"metric":"Net Profit","thisMonth":"163,000 AED","lastMonth":"202,000 AED","ytd":"163,000 AED","change":"-19.3%"},{"metric":"COD Collected","thisMonth":"120,000 AED","lastMonth":"145,000 AED","ytd":"120,000 AED","change":"-17.2%"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Financial Reports"
      titleAr="التقارير المالية"
      descriptionEn="Financial summaries and P&L"
      descriptionAr="الملخصات المالية والأرباح والخسائر"
      icon={BarChart}
      columns={columns}
      rows={sampleRows}
      showDateFilter={true} showCreate={false}
    />
  );
}
