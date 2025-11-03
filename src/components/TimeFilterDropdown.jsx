import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export default function TimeStepDropdown({ value = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const dropdownRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const TIME_GROUPS = {
    Năm: Array.from({ length: 10 }, (_, i) => (currentYear - i).toString()),
    Quý: ["Q1", "Q2", "Q3", "Q4"],
    Tháng: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
    Tuần: Array.from({ length: 52 }, (_, i) => `Tuần ${i + 1}`),
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setStep(1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Chọn loại thời gian
  const handleSelectType = (type) => {
    if (selectedType !== type) {
      setSelectedValues([]);
      onChange?.([]);
    }
    setSelectedType(type);
    setStep(2);
  };

  // Toggle giá trị
  const handleToggleValue = (item) => {
    const newValues = selectedValues.includes(item)
      ? selectedValues.filter((v) => v !== item)
      : [...selectedValues, item];
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  // Chọn tất cả
  const handleSelectAll = () => {
    const allItems = TIME_GROUPS[selectedType] || [];
    const allSelected = selectedValues.length === allItems.length;
    const newValues = allSelected ? [] : allItems;
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  // Xoá lọc
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedType("");
    setSelectedValues([]);
    onChange?.([]);
  };

  const currentItems = TIME_GROUPS[selectedType] || [];

  // Label hiển thị
  const displayLabel = selectedValues.length === 0
    ? "Chọn khoảng thời gian"
    : `${selectedType}: ${
        selectedValues.length > 2
          ? `${selectedValues.length} mục`
          : selectedValues.join(", ")
      }`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between border border-base-300 bg-base-100 rounded-lg px-3 py-1.5 text-sm min-w-[230px] shadow-sm hover:bg-base-200 transition"
      >
        <span className="truncate text-left">{displayLabel}</span>
        <div className="flex items-center gap-1">
          {selectedValues.length > 0 && (
            <X
              size={14}
              className="text-gray-400 hover:text-error"
              onClick={handleClear}
            />
          )}
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-[260px] overflow-hidden">
          {step === 1 && (
            <div className="p-2 grid grid-cols-2 gap-2">
              {Object.keys(TIME_GROUPS).map((type) => (
                <button
                  key={type}
                  className={`px-3 py-2 text-sm border rounded-md transition ${
                    selectedType === type
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-base-300 hover:bg-primary/5"
                  }`}
                  onClick={() => handleSelectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col max-h-[200px] overflow-y-auto p-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-gray-500 hover:underline justify-start p-2"
              >
                ← Quay lại
              </button>

              <div className="flex items-center mb-2 px-1">
                <input
                  type="checkbox"
                  checked={currentItems.length > 0 && selectedValues.length === currentItems.length}
                  onChange={handleSelectAll}
                  className="mr-2 accent-primary"
                />
                <span className="text-sm font-medium">Chọn tất cả</span>
              </div>

              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm px-1 py-0.5 hover:bg-base-200 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(item)}
                      onChange={() => handleToggleValue(item)}
                      className="accent-primary"
                    />
                    <span>{item}</span>
                  </label>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-400 text-sm">
                  Không có dữ liệu
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
