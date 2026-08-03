'use client';

import React from 'react';
import PageScaffold from '@/components/shared/PageScaffold';
import { Wrench } from 'lucide-react';

export default function FleetMaintenancePage() {
  const columns = [
    { key: 'plateNumber', en: 'Vehicle Plate', ar: 'رقم اللوحة' },
    { key: 'serviceType', en: 'Maintenance Service', ar: 'نوع الصيانة' },
    { key: 'workshopName', en: 'Workshop / Garage', ar: 'اسم الورشة' },
    { key: 'cost', en: 'Cost (AED)', ar: 'التكلفة (درهم)' },
    { key: 'odometer', en: 'Odometer (km)', ar: 'قراءة العداد' },
    { key: 'serviceDate', en: 'Service Date', ar: 'تاريخ الصيانة' },
    { key: 'status', en: 'Status', ar: 'الحالة' },
  ];

  const rows = [
    { id: 1, plateNumber: 'A-49201', serviceType: 'Engine Oil & Filter Change', workshopName: 'Al Quoz Auto Workshop', cost: '350.00', odometer: '45,200', serviceDate: '2026-07-28', status: 'Completed' },
    { id: 2, plateNumber: 'B-12840', serviceType: 'Brake Pads & Rotor Replacement', workshopName: 'Mussafah Express Garage', cost: '850.00', odometer: '82,100', serviceDate: '2026-07-20', status: 'Completed' },
    { id: 3, plateNumber: 'DXB-9921', serviceType: 'AC Chiller Compressor Overhaul', workshopName: 'Dubai Thermal Solutions', cost: '1,450.00', odometer: '32,500', serviceDate: '2026-08-01', status: 'In Progress' },
  ];

  return (
    <PageScaffold
      titleEn="Fleet Maintenance & Service Logs"
      titleAr="سجل صيانة وإصلاح المركبات والأسطول"
      descriptionEn="Track scheduled oil changes, mechanical repairs, and garage invoices"
      descriptionAr="تتبع الصيانات الدورية، تغيير الزيوت وإصلاحات الورش وفواتير الصيانة"
      icon={Wrench}
      columns={columns}
      rows={rows}
      categoryKey="fleet_maintenance"
      createLabelEn="Log Maintenance Record"
      createLabelAr="تسجيل أمر صيانة"
      statusKey="status"
    />
  );
}
