import React from "react";
import Layout from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import FilterBar from "../components/FilterBar";
import DashboardEmbed from "../components/Project";
import VisualReports from "../components/VisualReport";
import Tabs from "../components/Tabs";
import { reportDUFO } from "../data/constant";

const Dufo = () => {
    const tabs = ["Báo cáo trực quan", "Báo cáo tài liệu"];
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    return (
        <Layout className="mt-4">
            <div className="flex w-full">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            </div>
            {activeTab === "Báo cáo tài liệu" && <FilterBar />}
            {activeTab === "Báo cáo trực quan" && (
                <div>
                    <VisualReports reports={reportDUFO} />
                </div>
            )}
            {activeTab === "Dự án" && (
                <DashboardEmbed />
            )}
        </Layout>
    );
};
export default Dufo;