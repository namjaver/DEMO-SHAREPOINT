import React from "react";
import Layout from "../components/Layout";
import FilterBar from "../components/FilterBar";
import VisualReports from "../components/VisualReport";
import Tabs from "../components/Tabs";
import { reportsDTG } from "../data/constant";

const DTG = () => {
    const tabs = [ "Báo cáo trực quan", "Báo cáo tài liệu"];
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    return (
        <Layout className="mt-4 hidden md:block min-h-screen w-screen bg-base-100 text-base-content duration-30">
            <div className="flex w-full">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />                
            </div>

            {activeTab === "Báo cáo tài liệu" && <FilterBar isDTG />}
            {activeTab === "Báo cáo trực quan" && <VisualReports reports={reportsDTG}/>}
        </Layout>
    );
};

export default DTG;
