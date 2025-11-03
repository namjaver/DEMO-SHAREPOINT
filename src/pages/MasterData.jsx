import React from "react";
import Layout from "../components/Layout";
import OrgChartWithProfile from "../components/OrgChart";
import Tabs from "../components/Tabs";

const MasterData = () => {
  const tabs = ["Báo cáo tài liệu", "Báo cáo trực quan"];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <Layout className="mt-4 hidden md:block min-h-screen w-screen bg-base-100 text-base-content duration-300">
      <div className="flex w-full">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      {activeTab === "Báo cáo tài liệu" && <div>Chức năng báo cáo tài liệu đang được phát triển.</div>}
      <OrgChartWithProfile />
    </Layout>
  );
};
export default MasterData;