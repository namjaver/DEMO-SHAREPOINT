import React, { useState } from "react";
import Layout from "../components/Layout";
import ImageSlider from "../components/Slider";
import BG_TOP from "../assets/images/bg-top.jpg";
import BG_DTG from "../assets/images/BG_DTG.jpg";
import NewsSelection from "../components/NewsSelection";

import { Newspaper, AppWindow } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("news");

  const NewsSection = () => {

    return (
      <section
        className="relative bg-cover bg-left bg-no-repeat py-16 px-6 md:px-12 bg-base-100"
      // style={{ backgroundImage: `url(${BG_TOP})` }}
      >
        {/* Overlay làm mờ nền */}
        <div className="absolute inset-0"></div>

        <div className="relative z-10 w-full mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary drop-shadow-sm">
            Kênh thông tin & Ứng dụng nội bộ
          </h2>

          {/* Tabs */}
          <div className="flex justify-center text-base-content gap-4 mb-10 w-full">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === "news"
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-white text-primary hover:bg-white/20"
                }`}
            >
              <Newspaper size={20} />
              <span>Tin tức tập đoàn</span>
            </button>

            <button
              onClick={() => setActiveTab("apps")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === "apps"
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-white text-primary hover:bg-white/20"
                }`}
            >
              <AppWindow size={20} />
              <span>Ứng dụng nội bộ</span>
            </button>
          </div>

          {/* Nội dung tabs */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            {activeTab === "news" ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Tin tức tập đoàn</h3>
                {/* <p className="text-gray-200">
                  Cập nhật các tin tức mới nhất về hoạt động, sự kiện và thành tựu của tập đoàn.
                </p> */}
                <NewsSelection showTitle={false} />
                <button className="btn btn-primary mt-4">Xem thêm</button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Ứng dụng nội bộ</h3>
                <p className="text-base-content">
                  Truy cập nhanh các công cụ và ứng dụng nội bộ phục vụ công việc hằng ngày.
                </p>
                <button className="btn btn-primary mt-4">Khám phá ngay</button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const CompanyIntro = () => {
    return (
      <section className="relative bg-base-100 py-20 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT: Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary drop-shadow-sm">
              GIỚI THIỆU
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-primary drop-shadow-sm">
              TẬP ĐOÀN DUY TÂN
            </h3>
            <p className="text-base leading-relaxed text-base-content">
              Được thành lập từ năm <b>1987</b>, Duy Tân là một trong những doanh nghiệp
              hàng đầu trong lĩnh vực sản xuất nhựa tại Việt Nam, với sứ mệnh mang lại
              các sản phẩm chất lượng cao, thân thiện với môi trường và bền vững cho cộng đồng.
            </p>
            <p className="text-base leading-relaxed text-base-content">
              Chúng tôi tập trung vào đổi mới công nghệ, phát triển sản phẩm tái chế
              và luôn hướng tới mô hình kinh tế tuần hoàn, góp phần vào sự phát triển xanh
              của đất nước.
            </p>

            {/* Button */}
            <button className="btn btn-primary rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              Tìm hiểu thêm
            </button>
          </div>

          {/* RIGHT: Image */}
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={BG_DTG}
                alt="Công ty Duy Tân"
                className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              {/* overlay ánh sáng */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-blue-200/20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Layout>
      <ImageSlider />
      <CompanyIntro />
      <div className="w-full flex justify-center items-center py-6 bg-base-100">
        <div className="w-24 h-1 bg-primary rounded-full"></div>
      </div>
      <NewsSection />
    </Layout>
  );
};
export default Home;