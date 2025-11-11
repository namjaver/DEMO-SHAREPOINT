// File: FileTable.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Eye,
  Download,
  Minus,
  ArrowUp,
  ArrowDown,
  FileText,
  ChevronDown,
  X,
  Filter,
} from "lucide-react";

import EXCEL from "../assets/images/MS_EXCEL.png";
import PP from "../assets/images/MS_PP.png";
import WORD from "../assets/images/MS_WORD.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";
import {
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subYears,
  addMonths,
  format,
} from "date-fns";
/**
 * FileTable with improved thead dropdown popover UI:
 * - Popover is positioned relative to table container (measured on click)
 * - Popover width matches at least the column width (or a minWidth)
 * - Small triangle (caret), shadow, rounded, fade+scale animation
 * - Closes when clicking outside or when resizing/scrolling
 */

export default function FileTable({
  pageItems = [],
  toggleSort,
  sortConfig,
  children,
}) {
  const [activeFilter, setActiveFilter] = useState(null); // key string or null
  const [popoverStyle, setPopoverStyle] = useState(null); // { left, top, width }
  const [searchTerms, setSearchTerms] = useState({});
  const containerRef = useRef(null);
  const [dateListMode, setDateListMode] = useState("calendar");
  // 'month' | 'quarter' | 'year' | 'calendar'
  const [viewRestrict, setViewRestrict] = useState({ from: undefined, to: undefined });
  // Close when clicking outside container
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveFilter(null);
      }
    };
    const onResize = () => setActiveFilter(null);
    window.addEventListener("mousedown", onDocClick);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true); // close if parent scrolls
    return () => {
      window.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, []);

  const handleHeaderClick = (key, e) => {
    if (key === "stt") return;

    const thEl = e.currentTarget;
    const container = containerRef.current;

    if (!thEl || !container) {
      setActiveFilter(key);
      setPopoverStyle(null);
      return;
    }

    const thRect = thEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    const minWidth = 260;
    const width = Math.max(minWidth, thRect.width);

    // Tính left
    let left = thRect.left - containerRect.left;
    left = Math.min(left, containerRect.width - width - 12);
    left = Math.max(left, 12);

    // Tính top — nếu popover hiển thị xuống dưới bị tràn → hiển thị lên trên
    const popoverHeight = 320; // chiều cao ước lượng của popover (DatePicker)
    let top = thRect.bottom - containerRect.top + 8;

    if (thRect.bottom + popoverHeight > viewHeight - 16) {
      top = thRect.top - containerRect.top - popoverHeight - 8;
    }

    setPopoverStyle({ left, top, width });
    setActiveFilter(key);
  };



  const handleSearchChange = (key, value) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value.toLowerCase() }));
  };

  const clearFilter = (key) => {
    setSearchTerms((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const normalizeDate = (d) => {
    if (!d) return null;
    const nd = new Date(d);
    nd.setHours(0, 0, 0, 0);
    return nd;
  };

  const filteredItems = useMemo(() => {
    return pageItems.filter((item) => {
      return Object.keys(searchTerms).every((key) => {
        // Lọc theo range ngày
        if (key === "uploadedAt" && searchTerms.uploadedAt) {
          const { start, end } = searchTerms.uploadedAt;
          if (!start && !end) return true;

          const itemDate = normalizeDate(item.uploadedAt);
          const startDate = normalizeDate(start);
          const endDate = normalizeDate(end);

          if (startDate && itemDate < startDate) return false;
          if (endDate && itemDate > endDate) return false;

          return true;
        }

        // Lọc text (các field khác)
        const search = (searchTerms[key] || "").toString().trim();
        if (!search) return true;

        const value = (item[key] || "").toString().toLowerCase();
        return value.includes(search.toLowerCase());
      });
    });
  }, [pageItems, searchTerms]);


  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key)
      return null;
    if (sortConfig.direction === "asc")
      return <ArrowUp size={14} className="text-primary" />;
    if (sortConfig.direction === "desc")
      return <ArrowDown size={14} className="text-primary" />;
    return null;
  };

  const getFileIcon = (fileName) => {
    const ext = (fileName || "").split(".").pop();
    switch (ext) {
      case "pdf":
        return <img src={PP} alt="pdf" className="w-5 h-5" />;
      case "xlsx":
      case "xls":
        return <img src={EXCEL} alt="excel" className="w-5 h-5" />;
      case "docx":
      case "doc":
        return <img src={WORD} alt="word" className="w-5 h-5" />;
      default:
        return <FileText className="text-neutral" />;
    }
  };

  const columnNameData = ["stt", "title", "reporter", "uploadedAt"];

  const getColumnLabel = (key) => {
    switch (key) {
      case "stt":
        return "STT";
      case "title":
        return "Tiêu đề";
      case "company":
        return "Công ty";
      case "department":
        return "Phòng ban";
      case "reporter":
        return "Báo cáo bởi";
      case "uploadedAt":
        return "Thời gian";
      default:
        return key;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-base-200/50 border border-base-300 rounded-xl shadow-lg overflow-visible backdrop-blur-sm w-full"
    >
      <table className="min-w-full table-auto sm:table-fixed overflow-x-auto min-h-96">
        <thead className="bg-base-300/70 text-xs">
          <tr>
            {columnNameData.map((key) => (
              <th
                key={key}
                className={`px-4 py-2 text-center select-none ${key === "stt" ? "w-[20px]" : ""}`}
                // pass click event so we can measure th
                onClick={(e) => handleHeaderClick(key, e)}
              >
                <div className={`flex items-center justify-between`}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span className="capitalize">{getColumnLabel(key)}</span>
                    {key !== "stt" && (
                      <span className="flex items-center gap-1">
                        {getSortIcon(key)}
                        <ChevronDown size={14} className={`transition-transform ${activeFilter === key ? "rotate-180" : ""}`} />
                      </span>
                    )}
                  </div>
                </div>
              </th>
            ))}
            <th className="px-4 py-2 text-center w-1/12 min-w-[100px]">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan={columnNameData.length + 1} className="p-6 text-center opacity-70">
                Không tìm thấy tài liệu phù hợp
              </td>
            </tr>
          ) : (
            filteredItems.map((f, idx) => (
              <tr key={f.id ?? idx} className="hover:bg-primary/5 border-t border-base-300 transition-all">
                <td className="px-4 py-2 text-sm font-medium">{idx + 1}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0">
                      {getFileIcon(f.fileName)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{f.title}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-2 text-sm truncate">{f.reporter}</td>
                <td className="px-4 py-2 text-sm truncate">{f.uploadedAt}</td>

                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded-xl bg-base-300 hover:bg-primary/20 transition">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-xl bg-base-300 hover:bg-success/20 transition">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Popover rendered once, positioned by popoverStyle */}
      {activeFilter && popoverStyle && (
        <div
          style={{
            position: "absolute",
            left: activeFilter !== 'uploadedAt' ? popoverStyle.left : 'unset',
            top: popoverStyle.top,
            width: activeFilter === 'uploadedAt' ? 'fit-content' : popoverStyle.width,
            zIndex: 60,
            transformOrigin: "top center",
            right: activeFilter === 'uploadedAt' ? 12 : 'unset',
          }}
          className="pointer-events-auto"
        >
          {/* caret */}
          <div style={{ position: "absolute", left: 16, top: -8, width: 0, height: 0 }} aria-hidden>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L16 8H0L8 0Z" fill="var(--b3)" />
            </svg>
          </div>

          <div
            className="rounded-lg border border-base-300 bg-base-100 shadow-lg p-3"
            style={{
              // animation: fade + scale
              transition: "transform 150ms ease, opacity 150ms ease",
              transform: "scale(1)",
              opacity: 1,
            }}
          >
            <div className="flex flex-col gap-2">
              {activeFilter === "uploadedAt" ? (
                <div className="flex flex-col gap-3">

                  {/* Buttons: Month / Quarter / Year / Calendar */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`btn btn-xs ${dateListMode === "month" ? "btn-primary" : "btn-ghost"}`}
                      onClick={() => {
                        setDateListMode("month");
                        setViewRestrict({ from: undefined, to: undefined });
                      }}
                    >
                      Tháng
                    </button>
                    <button
                      type="button"
                      className={`btn btn-xs ${dateListMode === "quarter" ? "btn-primary" : "btn-ghost"}`}
                      onClick={() => {
                        setDateListMode("quarter");
                        setViewRestrict({ from: undefined, to: undefined });
                      }}
                    >
                      Quý
                    </button>
                    <button
                      type="button"
                      className={`btn btn-xs ${dateListMode === "year" ? "btn-primary" : "btn-ghost"}`}
                      onClick={() => {
                        setDateListMode("year");
                        setViewRestrict({ from: undefined, to: undefined });
                      }}
                    >
                      Năm
                    </button>
                  </div>
                  {/* CONTENT: month / quarter / year lists OR calendar */}
                  <div className="w-full">
                    {dateListMode === "month" && (
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 12 }).map((_, i) => {
                          const now = new Date();
                          const monthDate = addMonths(new Date(now.getFullYear(), 0, 1), i); // month i
                          const start = startOfMonth(monthDate);
                          const end = endOfMonth(monthDate);
                          const label = format(monthDate, "M", { locale: vi }); // tên tháng bằng tiếng Việt
                          const isActive =
                            searchTerms?.uploadedAt?.start &&
                            startOfMonth(new Date(searchTerms.uploadedAt.start)).getMonth() === start.getMonth() &&
                            new Date(searchTerms.uploadedAt.start).getFullYear() === start.getFullYear();
                          return (
                            <button
                              key={i}
                              type="button"
                              className={`btn btn-sm text-left ${isActive ? "btn-primary" : "btn-outline"} w-full`}
                              onClick={() => {
                                setSearchTerms((prev) => ({
                                  ...prev,
                                  uploadedAt: { start, end },
                                }));
                                // set view restrict so calendar focuses to that month if needed
                                setViewRestrict({ from: start, to: end });
                              }}
                            >
                              <div className="text-xs">Tháng {label}</div>
                              <div className="text-[11px] opacity-70">{format(start, "yyyy")}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {dateListMode === "quarter" && (
                      <div className="flex flex-col gap-2">
                        {[1, 2, 3, 4].map((q) => {
                          // compute quarter start/end for current year
                          const year = new Date().getFullYear();
                          const qStart = startOfQuarter(new Date(year, (q - 1) * 3, 1));
                          const qEnd = endOfQuarter(new Date(year, (q - 1) * 3, 1));
                          const label = `Qúy ${q} ${year}`;
                          const isActive =
                            searchTerms?.uploadedAt?.start &&
                            startOfQuarter(new Date(searchTerms.uploadedAt.start)).getMonth() === qStart.getMonth() &&
                            new Date(searchTerms.uploadedAt.start).getFullYear() === year;
                          return (
                            <button
                              key={q}
                              type="button"
                              className={`btn btn-sm w-full flex justify-between ${isActive ? "btn-primary" : "btn-outline"}`}
                              onClick={() => {
                                setSearchTerms((prev) => ({
                                  ...prev,
                                  uploadedAt: { start: qStart, end: qEnd },
                                }));
                                // restrict calendar to quarter months
                                setViewRestrict({ from: qStart, to: qEnd });
                              }}
                            >
                              <div className="text-sm">{label}</div>
                              <div className="text-xs opacity-60">{`${format(qStart, "dd/MM")} → ${format(qEnd, "dd/MM")}`}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {dateListMode === "year" && (
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 10 }).map((_, idx) => {
                          const year = new Date().getFullYear() - idx;
                          const yStart = startOfYear(new Date(year, 0, 1));
                          const yEnd = endOfYear(new Date(year, 11, 31));
                          const isActive =
                            searchTerms?.uploadedAt?.start &&
                            new Date(searchTerms.uploadedAt.start).getFullYear() === year;
                          return (
                            <button
                              key={year}
                              type="button"
                              className={`btn btn-sm w-full flex justify-between ${isActive ? "btn-primary" : "btn-outline"}`}
                              onClick={() => {
                                setSearchTerms((prev) => ({
                                  ...prev,
                                  uploadedAt: { start: yStart, end: yEnd },
                                }));
                                setViewRestrict({ from: yStart, to: yEnd });
                              }}
                            >
                              <div className="text-sm">{year}</div>
                              <div className="text-xs opacity-60">{`${format(yStart, "dd/MM/yyyy")} → ${format(yEnd, "dd/MM/yyyy")}`}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {dateListMode === "calendar" && (
                      <div className="popover-calendar-container">
                        <DayPicker
                          mode="range"
                          locale={vi}
                          selected={{
                            from: searchTerms?.uploadedAt?.start || undefined,
                            to: searchTerms?.uploadedAt?.end || undefined,
                          }}
                          onSelect={(range) => {
                            setSearchTerms((prev) => ({
                              ...prev,
                              uploadedAt: { start: range?.from || null, end: range?.to || null },
                            }));
                            // clear view restriction if user picks manually
                            setViewRestrict({ from: undefined, to: undefined });
                          }}
                          showOutsideDays
                          numberOfMonths={1}
                          captionLayout="dropdown"
                          fromMonth={viewRestrict?.from}
                          toMonth={viewRestrict?.to}
                          className="rdp-custom"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* existing input block */
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerms[activeFilter] || ""}
                  onChange={(e) => handleSearchChange(activeFilter, e.target.value)}
                  className="input input-sm input-bordered w-full text-sm"
                />
              )}


              <div className="flex gap-2">
                <button
                  onClick={() => toggleSort?.(activeFilter, "asc")}
                  className={`btn btn-xs w-full justify-center gap-1 flex-1 ${sortConfig?.key === activeFilter && sortConfig?.direction === "asc"
                    ? "btn-primary"
                    : ""
                    }`}

                >
                  <ArrowUp size={12} /> A to Z
                </button>
                <button
                  onClick={() => toggleSort?.(activeFilter, "desc")}
                  className={`btn btn-xs w-full justify-center gap-1 flex-1 ${sortConfig?.key === activeFilter && sortConfig?.direction === "desc"
                    ? "btn-primary"
                    : ""
                    }`}
                >
                  <ArrowDown size={12} /> Z to A
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { clearFilter(activeFilter); toggleSort?.(activeFilter, null); }} className="btn btn-ghost btn-xs text-error w-full justify-center gap-1 flex-1">
                  <Filter size={12} /> Xoá bộ lọc
                </button>
                <button onClick={() => setActiveFilter(null)} className="btn btn-primary btn-xs w-full justify-center gap-1 flex-1">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {children && <div className="border-t border-base-300">{children}</div>}
    </div>
  );
}
