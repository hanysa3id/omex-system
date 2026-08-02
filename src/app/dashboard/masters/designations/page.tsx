'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { UserCheck } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"title","en":"Designation","ar":"المسمى"},{"key":"department","en":"Department","ar":"القسم"},{"key":"level","en":"Level","ar":"المستوى"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"title":"Dispatcher","department":"Operations","level":"Senior","status":"Active"},{"id":2,"title":"Driver","department":"Delivery","level":"Junior","status":"Active"},{"id":3,"title":"Accountant","department":"Finance","level":"Mid","status":"Active"},{"id":4,"title":"Warehouse Manager","department":"Store","level":"Senior","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Designations"
      titleAr="المسميات الوظيفية"
      descriptionEn="Manage employee designations"
      descriptionAr="إدارة المسميات الوظيفية"
      icon={UserCheck}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
