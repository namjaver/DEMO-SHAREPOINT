import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import FilterBar from "../components/FilterBar";
import DashboardEmbed from "../components/Project";
import VisualReports from "../components/VisualReport";
import Tabs from "../components/Tabs";

const DTG = () => {
    const tabs = ["Báo cáo tài liệu", "Báo cáo trực quan", "Dự án"];
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    return (
        <Layout className="mt-4 hidden md:block min-h-screen w-screen bg-base-100 text-base-content duration-30">
            <div className="flex w-full">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />                
            </div>

            {activeTab === "Báo cáo tài liệu" && <FilterBar isDTG />}
            {activeTab === "Báo cáo trực quan" && <VisualReports />}
            {activeTab === "Dự án" && <DashboardEmbed />}
        </Layout>
    );
};

export default DTG;
