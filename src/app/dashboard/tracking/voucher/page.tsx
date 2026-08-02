'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Receipt } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"voucherNo","en":"Voucher No","ar":"رقم البوليصة"},{"key":"orderNo","en":"Order No","ar":"رقم الطلب"},{"key":"client","en":"Client","ar":"العميل"},{"key":"customer","en":"Customer","ar":"المستلم"},{"key":"lastUpdate","en":"Last Update","ar":"آخر تحديث"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"voucherNo":"VCH-20240115-001","orderNo":"OMX-20240115-001","client":"Noon.com","customer":"Khalid M.","lastUpdate":"02:15 PM","status":"Delivered"},{"id":2,"voucherNo":"VCH-20240115-002","orderNo":"OMX-20240115-002","client":"Namshi","customer":"Aisha A.","lastUpdate":"11:30 AM","status":"Out for Delivery"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Track By Voucher"
      titleAr="تتبع بالبوليصة"
      descriptionEn="Track orders by voucher number"
      descriptionAr="تتبع الطلبات برقم البوليصة"
      icon={Receipt}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Delivered":"bg-green-100 text-green-700","Out for Delivery":"bg-blue-100 text-blue-700","Pending":"bg-amber-100 text-amber-700"}} showCreate={false}
    />
  );
}
