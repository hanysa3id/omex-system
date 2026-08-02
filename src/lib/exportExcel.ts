/**
 * Helper to export JSON array data to downloadable CSV file with UTF-8 BOM
 * (Compatible with MS Excel, supporting both English and Arabic text).
 */
export function exportToCsv(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          let val = row[header] === null || row[header] === undefined ? '' : String(row[header]);
          // Escape quotes
          val = val.replace(/"/g, '""');
          if (val.includes(',') || val.includes('\n') || val.includes('"')) {
            val = `"${val}"`;
          }
          return val;
        })
        .join(',')
    ),
  ].join('\n');

  // Add UTF-8 BOM (\uFEFF) so Excel parses Arabic characters correctly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
