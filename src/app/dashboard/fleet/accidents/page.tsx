'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { AlertTriangle } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"vehicle","en":"Vehicle","ar":"المركبة"},{"key":"driver","en":"Driver","ar":"السائق"},{"key":"date","en":"Date","ar":"التاريخ"},{"key":"location","en":"Location","ar":"الموقع"},{"key":"damage","en":"Damage Cost","ar":"تكلفة الضرر"},{"key":"status","en":"Status","ar":"الحالة"}];
const sampleRows = [{"id":1,"vehicle":"AJM C-11223","driver":"Omar Hassan","date":"2024-01-12","location":"Al Nahda, Sharjah","damage":"4,500 AED","status":"Under Review"},{"id":2,"vehicle":"DXB A-12345","driver":"Ahmed K.","date":"2023-11-05","location":"Deira, Dubai","damage":"1,200 AED","status":"Resolved"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Accidents"
      titleAr="الحوادث"
      descriptionEn="Vehicle accident records"
      descriptionAr="سجل حوادث المركبات"
      icon={AlertTriangle}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Under Review":"bg-amber-100 text-amber-700","Resolved":"bg-green-100 text-green-700","Claimed":"bg-blue-100 text-blue-700"}}
    />
  );
}
