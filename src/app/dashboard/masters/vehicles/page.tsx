'use client';

import PageScaffold from '@/components/shared/PageScaffold';
import { Car } from 'lucide-react';

const columns = [{"key":"id","en":"#","ar":"#"},{"key":"type","en":"Vehicle Type","ar":"نوع المركبة"},{"key":"capacity","en":"Capacity (KG)","ar":"السعة (كجم)"},{"key":"fuelType","en":"Fuel Type","ar":"نوع الوقود"},{"key":"status","en":"Status","ar":"الحالة"}];

const sampleRows = [{"id":1,"type":"Van","capacity":"1500","fuelType":"Diesel","status":"Active"},{"id":2,"type":"Truck","capacity":"5000","fuelType":"Diesel","status":"Active"},{"id":3,"type":"Motorcycle","capacity":"50","fuelType":"Petrol","status":"Active"},{"id":4,"type":"Sedan","capacity":"200","fuelType":"Petrol","status":"Active"}];

export default function Page() {
  return (
    <PageScaffold
      titleEn="Vehicles Master"
      titleAr="المركبات"
      descriptionEn="Manage vehicle models and types"
      descriptionAr="إدارة أنواع وموديلات المركبات"
      icon={Car}
      columns={columns}
      rows={sampleRows}
      statusKey="status" statusColors={{"Active":"bg-green-100 text-green-700","Inactive":"bg-red-100 text-red-700"}}
    />
  );
}
