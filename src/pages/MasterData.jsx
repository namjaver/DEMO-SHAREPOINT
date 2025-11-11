import React from "react";
import Layout from "../components/Layout";
import OrgChartWithProfile from "../components/OrgChart";
import Tabs from "../components/Tabs";
import CompanyInfoCard from "../components/CompanyInfoCard";
import BasicInfoTable from "../components/BasicInfoTable";
import BoardOfDirectors from "../components/BoardOfDirectors";
import SubsidiaryTable from "../components/SubsidiaryTable";

const MasterData = () => {
  const tabs = ["Hồ sơ", "3Q", "Org Chart"];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const SUBSIDIARIES = [
    { name: "CTCP Công nghệ viễn thông FPT", capital: "--", percent: "--" },
    { name: "Công ty TNHH MTV Viễn thông FPT Thăng Long", capital: "--", percent: "--" },
    { name: "CTCP Dịch vụ Trực tuyến FPT (FOC:UPCOM)", capital: "--", percent: "--" },
    { name: "Công ty TNHH MTV Viễn thông FPT Tân Thuận", capital: "--", percent: "--" },
  ];
  function VisionMissionValues() {
    const sections = [
      {
        title: "TẦM NHÌN",
        content:
          "Trở thành tập đoàn hàng đầu Việt Nam và khối ASEAN với hệ sinh thái phát triển bền vững trong các lĩnh vực kinh tế tuần hoàn, đổi mới sáng tạo và dịch vụ hoàn hảo.",
        color: "from-blue-600 to-teal-500",
        icon: "🌏",
      },
      {
        title: "SỨ MỆNH",
        content: (
          <ul className="space-y-2 list-disc list-inside">
            <li>
              Tiên phong trong việc phát triển kinh tế tuần hoàn áp dụng công
              nghệ cao, hướng tới một tương lai bền vững, giảm rác thải, góp phần
              bảo vệ môi trường.
            </li>
            <li>
              Tạo môi trường phát huy trí tuệ con người; Cung cấp cho xã hội các
              sản phẩm có giá trị gia tăng cao.
            </li>
            <li>
              Mang đến niềm vui và hạnh phúc cho cộng đồng qua các dịch vụ hoàn
              hảo.
            </li>
          </ul>
        ),
        color: "from-emerald-600 to-cyan-500",
        icon: "🚀",
      },
      {
        title: "GIÁ TRỊ CỐT LÕI",
        content:
          "Chính Trực - Chất Lượng - Sáng Tạo - Trách Nhiệm - Bền Vững",
        color: "from-indigo-600 to-sky-500",
        icon: "💎",
      },
    ];

    return (
      <div className="w-full bg-base-200 py-12 px-4 md:px-12 rounded-xl shadow-md mt-6">
        <h2 className="text-3xl font-bold text-center mb-10 tracking-wide">
          TẦM NHÌN – SỨ MỆNH – GIÁ TRỊ CỐT LÕI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-lg bg-gradient-to-br ${section.color} text-white p-6 flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300`}
            >
              {/* <div className="text-5xl mb-4">{section.icon}</div> */}
              <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
              <div className="text-sm leading-relaxed">{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function CompanyProfile() {
    return (
      <div className="min-h-screen w-full bg-base-100 text-base-content flex flex-col md:flex-row gap-6 p-6">
        {/* --- Cột trái: Thông tin doanh nghiệp --- */}
        <div className="flex-1 space-y-4">
          <CompanyInfoCard />
          <BasicInfoTable />
          <SubsidiaryTable data={SUBSIDIARIES} />
          <VisionMissionValues />
        </div>

        {/* --- Cột phải: Ban lãnh đạo --- */}
        <div className="w-full md:w-80 bg-base-200 rounded-xl shadow-lg p-4 overflow-y-auto">
          <h3 className="font-bold text-lg mb-3 text-primary">Ban lãnh đạo</h3>
          <BoardOfDirectors />
        </div>
      </div>
    );
  }

  return (
    <Layout className="mt-4 hidden md:block min-h-screen w-screen bg-base-100 text-base-content duration-300">
      <div className="flex w-full">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      {activeTab === "Hồ sơ" && <CompanyProfile />}
      {activeTab === "3Q" && null}
      {activeTab === "Org Chart" && <OrgChartWithProfile />}
    </Layout>
  );
};
export default MasterData;