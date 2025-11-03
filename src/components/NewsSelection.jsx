import React from "react";
import Layout from "./Layout";

const newsData = [
    {
        date: "27 Th10",
        image: "https://loremflickr.com/640/360/minimal?random=1",
        title: "DUYTAN RA MẮT GIẢI PHÁP SỐ HÓA QUẢN LÝ SẢN XUẤT",
        description:
            "Công ty DUYTAN tiếp tục đẩy mạnh chuyển đổi số trong nhà máy, ứng dụng các công nghệ tiên tiến để tối ưu hiệu suất.",
    },
    {
        date: "22 Th10",
        image: "https://loremflickr.com/640/360/minimal?random=2",
        title: "THƯ MỜI THAM DỰ TRIỂN LÃM VIMF 2025",
        description:
            "🎉 DUYTAN trân trọng kính mời Quý đối tác tham dự gian hàng tại triển lãm VIMF 2025 – nơi hội tụ các doanh nghiệp công nghiệp hàng đầu.",
    },
    {
        date: "18 Th10",
        image: "https://loremflickr.com/640/360/minimal?random=3",
        title: "DUYTAN ĐỒNG HÀNH CÙNG MỤC TIÊU XANH HÓA NGÀNH CÔNG NGHIỆP",
        description:
            "DUYTAN cam kết giảm phát thải carbon và áp dụng năng lượng tái tạo trong quy trình sản xuất.",
    },
    {
        date: "10 Th10",
        image: "https://loremflickr.com/640/360/minimal?random=4",
        title: "HỘI THẢO KỸ THUẬT: CÔNG NGHỆ ÉP NHỰA CHÍNH XÁC 2025",
        description:
            "Hội thảo chia sẻ xu hướng công nghệ mới trong sản xuất khuôn mẫu và ép nhựa chính xác cao.",
    },
    {
        date: "2 Th10",
        image: "https://loremflickr.com/640/360/minimal?random=5",
        title: "DUYTAN THAM GIA HANNOVER MESSE 2025, ĐỨC",
        description:
            "DUYTAN tự hào đại diện Việt Nam tham dự triển lãm công nghiệp lớn nhất thế giới – Hannover Messe.",
    },
    {
        date: "28 Th9",
        image: "https://loremflickr.com/640/360/minimal?random=6",
        title: "CHƯƠNG TRÌNH ĐÀO TẠO NỘI BỘ “NĂNG LƯỢNG SÁNG TẠO”",
        description:
            "Nhằm khuyến khích đổi mới và phát triển nhân lực, DUYTAN triển khai chuỗi chương trình đào tạo sáng tạo nội bộ.",
    },
    {
        date: "12 Th9",
        image: "https://loremflickr.com/640/360/minimal?random=7",
        title: "DUYTAN ĐẠT CHỨNG NHẬN ISO 14001:2025",
        description:
            "Chứng nhận này khẳng định nỗ lực không ngừng của DUYTAN trong quản lý môi trường và phát triển bền vững.",
    },
    {
        date: "25 Th8",
        image: "https://loremflickr.com/640/360/minimal?random=8",
        title: "KHAI TRƯƠNG NHÀ MÁY MỚI TẠI KHU CÔNG NGHIỆP LONG THÀNH",
        description:
            "Nhà máy mới được đầu tư công nghệ hiện đại, nâng cao năng lực sản xuất và chất lượng sản phẩm.",
    },
    {
        date: "5 Th8",
        image: "https://loremflickr.com/640/360/minimal?random=9",
        title: "DUYTAN CÙNG CỘNG ĐỒNG: CHƯƠNG TRÌNH “XANH HƠN MỖI NGÀY”",
        description:
            "Chiến dịch trồng cây xanh và tái chế nhựa nhằm nâng cao ý thức bảo vệ môi trường.",
    },
];


export default function NewsSection({ showTitle = true }) {
    return (
        <Layout>
            <section className="w-full bg-base-100 py-12">
                {/* Tiêu đề chính */}
                {showTitle && <div className="text-center px-4 md:px-8 mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">
                        TIN TỨC – SỰ KIỆN
                    </h2>
                    <p className="text-base-content mt-4 max-w-3xl mx-auto leading-relaxed">
                        Cập nhật tin tức mới nhất từ DUYTAN. Khám phá những thông tin về công ty,
                        xu hướng ngành, cũng như các câu chuyện đổi mới, phát triển bền vững
                        và tác động tích cực đến cộng đồng tại Việt Nam và khu vực ASEAN.
                    </p>
                </div>}

                {/* Lưới tin tức */}
                <div className="w-full px-4 md:px-8">
                    {showTitle && <h3 className="text-2xl font-bold text-primary mb-6">TIN TỨC</h3>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {newsData.map((item, index) => (
                            <div
                                key={index}
                                className="group card bg-base-100 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-56 md:h-64 object-cover object-center rounded-lg"
                                    />
                                    <div className="absolute top-10 left-[-20px] z-10 bg-white text-primary font-semibold text-center px-3 py-1 rounded-md shadow group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <p className="text-sm leading-tight">{item.date}</p>
                                    </div>
                                </div>

                                <div className="card-body p-5">
                                    <h4 className="text-base md:text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-base-content mt-2 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </Layout>
    );
}
