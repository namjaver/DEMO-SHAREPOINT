// File: FilterPanel.jsx
import React from "react";
import { BarChart3, FileText, ListFilterPlus } from "lucide-react";
import MultiSelectFilter from "./MultiSelectFilter";
import TimeStepDropdown from "./TimeFilterDropdown";

export default function FilterPanel({
  query,
  setQuery,
  departmentItems,
  selectedDepartments,
  setSelectedDepartments,
  selectedTypes,
  clearFilter,
  activeFilter,
  setActiveFilter,
  setSelectedTime,
  selectedTime,
  companyItems,
  selectedCompanies,
  setSelectedCompanies,
  isDTG = false,
}) {
  const toggleMultiSelect = (setState) => (item) => {
    setState((prev) =>
      prev.includes(item)
        ? prev.filter((t) => t !== item)
        : [...prev, item]
    );
  };

  const clearMultiSelect = (setState) => () => setState([]);

  function ReportButtons() {
    const reports = [
      {
        label: "Báo cáo thường niên 2025",
        icon: <FileText className="w-5 h-5" />,
        link: "/bao-cao-thuong-nien-2025",
      },
      {
        label: "Báo cáo tài chính quý 4/2025",
        icon: <BarChart3 className="w-5 h-5" />,
        link: "/bao-cao-tai-chinh-q4-2025",
      },
    ];

    return (
      <div className="flex flex-wrap gap-3 justify-center items-center py-1">
        {reports.map((report, index) => (
          <a
            key={index}
            href={report.link}
            className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-xl shadow-md hover:bg-primary/90 hover:scale-[1.03] transition-all duration-300 text-sm sm:text-base uppercase"
          >
            {report.icon}
            {report.label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-xl border border-base-300 shadow-sm p-1 px-2 w-full">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex gap-x-3 gap-y-2">
          {/* --- Tiêu đề --- */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <ListFilterPlus className="text-primary" size={18} />
            <h2 className="font-semibold text-sm">Bộ lọc</h2>
          </div>

          {/* 🔍 Ô tìm kiếm */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm báo cáo..."
            className="border border-base-300 bg-base-100 px-3 py-1.5 rounded-lg text-sm flex-grow sm:w-auto min-w-[150px] max-w-sm focus:ring-2 focus:ring-primary/30 focus:outline-none shadow-inner"
          />

          {/* 🗓 Bộ lọc thời gian */}
          <TimeStepDropdown
            value={selectedTime}
            onChange={setSelectedTime}
          />

          {/* 📄 Loại công ty */}
          {isDTG && <MultiSelectFilter
            label="Công ty"
            items={companyItems}
            selectedItems={selectedCompanies}
            onToggle={toggleMultiSelect(setSelectedCompanies)}
            onClear={clearMultiSelect(setSelectedCompanies)}
            isActive={activeFilter === "Công ty"}
            onOpen={setActiveFilter}
          />}

          {/* 🏢 Phòng ban */}
          <MultiSelectFilter
            label="Chọn phòng ban"
            items={departmentItems}
            selectedItems={selectedDepartments}
            onToggle={toggleMultiSelect(setSelectedDepartments)}
            onClear={clearMultiSelect(setSelectedDepartments)}
            isActive={activeFilter === "Chọn phòng ban"}
            onOpen={setActiveFilter}
          />
          {/* ❌ Nút xoá lọc */}
          <button
            onClick={clearFilter}
            className="px-4 py-1.5 text-sm bg-primary rounded-xl font-medium text-primary-content shadow-md hover:opacity-90 duration-200 disabled:bg-gray-400"
            disabled={
              (selectedDepartments?.length ?? 0) === 0 &&
              (selectedTypes?.length ?? 0) === 0 &&
              query.trim() === "" &&
              (!selectedTime || selectedTime.length === 0)
              && (!selectedCompanies || (selectedCompanies?.length ?? 0)) === 0
            }
          >
            Xoá lọc
          </button>
        </div>
        <ReportButtons />
      </div>
    </div>
  );
}
