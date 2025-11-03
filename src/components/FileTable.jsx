// File: FileTable.jsx
import React from "react";
import {
  Eye,
  Download,
  Minus,
  ArrowUp,
  ArrowDown,
  FileText,
} from "lucide-react";

import EXCEL from "../assets/images/MS_EXCEL.png";
import PP from "../assets/images/MS_PP.png";
import WORD from "../assets/images/MS_WORD.png";

export default function FileTable({
  pageItems,
  toggleSort,
  sortConfig,
  isDTG = false,
  children
}) {
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
        return <img src={PP} className="text-error" />;
      case "xlsx":
        return <img src={EXCEL} className="text-success" />;
      case "docx":
        return <img src={WORD} className="text-info" />;
      default:
        return <FileText className="text-neutral" />;
    }
  };

  const columnNameData = isDTG
    ? ["stt", "title", "company", "department", "reporter", "uploadedAt"]
    : ["stt", "title", "department", "reporter", "uploadedAt"];

  return (
    <div className="bg-base-200/50 border border-base-300 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm overflow-x-auto w-full">
      <table className="min-w-full table-auto sm:table-fixed">
        <thead className="bg-base-300/70 text-xs">
          <tr>
            {columnNameData.map((key) => (
              <th
                key={key}
                className={`px-4 py-2 text-left cursor-pointer select-none ${key === "stt"
                    ? "w-[60px] min-w-[60px] text-center"
                    : key === "title"
                      ? "w-5/12 min-w-[200px]"
                      : key === "uploadedAt"
                        ? "w-2/12 min-w-[100px]"
                        : "w-2/12 min-w-[120px]"
                  }`}
                onClick={() => key !== "stt" && toggleSort(key)}
              >
                <div
                  className={`flex items-center gap-1 capitalize ${key === "stt" ? "justify-center" : ""
                    }`}
                >
                  {key === "stt"
                    ? "STT"
                    : key === "title"
                      ? "Tài liệu"
                      : key === "company"
                        ? "Công ty"
                        : key === "department"
                          ? "Người báo cáo"
                          : key === "reporter"
                            ? "Phòng ban"
                            : "Ngày"}
                  {key !== "stt" && getSortIcon(key)}
                </div>
              </th>
            ))}
            <th className="px-4 py-2 text-center w-1/12 min-w-[100px]">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {pageItems.length === 0 ? (
            <tr>
              <td colSpan={columnNameData.length + 1} className="p-6 text-center opacity-70">
                Không tìm thấy tài liệu phù hợp
              </td>
            </tr>
          ) : (
            pageItems.map((f, index) => (
              <tr
                key={f.id}
                className="hover:bg-primary/5 border-t border-base-300 transition-all"
              >
                {/* ✅ Cột STT */}
                <td className="px-4 py-2 text-center text-sm font-medium">
                  {index + 1}
                </td>

                {/* ✅ Giữ nguyên UI các cột khác */}
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0">
                      {getFileIcon(f.fileName)}
                    </div>
                    <div>
                      <div className="font-medium text-sm truncate">
                        {f.title}
                      </div>
                      <div className="text-xs opacity-70 truncate">
                        {f.fileName}
                      </div>
                    </div>
                  </div>
                </td>

                {isDTG && (
                  <td className="px-4 py-2 text-sm truncate">{f.company}</td>
                )}
                <td className="px-4 py-2 text-sm truncate">{f.reporter}</td>
                <td className="px-4 py-2 text-sm truncate">{f.department}</td>
                <td className="px-4 py-2 text-sm truncate">{f.uploadedAt}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded-xl bg-base-300 hover:bg-primary/20 transition flex-shrink-0">
                      <Eye size={16} />
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
      {children && <div className="border-t border-base-300">{children}</div>}
    </div>
  );
}
