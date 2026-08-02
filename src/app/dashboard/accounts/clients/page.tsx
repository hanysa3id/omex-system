'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Building2 } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"company","en":"Company","ar":"الشركة"},{"key":"contact","en":"Contact","ar":"جهة الاتصال"},{"key":"phone","en":"Phone","ar":"الهاتف"},{"key":"emirate","en":"Emirate","ar":"الإمارة"},{"key":"orders","en":"Total Orders","ar":"إجمالي الطلبات"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"company":"Noon.com","contact":"Ali Hassan","phone":"+971501111111","emirate":"Dubai","orders":4520,"status":"Active"},{"id":2,"company":"Namshi","contact":"Sara Ahmed","phone":"+971502222222","emirate":"Dubai","orders":2310,"status":"Active"},{"id":3,"company":"Mumzworld","contact":"Layla Khalil","phone":"+971503333333","emirate":"Abu Dhabi","orders":1280,"status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Clients"
      titleAr="العملاء التجار"
      descriptionEn="Manage business clients"
      descriptionAr="إدارة العملاء التجار"
      icon={Building2}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
