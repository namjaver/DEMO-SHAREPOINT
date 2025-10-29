import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Info,
  Download,
  FileText,
  FileSpreadsheet,
  FileType,
  ArrowUp,
  ArrowDown,
  Minus,
  ListFilterPlus,
} from "lucide-react";

// --- MOCK DATA ---

const MOCK_COMPANIES = [
  { id: "c1", name: "Công ty A", departments: ["Finance", "HR", "Sales"] },
  { id: "c2", name: "Công ty B", departments: ["Marketing", "Product", "Support"] },
  { id: "c3", name: "Công ty C", departments: ["R&D", "Finance"] },
];

const FILE_TYPES = ["Tuần", "Tháng", "Quý", "Thường niên", "Khác"];

function makeFiles() {
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

const MOCK_FILES = makeFiles();


// --- MULTI-SELECT/SEARCH FILTER COMPONENT ---

function MultiSelectFilter({
  label,
  items,
  selectedItems,
  onToggle,
  onClear,
  className = "",
  isActive, // New prop: true if this filter should be open
  onOpen // New prop: function to set the active filter in parent
}) {
  const [search, setSearch] = useState("");

  // Reset search when the dropdown closes
  useEffect(() => {
    if (!isActive) {
      setSearch("");
    }
  }, [isActive]);

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const displayLabel = selectedItems.length === 0
    ? label
    : selectedItems.length === 1
      ? selectedItems[0]
      : `${selectedItems.length} mục đã chọn`;

  return (
    // Use onBlur on the container to close when clicking outside
    <div
      className={`relative w-40 ${className}`}
      onBlur={(e) => {
        // Check if the related target is outside of this component
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onOpen(null); // Close the active filter
        }
      }}
    >
      <button
        // Set the active filter state in the parent
        onClick={() => onOpen(isActive ? null : label)}
        className="flex items-center justify-between w-full border border-base-300 bg-base-100 px-3 py-1.5 rounded-lg text-sm hover:bg-base-200/50 transition shadow-inner"
        tabIndex={0} // Makes the button focusable for onBlur
      >
        <span className="truncate">{displayLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 opacity-70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isActive && ( // Controlled by parent state
        <div className="absolute z-30 mt-1 bg-base-100 border border-base-300 rounded-md shadow-lg w-full max-w-xs sm:w-56 right-0 sm:left-0">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-1.5 text-sm border-b border-base-300 outline-none bg-base-100 rounded-t-md"
            // Auto focus when opened for quick search, and set focus index
            autoFocus
            tabIndex={0}
          />
          <div className="max-h-40 overflow-y-auto">
            {filtered.map((item) => (
              <button
                key={item}
                onClick={() => onToggle(item)}
                className={`flex justify-between items-center w-full text-left px-3 py-1.5 text-sm transition-colors ${selectedItems.includes(item)
                  ? "bg-primary/20 font-medium text-primary"
                  : "hover:bg-primary/10"
                  }`}
              >
                <span>{item}</span>
                {selectedItems.includes(item) && (
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                onClear();
                onOpen(null); // Close after clearing
              }}
              className="block w-full text-left px-3 py-1.5 text-sm text-base-content/60 border-t border-base-300 hover:bg-base-200 rounded-b-md"
            >
              Bỏ chọn tất cả
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN DASHBOARD COMPONENT ---

export default function FileManagerDashboard() {
  const [activeTab, setActiveTab] = useState("Báo cáo tài liệu");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const PAGE_SIZE = 10;

  // State để quản lý filter nào đang mở (ngăn overlap)
  const [activeFilter, setActiveFilter] = useState(null);

  const departmentItems = useMemo(() => {
    const allDepartments = MOCK_COMPANIES.flatMap((c) => c.departments);
    return [...new Set(allDepartments)].sort();
  }, []);

  const yearItems = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2020 + 1 }, (_, i) => (2020 + i).toString()).reverse();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = MOCK_FILES.filter((f) => {
      if (selectedDepartments.length && !selectedDepartments.includes(f.department)) return false;
      if (selectedTypes.length && !selectedTypes.includes(f.type)) return false;
      if (selectedYears.length && !selectedYears.includes(f.uploadedAt.slice(0, 4))) return false;
      if (q && !(f.title.toLowerCase().includes(q) || f.fileName.toLowerCase().includes(q)))
        return false;
      return true;
    });

    if (sortConfig) {
      result = [...result].sort((a, b) => {
        const { key, direction } = sortConfig;
        const v1 = a[key];
        const v2 = b[key];
        if (v1 < v2) return direction === "asc" ? -1 : 1;
        if (v1 > v2) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [selectedDepartments, selectedTypes, query, sortConfig, selectedYears]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
  };

  const toggleMultiSelect = (setState) => (item) => {
    setState((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
    setPage(1);
  };

  const clearMultiSelect = (setState) => () => {
    setState([]);
    setPage(1);
  };

  const clearFilter = () => {
    setSelectedDepartments([]);
    setSelectedTypes([]);
    setQuery("");
    setPage(1);
    setSelectedYears([]);
  };

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      if (prev.direction === "desc") return null;
    });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key)
      return <Minus size={14} className="text-base-content/30" />;
    if (sortConfig.direction === "asc")
      return <ArrowUp size={14} className="text-primary" />;
    if (sortConfig.direction === "desc")
      return <ArrowDown size={14} className="text-primary" />;
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop();
    switch (ext) {
      case "pdf":
        return <FileText className="text-error" size={18} />;
      case "xlsx":
        return <FileSpreadsheet className="text-success" size={18} />;
      case "docx":
        return <FileType className="text-info" size={18} />;
      default:
        return <FileText className="text-neutral" size={18} />;
    }
  };

  return (
      <main className="p-4 pt-0 space-y-4 w-full max-w-full mx-auto">
            {/* Bộ lọc */}
            <div className="bg-base-200 rounded-xl border border-base-300 shadow-sm p-3 w-full">
              <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <ListFilterPlus className="text-primary" size={18} />
                  <h2 className="font-semibold text-sm">Bộ lọc</h2>
                </div>

                {/* Input tìm kiếm */}
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Tìm kiếm báo cáo..."
                  className="border border-base-300 bg-base-100 px-3 py-1.5 rounded-lg text-sm flex-grow sm:w-auto min-w-[150px] max-w-sm focus:ring-2 focus:ring-primary/30 focus:outline-none shadow-inner"
                />

                {/* Bộ lọc Năm (Multi-select/Tìm kiếm) */}
                <MultiSelectFilter
                  label="Chọn Năm"
                  items={yearItems}
                  selectedItems={selectedYears}
                  onToggle={toggleMultiSelect(setSelectedYears)}
                  onClear={clearMultiSelect(setSelectedYears)}
                  // Logic quản lý trạng thái mở/đóng
                  isActive={activeFilter === 'Chọn Năm'}
                  onOpen={setActiveFilter}
                  className="flex-shrink-0"
                />

                {/* Bộ lọc Phòng ban (Multi-select/Tìm kiếm) */}
                <MultiSelectFilter
                  label="Chọn phòng ban"
                  items={departmentItems}
                  selectedItems={selectedDepartments}
                  onToggle={toggleMultiSelect(setSelectedDepartments)}
                  onClear={clearMultiSelect(setSelectedDepartments)}
                  // Logic quản lý trạng thái mở/đóng
                  isActive={activeFilter === 'Chọn phòng ban'}
                  onOpen={setActiveFilter}
                  className="flex-shrink-0"
                />

                <div className="flex flex-wrap gap-1 flex-grow">
                  {/* Nút chọn FILE_TYPES */}
                  {FILE_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`px-3 py-1 rounded-full border text-xs transition-all duration-150 flex-shrink-0 ${selectedTypes.includes(t)
                        ? "bg-primary text-primary-content border-primary shadow-sm"
                        : "bg-base-100 text-base-content/80 hover:bg-primary/10 border-base-300"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                  <button
                    onClick={clearFilter}
                    className="relative px-4 py-1.5 text-sm bg-base-300/40 rounded-xl p-0.5 shadow-md gap-0.5 mt-1 mb-2 bg-primary font-medium duration-300 text-primary-content disabled:bg-gray-400"
                    disabled={selectedDepartments.length === 0 && selectedTypes.length === 0 && query.trim() === "" && selectedYears.length === 0}
                  >
                    Xoá lọc
                  </button>
              </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className="bg-base-200/50 border border-base-300 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm overflow-x-auto w-full">
              <table className="min-w-full table-auto sm:table-fixed">
                <thead className="bg-base-300/70 text-xs">
                  <tr>
                    {["title", "company", "department", "reporter", "uploadedAt"].map((key) => (
                      <th
                        key={key}
                        className={`px-4 py-2 text-left cursor-pointer select-none ${key === 'title' ? 'w-5/12 min-w-[200px]' : key === 'uploadedAt' ? 'w-2/12 min-w-[100px]' : 'w-2/12 min-w-[120px]'}`}
                        onClick={() => toggleSort(key)}
                      >
                        <div className="flex items-center gap-1 capitalize">
                          {key === "title"
                            ? "Tài liệu"
                            : key === "company"
                              ? "Công ty"
                              : key === "department"
                              ? "Người báo cáo"
                              : key === "reporter"
                                ? "Phòng ban"
                                : "Ngày"}
                          {getSortIcon(key)}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-2 text-center w-1/12 min-w-[100px]">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center opacity-70">
                        Không tìm thấy tài liệu phù hợp
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((f) => (
                      <tr
                        key={f.id}
                        className="hover:bg-primary/5 border-t border-base-300 transition-all"
                      >
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-base-300 flex items-center justify-center rounded-lg shadow-inner flex-shrink-0">
                              {getFileIcon(f.fileName)}
                            </div>
                            <div>
                              <div className="font-medium text-sm truncate">{f.title}</div>
                              <div className="text-xs opacity-70 truncate">{f.fileName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm truncate">{f.company}</td>
                        <td className="px-4 py-2 text-sm truncate">{f.reporter}</td>
                        <td className="px-4 py-2 text-sm truncate">{f.department}</td>
                        <td className="px-4 py-2 text-sm truncate">{f.uploadedAt}</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 rounded-xl bg-base-300 hover:bg-primary/20 transition flex-shrink-0">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 rounded-xl bg-base-300 hover:bg-accent/20 transition flex-shrink-0">
                              <Info size={16} />
                            </button>
                            <button className="p-2 rounded-xl bg-base-300 hover:bg-success/20 transition flex-shrink-0">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-3 flex flex-wrap justify-between items-center border-t border-base-300 text-sm bg-base-200/60 backdrop-blur-sm w-full">
                <div className="mb-2 sm:mb-0">
                  Hiển thị {(page - 1) * PAGE_SIZE + 1} –{" "}
                  {Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border border-base-300 rounded-md hover:bg-base-300/40 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    Prev
                  </button>
                  <div className="px-3 py-1 border border-base-300 rounded-md bg-base-100 shadow-inner">
                    {page}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={page === pageCount}
                    className="px-3 py-1 border border-base-300 rounded-md hover:bg-base-300/40 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
      </main>
  );
}