'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { User } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"name","en":"Username","ar":"اسم المستخدم"},{"key":"email","en":"Email","ar":"البريد"},{"key":"role","en":"Role","ar":"الدور"},{"key":"lastLogin","en":"Last Login","ar":"آخر دخول"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"name":"admin","email":"admin@omex.ae","role":"Admin","lastLogin":"2024-01-15 09:30","status":"Active"},{"id":2,"name":"dispatcher1","email":"dispatch@omex.ae","role":"Dispatcher","lastLogin":"2024-01-15 08:45","status":"Active"},{"id":3,"name":"driver.ahmed","email":"ahmed@omex.ae","role":"Driver","lastLogin":"2024-01-14 17:20","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Users"
      titleAr="المستخدمون"
      descriptionEn="Manage system users and roles"
      descriptionAr="إدارة المستخدمين والأدوار"
      icon={User}
      columns={columns}
      rows={sampleRows}
      statusKey="role" statusColors={{"Admin":"bg-purple-100 text-purple-700","Dispatcher":"bg-blue-100 text-blue-700","Driver":"bg-green-100 text-green-700","Accountant":"bg-amber-100 text-amber-700"}}
    />
  );
}
