import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LOGO_POWERBI from "../assets/images/LOGO_BI.png";
import LOGO_SALESFORCE from "../assets/images/LOGO_SALESFORCE_2.png";
import LOGO_TABLEAU from "../assets/images/LOGO_TABLEAU.png";
import { X } from "lucide-react";

const reports = [
    {
        id: 1,
        title: "Doanh thu theo khu vực",
        platform: "Power BI",
        logo: LOGO_POWERBI,
        description: "Phân tích doanh thu và xu hướng theo từng khu vực trên toàn quốc.",
        link: "https://app.powerbi.com/reportEmbed?reportId=fe89b25b-346e-47d7-affd-070886a9a96e&autoAuth=true&ctid=00b9a165-4467-4156-b58f-75ccba478fa9",
        color: "from-yellow-400 to-yellow-600",
    },
    {
        id: 2,
        title: "Hiệu suất bán hàng theo tháng",
        platform: "Salesforce",
        logo: LOGO_SALESFORCE,
        description: "Tổng hợp dữ liệu CRM và doanh thu thực tế để đánh giá hiệu suất nhân viên.",
        link: "#",
        color: "from-blue-400 to-blue-600",
    },
    {
        id: 3,
        title: "Dự báo chi phí vận hành Q4",
        platform: "Tableau",
        logo: LOGO_TABLEAU,
        description: "Theo dõi và dự báo chi phí vận hành so với ngân sách dự kiến.",
        link: "#",
        color: "from-orange-400 to-pink-500",
    },
    {
        id: 4,
        title: "Tỷ lệ chuyển đổi chiến dịch Marketing",
        platform: "Looker Studio",
        logo: LOGO_TABLEAU,
        description: "Phân tích tỉ lệ chuyển đổi và chi phí trung bình theo từng kênh quảng cáo.",
        link: "#",
        color: "from-green-400 to-emerald-600",
    },
    {
        id: 5,
        title: "Phân tích tồn kho theo danh mục",
        platform: "Power BI",
        logo: LOGO_POWERBI,
        description: "Theo dõi lượng tồn kho, vòng quay hàng hóa và cảnh báo sản phẩm chậm luân chuyển.",
        link: "#",
        color: "from-purple-400 to-indigo-600",
    },
    {
        id: 6,
        title: "Tổng hợp KPI nhân sự 2025",
        platform: "Excel Online",
        logo: LOGO_TABLEAU,
        description: "Tổng hợp KPI của nhân viên theo phòng ban, giúp đánh giá hiệu quả công việc định kỳ.",
        link: "#",
        color: "from-lime-400 to-green-600",
    },
];

const FILTERS = ["Tất cả", "Power BI", "Salesforce", "Tableau"];

export default function ReportDashboard() {
    const [activeFilter, setActiveFilter] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [selectedReport, setSelectedReport] = useState(null);

    const filteredReports = useMemo(() => {
        return reports.filter((r) => {
            const matchesFilter =
                activeFilter === "Tất cả" || r.platform === activeFilter;
            const matchesSearch =
                r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [activeFilter, searchTerm]);

    return (
        <div className="min-h-screen bg-base-100 pb-10 px-6">
            {/* --- FILTERS --- */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2 p-1.5 rounded-full relative">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`relative px-4 py-1.5 text-sm rounded-full font-medium transition-all duration-300
              ${activeFilter === f
                                ? "text-primary-content"
                                : "text-base-content/70 hover:text-primary"
                            }`}
                    >
                        {activeFilter === f && (
                            <motion.div
                                layoutId="filterHighlight"
                                className="absolute inset-0 bg-primary rounded-full"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 whitespace-nowrap">{f}</span>
                    </button>
                ))}

                <div className="relative w-full max-w-xs ml-auto">
                    <Search size={18} className="absolute left-3 top-2.5 text-base-content/50" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm báo cáo..."
                        className="input input-bordered input-sm w-full pl-9 rounded-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* --- REPORT LIST --- */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredReports.map((report) => (
                    <motion.div
                        key={report.id}
                        className="card card-side bg-base-200 shadow-md hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] group"
                        whileHover={{ y: -4 }}
                    >
                        <div className={`w-2 bg-gradient-to-b ${report.color}`}></div>

                        <figure className="p-4 flex justify-center items-center w-32">
                            <img
                                src={report.logo}
                                alt={report.platform}
                                className="w-20 h-20 object-contain opacity-90 group-hover:opacity-100 transition-all"
                            />
                        </figure>

                        <div className="card-body px-4">
                            <h2 className="card-title text-lg font-semibold">{report.title}</h2>
                            <p className="text-sm text-base-content/70">{report.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span
                                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full
  bg-base-300/70 backdrop-blur-sm border border-base-200 text-base-content`}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${report.platform === "Power BI"
                                                ? "bg-yellow-500"
                                                : report.platform === "Salesforce"
                                                    ? "bg-blue-500"
                                                    : report.platform === "Tableau"
                                                        ? "bg-orange-500"
                                                        : "bg-gray-400"
                                            }`}
                                    />
                                    {report.platform}
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedReport(report);
                                    }}
                                    className="btn btn-sm btn-primary flex items-center gap-1"
                                >
                                    Xem <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* === MODAL FULL VIEW === */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="relative w-full h-full bg-base-100">
                        {/* Nút Quay lại */}
                        <button
                            onClick={() => setSelectedReport(null)}
                            className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow hover:bg-base-300 transition hover:text-primary"
                        >
                            <X className="w-4 h-4" />
                            Quay lại
                        </button>

                        {/* IFRAME Power BI full màn hình */}
                        <iframe
                            src={selectedReport.link}
                            title={selectedReport.name}
                            className="w-full h-full border-none"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
            {/* --- NO RESULT --- */}
            {filteredReports.length === 0 && (
                <div className="text-center py-10 text-base-content/60 italic">
                    Không có báo cáo nào phù hợp với tìm kiếm hoặc bộ lọc.
                </div>
            )}
        </div>
    );
}
