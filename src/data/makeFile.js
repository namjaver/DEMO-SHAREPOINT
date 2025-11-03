// File: data/mockFiles.js
export const MOCK_COMPANIES = [
  { id: "c1", name: "Công ty A", departments: ["Finance", "HR", "Sales"] },
  { id: "c2", name: "Công ty B", departments: ["Marketing", "Product", "Support"] },
  { id: "c3", name: "Công ty C", departments: ["R&D", "Finance"] },
];

export const FILE_TYPES = ["Tuần", "Tháng", "Quý", "Thường niên", "Khác"];

export function makeFiles() {
  const files = [];
  let id = 1;
  const now = new Date();
  for (const c of MOCK_COMPANIES) {
    for (const d of c.departments) {
      for (let i = 0; i < 6; i++) {
        const type = FILE_TYPES[(i + c.id.length + d.length) % FILE_TYPES.length];
        const dt = new Date(now);
        dt.setDate(now.getDate() - Math.floor(Math.random() * 400));
        const ext = ["pdf", "xlsx", "docx"][i % 3];
        files.push({
          id: id++,
          title: `${type} Report - ${d} #${i + 1}`,
          fileName: `${type.toLowerCase()}_${d}_${i + 1}.${ext}`,
          company: c.name,
          department: d,
          reporter: 'Chấn Nam',
          type,
          uploader: `user${(i % 5) + 1}@company.vn`,
          uploadedAt: dt.toISOString().slice(0, 10),
          sizeKB: Math.floor(Math.random() * 900) + 100,
          notes: `Mẫu báo cáo ${type.toLowerCase()} dành cho ${d}`,
        });
      }
    }
  }
  return files.sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export const MOCK_FILES = makeFiles();
