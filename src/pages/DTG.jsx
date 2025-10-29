import React from "react";
import Layout from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import FilterBar from "../components/FilterBar";
import DashboardEmbed from "../components/Project";

const DTG = () => {
    const tabs = ["Báo cáo tài liệu", "Báo cáo trực quan", "Dự án"];
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    return (
        <Layout className="mt-4">
            <AnimatePresence>
                <motion.div
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -250, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="hidden md:block min-h-screen w-screen bg-base-100 text-base-content duration-300"
                >
                    <div className="flex w-full">
                        <div className="flex w-full max-w-full px-4 sm:px-6">
                            <div className="relative flex bg-base-300/40 rounded-full p-0.5 shadow-md gap-0.5 mt-1 mb-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative px-4 py-1.5 text-sm rounded-full font-medium  duration-300 ${activeTab === tab
                                            ? "text-primary-content"
                                            : "text-base-content/70 hover:text-primary"
                                            }`}
                                    >
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="tabHighlight"
                                                className="absolute inset-0 bg-primary rounded-full"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 whitespace-nowrap">{tab}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {activeTab === "Báo cáo tài liệu" && <FilterBar />}
                    {activeTab === "Báo cáo trực quan" && (
                        <div>
                            <p className="text-base opacity-80">
                                Đây là khu vực dành cho **Báo cáo trực quan**.
                            </p>
                        </div>
                    )}
                    {activeTab === "Dự án" && (
                        <DashboardEmbed />
                    )}
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
};
export default DTG;