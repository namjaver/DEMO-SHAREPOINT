import React, { useMemo, useState } from "react";

export default function FilterYear({ onFilter }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  // tạo danh sách năm từ 2020 đến năm hiện tại
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let y = 2020; y <= currentYear; y++) {
      list.push(y);
    }
    return list.reverse();
  }, []);

  const filtered = years.filter((y) =>
    y.toString().toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (year) => {
    setSelected((prev) =>
      prev.includes(year)
        ? prev.filter((i) => i !== year)
        : [...prev, year]
    );
  };

  const handleApply = () => {
    if (onFilter) onFilter(selected);
    setOpen(false);
  };

  const handleClear = () => {
    setSelected([]);
  };

  return (
    <div className="relative w-52">
      {/* Nút mở dropdown */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full border border-base-300 bg-base-100 px-3 py-1.5 rounded-md text-sm hover:bg-base-200/50 transition"
      >
        <span className="truncate">
          {selected.length > 0
            ? selected.join(", ")
            : "Chọn năm"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 opacity-70 transition-transform ${
            open ? "rotate-180" : ""
          }`}
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

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 bg-base-100 border border-base-300 rounded-md shadow-lg w-full">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-1.5 text-sm border-b border-base-300 outline-none bg-base-100"
          />

          <div className="max-h-48 overflow-auto">
            {filtered.map((y) => (
              <label
                key={y}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary/10 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(y)}
                  onChange={() => toggleSelect(y)}
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <span>{y}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-center border-t border-base-300 px-3 py-2">
            <button
              onClick={handleClear}
              className="btn btn-xs btn-ghost text-xs"
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
