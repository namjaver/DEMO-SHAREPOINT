import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ReportFullView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy URL báo cáo được truyền qua state
  const reportUrl = location.state?.url || "";

  if (!reportUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <p className="text-lg text-base-content">Không tìm thấy đường dẫn báo cáo.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 btn btn-primary"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-screen h-screen bg-base-100 relative"
    >
      {/* Nút quay lại */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-base-200/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-md hover:bg-base-300 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại</span>
      </button>

      {/* Báo cáo Power BI toàn màn hình */}
      <iframe
        src={reportUrl}
        title="Power BI Report"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </motion.div>
  );
};

export default ReportFullView;
