import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LOGO_POWERBI from "../assets/images/LOGO_BI.png";
import LOGO_SALESFORCE from "../assets/images/LOGO_SALESFORCE_2.png";
import LOGO_TABLEAU from "../assets/images/LOGO_TABLEAU.png";
import NODATA from "../assets/images/no_data.png";
import { X } from "lucide-react";

export default function ReportDashboard({ reports }) {
  const [reportSearchTerm, setReportSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    let data = reports.flatMap(r =>
      r.DanhSachBaoCaoModel.map(bc => ({
        ...bc,
        BoPhan: r.BoPhan,
        Color: r.Color,
        Picture: r.Picture || bc.Picture,
        GroupBaoCao: r.BoPhan // Giữ nguyên cách GroupBaoCao theo BoPhan
      }))
    );

    if (reportSearchTerm) {
      data = data.filter(r =>
        r.Ten.toLowerCase().includes(reportSearchTerm.toLowerCase())
      );
    }

    return data;
  }, [reports, reportSearchTerm]);

  // Group báo cáo theo BoPhan
  const groupedReports = useMemo(() => {
    const map = {};
    filteredReports.forEach(r => {
      const key = r.BoPhan;
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });
    return map;
  }, [filteredReports]);

  return (
    <div className="min-h-screen bg-base-100 pb-10 px-6 flex gap-6">
      {/* === SIDEBAR === */}

      {/* === MAIN GRID (Phần này giữ nguyên) === */}
      <div className="flex-1">
        {/* Thanh tìm kiếm báo cáo */}
        <div className="flex justify-end mb-3">
          <div className="relative w-full max-w-xs m-2">
            <Search size={18} className="absolute left-3 top-2.5 text-base-content/50" />
            <input
              type="text"
              placeholder="Tìm kiếm báo cáo..."
              className="input input-bordered input-sm w-full pl-9 rounded-full"
              value={reportSearchTerm}
              onChange={e => setReportSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lưới báo cáo */}
        {filteredReports.length > 0 ? (
          Object.entries(groupedReports).map(([category, items]) => (
            <div key={category} className="relative border-2 border-primary/60 rounded-xl p-4 mt-10">
              <div className="absolute -top-4 left-6 bg-primary text-primary-content px-4 py-1 rounded-md font-medium shadow-sm text-sm">
                {category} ({items.length})
              </div>

              <div className="grid gap-4 mt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {items.map(report => (
                  <motion.div
                    key={report.BaoCaoId}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer rounded-xl shadow hover:shadow-xl transition-all bg-base-200 relative overflow-hidden"
                    onClick={() => setSelectedReport({ link: report.Link, name: report.Ten })}
                  >
                    <div className="absolute top-2 left-2 bg-primary text-primary-content text-[10px] px-2 py-0.5 rounded shadow-sm z-10">
                      {report.BaoCaoId}
                    </div>
                    <div className={`h-1.5 w-full bg-gradient-to-r ${report.Color}`} />
                    <div className="p-4 flex flex-col items-center text-center">
                      <img src={LOGO_TABLEAU} className="w-14 h-14 mb-3 opacity-90 group-hover:opacity-100" />
                      <h3 className="text-sm font-semibold leading-tight mb-1 line-clamp-2">{report.Ten}</h3>
                      <div className="text-[11px] text-base-content/60 mb-2 italic">{report.NguoiKiemSoat}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-1 rounded bg-base-300 w-fit text-center text-[10px] font-medium text-base-content/70">
                      {report.MaHienThi}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* MODAL FULL VIEW (giữ nguyên) */}
              {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                  <div className="relative w-full h-full bg-base-100">
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow hover:bg-base-300 transition hover:text-primary"
                    >
                      <X className="w-4 h-4" />
                      Quay lại
                    </button>
                    <iframe
                      src={selectedReport.link}
                      title={selectedReport.name}
                      className="w-full h-full border-none"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="min-h-[250px] flex flex-col items-center justify-center select-none">
            <img src={NODATA} alt="No Data" className="max-w-[40%] h-auto mb-4 opacity-90" />
            <p className="text-gray-500 text-sm">Không có dữ liệu</p>
          </div>
        )}
      </div>
    </div>
  );
}
