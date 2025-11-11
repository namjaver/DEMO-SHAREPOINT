// File: FileManagerDashboard.jsx
import React, { useMemo, useState } from "react";
import { MOCK_COMPANIES, MOCK_FILES, FILE_TYPES } from "../data/makeFile";
import FilterPanel from "./FilePanel";
import FileTable from "./FileTable";
import Pagination from "./Pagination";

export default function FileManagerDashboard({ isDTG = false }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const PAGE_SIZE = 13;

  const departmentItems = useMemo(() => {
    const allDepartments = MOCK_COMPANIES.flatMap((c) => c.departments);
    return [...new Set(allDepartments)].sort();
  }, []);

  const companyItems = useMemo(() => MOCK_COMPANIES.map(c => c.name).sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MOCK_FILES.filter(f => {
      // Công ty
      if (selectedCompanies.length && !selectedCompanies.includes(f.company))
        return false;

      // Phòng ban
      if (selectedDepartments.length && !selectedDepartments.includes(f.department))
        return false;

      // Loại file
      if (selectedTypes.length && !selectedTypes.includes(f.type))
        return false;

      // Thời gian
      if (selectedTime.length) {
        const uploadedDate = new Date(f.uploadedAt);
        const year = uploadedDate.getFullYear().toString();
        const month = `Tháng ${uploadedDate.getMonth() + 1}`;
        const quarter = `Q${Math.ceil((uploadedDate.getMonth() + 1) / 3)}`;
        const week = `Tuần ${Math.ceil((uploadedDate - new Date(`${year}-01-01`)) / 86400000 / 7 + 1)}`;

        const match = selectedTime.some(t => t === year || t === month || t === quarter || t === week);
        if (!match) return false;
      }

      // Search
      if (q && !(f.title.toLowerCase().includes(q) || f.fileName.toLowerCase().includes(q)))
        return false;

      return true;
    }).sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [selectedDepartments, selectedTypes, query, sortConfig, selectedTime, selectedCompanies]);


  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
  };

  const clearFilter = () => {
    setSelectedDepartments([]);
    setSelectedCompanies([]);
    setSelectedTypes([]);
    setQuery("");
    setSelectedTime([]);
    setPage(1);
  };


  const toggleSort = (key, direction) => {
    setSortConfig((prev) => {
      if (!direction) return { key: null, direction: null }; // reset khi null

      if (prev.key === key && prev.direction === direction) {
        return { key: null, direction: null }; // toggle off
      }

      return { key, direction }; // set mới
    });
  };
  return (
    <main className="p-4 pt-0 space-y-4 w-full max-w-full mx-auto">
      {/* <div className="flex flex-wrap gap-2 items-center">
        <FilterPanel
          query={query}
          setQuery={setQuery}
          departmentItems={departmentItems}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          FILE_TYPES={FILE_TYPES}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
          clearFilter={clearFilter}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          companyItems={companyItems}
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies}
          isDTG={isDTG}
        />
      </div> */}

      <FileTable
        pageItems={pageItems}
        toggleSort={toggleSort}
        sortConfig={sortConfig}
        isDTG={isDTG}
      >
        <Pagination
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          filteredLength={filtered.length}
          PAGE_SIZE={PAGE_SIZE}
        />
      </FileTable>


    </main>
  );
}
