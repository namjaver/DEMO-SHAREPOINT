import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BackpackIcon, ExternalLink, Search, StepBackIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LOGO_POWERBI from "../assets/images/LOGO_BI.png";
import LOGO_SALESFORCE from "../assets/images/LOGO_SALESFORCE_2.png";
import LOGO_TABLEAU from "../assets/images/LOGO_TABLEAU.png";
import NODATA from "../assets/images/no_data.png";
import { X } from "lucide-react";

export default function ReportDashboard({ reports, isSalesForce = false, isDTG = false, reportDTG }) {
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

  const filteredDTGReports = useMemo(() => {
    if (!isDTG) return [];

    let data = reportDTG.flatMap(r =>
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
  }, [reportDTG, reportSearchTerm]);

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

  const groupedDTGReports = useMemo(() => {
    const map = {};
    filteredDTGReports.forEach(r => {
      const key = r.BoPhan;
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });
    return map;
  }, [filteredDTGReports]);

  const renderTitle = (title) => {
    return (
      <div className="flex mb-6">
        <div className="card bg-primary shadow-md">
          <div className="card-body p-2 justify-center items-center">
            <h2 className="card-title text-[12px] font-semibold text-primary-content">{title}</h2>
          </div>
        </div>
      </div>
    )
  }

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

        {isDTG && filteredDTGReports && filteredDTGReports.length > 0 && (
          renderTitle("DUYTAN GROUP")
        )}

        {isDTG && filteredDTGReports && filteredDTGReports.length > 0 && (
          Object.entries(groupedDTGReports).map(([category, items]) => (
            <div key={category} className="relative border-2 border-primary/60 rounded-xl p-4 mb-10">
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
            </div>
          ))
        )}

        {
          isSalesForce && (
            <div className="relative border-2 border-[#00a2e1] rounded-xl p-4 mb-10">
              <div className="absolute -top-4 left-6 bg-[#00a2e1] text-primary-content px-4 py-1 rounded-md font-medium shadow-sm text-sm">
                Salesforce (3)
              </div>

              <div className="grid gap-4 mt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer rounded-xl shadow hover:shadow-xl transition-all bg-base-200 relative overflow-hidden"
                  onClick={() => setSelectedReport({ link: 'https://duytanplasticrecycling.lightning.force.com/analytics/dashboard/0FKJ30000004CkDOAU/present', name: "Báo Cáo Kinh Doanh" })}
                >
                  <div className="absolute top-2 left-2 bg-[#00a2e1] text-primary-content text-[10px] px-2 py-0.5 rounded shadow-sm z-10">
                    1
                  </div>
                  <div className="p-4 flex flex-col items-center text-center">
                    <img src={LOGO_SALESFORCE} className="h-14 mb-3 opacity-90 group-hover:opacity-100" />
                    <h3 className="text-sm font-semibold leading-tight mb-1 line-clamp-2">Báo Cáo Kinh Doanh</h3>
                    <div className="text-[11px] text-base-content/60 mb-2 italic">DTR</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1 rounded bg-base-300 w-fit text-center text-[10px] font-medium text-base-content/70">
                    Kinh Doanh
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer rounded-xl shadow hover:shadow-xl transition-all bg-base-200 relative overflow-hidden"
                  onClick={() => setSelectedReport({ link: "https://duytanplasticrecycling.lightning.force.com/analytics/dashboard/0FKJ30000004CLBOA2/present?pageId=1840dfbc-164e-4706-9ad1-6d2aea78a257", name: "Báo Cáo Thu Mua" })}
                >
                  <div className="absolute top-2 left-2 bg-[#00a2e1] text-primary-content text-[10px] px-2 py-0.5 rounded shadow-sm z-10">
                    2
                  </div>
                  <div className="p-4 flex flex-col items-center text-center">
                    <img src={LOGO_SALESFORCE} className="h-14 mb-3 opacity-90 group-hover:opacity-100" />
                    <h3 className="text-sm font-semibold leading-tight mb-1 line-clamp-2">Báo Cáo Thu Mua</h3>
                    <div className="text-[11px] text-base-content/60 mb-2 italic">DTR</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1 rounded bg-base-300 w-fit text-center text-[10px] font-medium text-base-content/70">
                    Thu Mua
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer rounded-xl shadow hover:shadow-xl transition-all bg-base-200 relative overflow-hidden"
                  onClick={() => setSelectedReport({ link: "https://duytanplasticrecycling.lightning.force.com/analytics/dashboard/0FKJ30000004CmYOAU", name: "Báo Cáo Giao Hàng" })}
                >
                  <div className="absolute top-2 left-2 bg-[#00a2e1] text-primary-content text-[10px] px-2 py-0.5 rounded shadow-sm z-10">
                    3
                  </div>
                  <div className="p-4 flex flex-col items-center text-center">
                    <img src={LOGO_SALESFORCE} className="h-14 mb-3 opacity-90 group-hover:opacity-100" />
                    <h3 className="text-sm font-semibold leading-tight mb-1 line-clamp-2">Báo Cáo Giao Hàng</h3>
                    <div className="text-[11px] text-base-content/60 mb-2 italic">DTR</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1 rounded bg-base-300 w-fit text-center text-[10px] font-medium text-base-content/70">
                    Giao Hàng
                  </div>
                </motion.div>
              </div>

            </div>
          )
        }

        {isDTG && filteredReports && filteredReports.length > 0 && (
          renderTitle("DUYTAN HOLDING")
        )}

        {/* Lưới báo cáo */}
        {filteredReports.length > 0 && (
          Object.entries(groupedReports).map(([category, items]) => (
            <div key={category} className="relative border-2 border-primary/60 rounded-xl p-4 mb-10">
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
            </div>
          ))
        )}
        {((isDTG && filteredReports.length === 0 && filteredDTGReports.length === 0) ||
          (!isDTG && filteredReports.length === 0)) && (
            <div className="min-h-[250px] flex flex-col items-center justify-center select-none">
              <img src={NODATA} alt="No Data" className="max-w-[30%] h-auto opacity-90" />
              <p className="text-gray-500 text-sm">Không có dữ liệu</p>
            </div>
          )}

        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="relative w-full h-full bg-base-100">
              <button
                onClick={() => setSelectedReport(null)}
                className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow hover:bg-base-300 transition hover:text-primary"
              >
                <StepBackIcon className="w-4 h-4" />
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
    </div>
  );
}
