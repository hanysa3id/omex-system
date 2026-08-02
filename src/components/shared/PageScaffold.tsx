'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { exportToCsv } from '@/lib/exportToCsv';
import {
  Search,
  Download,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  Printer,
  type LucideIcon,
} from 'lucide-react';

interface Column {
  key: string;
  en: string;
  ar: string;
}

interface PageScaffoldProps {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: LucideIcon;
  columns: Column[];
  rows: Record<string, string | number>[];
  showCreate?: boolean;
  showExport?: boolean;
  showFilter?: boolean;
  showDateFilter?: boolean;
  createLabelEn?: string;
  createLabelAr?: string;
  statusKey?: string;
  statusColors?: Record<string, string>;
}

export default function PageScaffold({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  icon: Icon,
  columns,
  rows: initialRows,
  showCreate = true,
  showExport = true,
  showFilter = true,
  showDateFilter = false,
  createLabelEn = 'Add New',
  createLabelAr = 'إضافة جديد',
  statusKey,
  statusColors = {},
}: PageScaffoldProps) {
  const { lang } = useI18n();

  // Local interactive state
  const [tableRows, setTableRows] = useState<Record<string, string | number>[]>(initialRows);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewRow, setViewRow] = useState<Record<string, string | number> | null>(null);
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter logic
  const filtered = tableRows.filter((r) => {
    const matchesSearch = Object.values(r).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus =
      statusFilter === 'ALL' || !statusKey || String(r[statusKey]) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Unique status list for filter
  const uniqueStatuses = statusKey
    ? Array.from(new Set(tableRows.map((r) => String(r[statusKey]))))
    : [];

  // Export action
  const handleExport = () => {
    if (tableRows.length === 0) {
      showToast(lang === 'ar' ? 'لا توجد بيانات للتصدير' : 'No data to export');
      return;
    }
    const exportData = tableRows.map((row) => {
      const obj: Record<string, string | number> = {};
      columns.forEach((col) => {
        obj[lang === 'ar' ? col.ar : col.en] = row[col.key] ?? '';
      });
      return obj;
    });
    exportToCsv(`${titleEn.replace(/\s+/g, '_')}_export.csv`, exportData);
    showToast(lang === 'ar' ? 'تم تصدير الملف بنجاح!' : 'File exported successfully!');
  };

  // Submit Create form
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = tableRows.length + 1;
    const newRow: Record<string, string | number> = { id: newId, ...formData };
    
    // Fill default values for missing columns
    columns.forEach((col) => {
      if (!(col.key in newRow)) {
        newRow[col.key] = col.key === statusKey ? 'Active' : '-';
      }
    });

    setTableRows([newRow, ...tableRows]);
    setIsCreateOpen(false);
    setFormData({});
    showToast(lang === 'ar' ? 'تمت الإضافة بنجاح!' : 'Record created successfully!');
  };

  // Submit Edit form
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editRowIndex === null) return;
    const updated = [...tableRows];
    updated[editRowIndex] = { ...updated[editRowIndex], ...formData };
    setTableRows(updated);
    setEditRowIndex(null);
    setFormData({});
    showToast(lang === 'ar' ? 'تم التعديل بنجاح!' : 'Record updated successfully!');
  };

  // Delete row
  const handleDeleteRow = (idx: number) => {
    const updated = tableRows.filter((_, i) => i !== idx);
    setTableRows(updated);
    setActiveMenuIndex(null);
    showToast(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Record deleted!');
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 bg-[#169C47] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#169C47]/10 text-[#169C47] p-3 rounded-2xl">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lang === 'ar' ? titleAr : titleEn}</h1>
            <p className="text-sm text-gray-500">{lang === 'ar' ? descriptionAr : descriptionEn}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {showExport && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              {lang === 'ar' ? 'تصدير Excel' : 'Export Excel'}
            </button>
          )}
          {showCreate && (
            <button
              onClick={() => {
                setFormData({});
                setIsCreateOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#169C47] hover:bg-[#128a3c] transition shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              {lang === 'ar' ? createLabelAr : createLabelEn}
            </button>
          )}
        </div>
      </div>

      {/* Filter Drawer / Bar */}
      {isFilterOpen && (
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex flex-wrap items-center gap-4 animate-in fade-in">
          <span className="text-xs font-bold text-emerald-900">{lang === 'ar' ? 'تصفية حسب الحالة:' : 'Filter by Status:'}</span>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === 'ALL' ? 'bg-[#169C47] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {lang === 'ar' ? 'الكل' : 'All'}
          </button>
          {uniqueStatuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st ? 'bg-[#169C47] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 border-b border-gray-100">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder={lang === 'ar' ? 'بحث...' : 'Search...'}
              className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169C47]/30 focus:border-[#169C47]"
            />
          </div>

          {showDateFilter && (
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input type="date" className="border-none outline-none text-sm bg-transparent" />
              </div>
              <span className="text-gray-400 text-xs">{lang === 'ar' ? 'إلى' : 'to'}</span>
              <div className="inline-flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input type="date" className="border-none outline-none text-sm bg-transparent" />
              </div>
            </div>
          )}

          {showFilter && (
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition ${
                isFilterOpen ? 'border-[#169C47] bg-emerald-50 text-[#169C47]' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              {lang === 'ar' ? 'فلتر' : 'Filter'}
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-5 py-3.5 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {lang === 'ar' ? col.ar : col.en}
                  </th>
                ))}
                <th className="px-5 py-3.5 w-12 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-gray-400 font-medium">
                    {lang === 'ar' ? 'لا توجد بيانات مطابقة' : 'No matching records found'}
                  </td>
                </tr>
              ) : (
                pageRows.map((row, i) => {
                  const actualIdx = (currentPage - 1) * perPage + i;
                  return (
                    <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                      {columns.map((col) => (
                        <td key={col.key} className="px-5 py-3.5 whitespace-nowrap">
                          {statusKey && col.key === statusKey ? (
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                statusColors[String(row[col.key])] || 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {String(row[col.key])}
                            </span>
                          ) : (
                            <span className="text-gray-700 font-medium">{String(row[col.key] ?? '-')}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-5 py-3.5 relative text-center">
                        <button
                          onClick={() => setActiveMenuIndex(activeMenuIndex === actualIdx ? null : actualIdx)}
                          className="p-1.5 rounded-lg hover:bg-gray-200/60 transition"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuIndex === actualIdx && (
                          <div className="absolute end-4 top-10 z-30 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1 text-start text-xs font-semibold animate-in fade-in">
                            <button
                              onClick={() => {
                                setViewRow(row);
                                setActiveMenuIndex(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-500" />
                              {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </button>

                            <button
                              onClick={() => {
                                setEditRowIndex(actualIdx);
                                setFormData(
                                  Object.fromEntries(
                                    Object.entries(row).map(([k, v]) => [k, String(v)])
                                  )
                                );
                                setActiveMenuIndex(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-500" />
                              {lang === 'ar' ? 'تعديل' : 'Edit Record'}
                            </button>

                            <button
                              onClick={() => window.print()}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              <Printer className="w-3.5 h-3.5 text-purple-500" />
                              {lang === 'ar' ? 'طباعة' : 'Print'}
                            </button>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              onClick={() => handleDeleteRow(actualIdx)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              {lang === 'ar' ? 'حذف' : 'Delete'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-medium">
            {lang === 'ar'
              ? `عرض ${filtered.length > 0 ? (currentPage - 1) * perPage + 1 : 0}–${Math.min(
                  currentPage * perPage,
                  filtered.length
                )} من ${filtered.length}`
              : `Showing ${filtered.length > 0 ? (currentPage - 1) * perPage + 1 : 0}–${Math.min(
                  currentPage * perPage,
                  filtered.length
                )} of ${filtered.length}`}
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`min-w-[32px] h-8 rounded-lg text-xs font-bold transition ${
                  p === currentPage ? 'bg-[#169C47] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-base">{lang === 'ar' ? createLabelAr : createLabelEn}</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {columns
                .filter((c) => c.key !== 'id')
                .map((col) => (
                  <div key={col.key} className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">
                      {lang === 'ar' ? col.ar : col.en}
                    </label>
                    <input
                      type="text"
                      required={col.key !== statusKey}
                      value={formData[col.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                      placeholder={`Enter ${col.en}...`}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#169C47] focus:ring-2 focus:ring-[#169C47]/20"
                    />
                  </div>
                ))}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#169C47] hover:bg-[#128a3c] transition shadow-md"
                >
                  {lang === 'ar' ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editRowIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-base">{lang === 'ar' ? 'تعديل السجل' : 'Edit Record'}</h3>
              <button
                onClick={() => setEditRowIndex(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {columns
                .filter((c) => c.key !== 'id')
                .map((col) => (
                  <div key={col.key} className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">
                      {lang === 'ar' ? col.ar : col.en}
                    </label>
                    <input
                      type="text"
                      value={formData[col.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#169C47] focus:ring-2 focus:ring-[#169C47]/20"
                    />
                  </div>
                ))}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditRowIndex(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#169C47] hover:bg-[#128a3c] transition shadow-md"
                >
                  {lang === 'ar' ? 'تحديث' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {viewRow && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-base">{lang === 'ar' ? 'تفاصيل السجل' : 'Record Details'}</h3>
              <button
                onClick={() => setViewRow(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
              {columns.map((col) => (
                <div key={col.key} className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                  <span className="text-gray-500 font-semibold">{lang === 'ar' ? col.ar : col.en}:</span>
                  <span className="text-gray-900 font-bold">{String(viewRow[col.key] ?? '-')}</span>
                </div>
              ))}

              <div className="pt-4 text-end">
                <button
                  onClick={() => setViewRow(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#169C47] hover:bg-[#128a3c] transition"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
