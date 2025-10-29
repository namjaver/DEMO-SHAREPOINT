import React from 'react';
import '../styles/global.css';

// Link tới trang Dashboard bạn muốn nhúng
const DASHBOARD_URL = "https://qlda.duytangroup.com/Page/Dashboard/";

const DashboardEmbed = () => {
    return (
        // Sử dụng theme light/dark cơ bản của DaisyUI/Tailwind
        <div className="bg-base-200 min-h-screen">
            {/* Container chứa Iframe - Sử dụng Card của DaisyUI */}
            <div className="bg-base-100 shadow-2xl p-0 overflow-hidden">
                {/* IFRAME VÀ KHUNG CHỨA (Đảm bảo chiếm chiều cao màn hình) */}
                <div className="w-full relative" style={{ height: '100vh' }}>
                    <iframe
                        src={DASHBOARD_URL}
                        title="Bảng điều khiển QLDA Duy Tân Group"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        // Sử dụng class rounded của Tailwind cho góc dưới
                        className="rounded-b-box no-scrollbar" 
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardEmbed;