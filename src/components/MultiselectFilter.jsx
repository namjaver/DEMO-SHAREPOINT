import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

function MultiSelectFilter({
  label,
  items,
  selectedItems,
  onToggle,
  onClear,
  className = "",
  isActive,
  onOpen,
}) {
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Reset search khi dropdown đóng
  useEffect(() => {
    if (!isActive) setSearch("");
  }, [isActive]);

  // Filter items theo search
  const filtered = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const displayLabel = useMemo(() => {
    if (selectedItems.length === 0) return label;
    if (selectedItems.length === 1) return selectedItems[0];
    return `${selectedItems.length} mục đã chọn`;
  }, [selectedItems, label]);

  const handleToggleItem = useCallback(
    (item) => onToggle(item),
    [onToggle]
  );

  const handleBlur = useCallback(
    (e) => {
      if (!dropdownRef.current.contains(e.relatedTarget)) {
        onOpen(null);
      }
    },
    [onOpen]
  );

  // Chọn tất cả / bỏ chọn tất cả
  const handleSelectAll = useCallback(() => {
    if (selectedItems.length === items.length) {
      onClear();
    } else {
      items.forEach((item) => {
        if (!selectedItems.includes(item)) onToggle(item);
      });
    }
  }, [items, selectedItems, onToggle, onClear]);

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <div
      className={`relative w-40 ${className}`}
      ref={dropdownRef}
      onBlur={handleBlur}
    >
      {/* Button mở dropdown */}
      <button
        onClick={() => onOpen(isActive ? null : label)}
        className="flex items-center justify-between w-full border border-base-300 bg-base-100 px-3 py-1.5 rounded-lg text-sm hover:bg-base-200/50 transition shadow-inner"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isActive}
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

      {/* Dropdown */}
      {isActive && (
        <div
          className="absolute z-30 mt-1 bg-base-100 border border-base-300 rounded-md shadow-lg w-full max-w-xs sm:w-56 right-0 sm:left-0"
          role="listbox"
        >
          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-1.5 text-sm border-b border-base-300 outline-none bg-base-100 rounded-t-md"
            autoFocus
            tabIndex={0}
          />

          {/* Chọn tất cả */}
          <label
            className="flex items-center gap-2 px-3 py-1.5 border-b border-base-300 cursor-pointer text-sm"
            onMouseDown={(e) => {
              e.preventDefault();
              handleSelectAll();
            }}
          >
            <input
              type="checkbox"
              checked={allSelected}
              readOnly
              className="accent-primary"
            />
            <span>Chọn tất cả</span>
          </label>

          {/* Danh sách item */}
          <div className="max-h-40 overflow-y-auto">
            {filtered.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm px-3 py-1.5 hover:bg-base-200 rounded cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault(); // ngăn dropdown đóng
                  handleToggleItem(item);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  readOnly
                  className="accent-primary"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelectFilter;
