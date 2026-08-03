'use client';

import React from 'react';
import PageScaffold from '@/components/shared/PageScaffold';
import { INITIAL_VEHICLES } from '@/lib/mockData';
import { Car } from 'lucide-react';

export default function FleetListPage() {
  const columns = [
    { key: 'plateNumber', en: 'Plate Number', ar: 'رقم اللوحة' },
    { key: 'emirateRegistered', en: 'Emirate', ar: 'الإمارة' },
    { key: 'type', en: 'Vehicle Type', ar: 'نوع المركبة' },
    { key: 'makeModel', en: 'Make / Model', ar: 'الموديل والطراز' },
    { key: 'year', en: 'Year', ar: 'سنة الصنع' },
    { key: 'odometerKm', en: 'Odometer (km)', ar: 'عداد الكيلومترات' },
    { key: 'mulkiyaExpiry', en: 'Mulkiya Expiry', ar: 'انتهاء الملكية' },
    { key: 'status', en: 'Status', ar: 'الحالة' },
  ];

  const rows = INITIAL_VEHICLES.map((v) => ({
    id: v.id,
    plateNumber: `${v.plateCode}-${v.plateNumber}`,
    emirateRegistered: v.emirateRegistered,
    type: v.type,
    makeModel: v.makeModel,
    year: v.year,
    odometerKm: v.odometerKm,
    mulkiyaExpiry: v.mulkiyaExpiry,
    status: v.status,
  }));

  return (
    <PageScaffold
      titleEn="Vehicle Fleet Registry"
      titleAr="سجل أسطول المركبات والسيارات"
      descriptionEn="Manage company delivery vans, chiller trucks, and motorcycles across UAE Emirates"
      descriptionAr="إدارة سيارات الفان، الشاحنات المبردة والدراجات النارية في إمارات الدولة"
      icon={Car}
      columns={columns}
      rows={rows}
      categoryKey="fleet_vehicles"
      createLabelEn="Add New Vehicle"
      createLabelAr="إضافة مركبة جديدة"
      statusKey="status"
    />
  );
}
