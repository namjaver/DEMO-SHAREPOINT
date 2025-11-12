import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Newspaper, Factory, BarChart3, Database, TrendingUp, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LOGO_DUYTAN_GROUP from "../assets/images/LOGO_DUYTAN.png"; // Logo chung
// Giả định các logo công ty con tồn tại
// ... (các logo khác)
const LOGO_STATION_GENERIC = LOGO_DUYTAN_GROUP; // Dùng logo chung cho trạm nếu không có riêng
import clsx from "clsx";


// ------------------------------
// 🧱 DỮ LIỆU CẤU HÌNH GỐC ĐƯỢC CHUYỂN ĐỔI
// ------------------------------

const newsData = [
    { date: "27 Th10", image: "https://loremflickr.com/640/360/minimal?random=1", title: "DUYTAN RA MẮT GIẢI PHÁP SỐ HÓA QUẢN LÝ SẢN XUẤT" },
    { date: "22 Th10", image: "https://loremflickr.com/640/360/minimal?random=2", title: "THƯ MỜI THAM DỰ TRIỂN LÃM VIMF 2025" },
    { date: "18 Th10", image: "https://loremflickr.com/640/360/minimal?random=3", title: "DUYTAN ĐỒNG HÀNH CÙNG MỤC TIÊU XANH HÓA NGÀNH CÔNG NGHIỆP" },
    { date: "10 Th10", image: "https://loremflickr.com/640/360/minimal?random=4", title: "HỘI THẢO KỸ THUẬT: CÔNG NGHỆ ÉP NHỰA CHÍNH XÁC 2025" },
];

const COMMON_SUB_ITEMS = [
    { label: "Báo cáo", suffix: "bao-cao", icon: BarChart3 },
    { label: "Master Data", suffix: "master-data", icon: Database },
];

const COMPANY_NAMES = [
    "DTH",
    "DTR",
    "MIDA",
    "PLASCENE",
    "DUFO",
    "NATEC",
    "PLENMA",
    "CTY KHAC",
];

const STATION_ITEMS = [
    { label: "Đại Lộc", to: "/tram/dai-loc", suffix: "dai-loc" },
    { label: "Đồng Lâm", to: "/tram/dong-lam", suffix: "dong-lam" },
    { label: "Khánh Nga", to: "/tram/khanh-nga", suffix: "khanh-nga" }
];

// Tạo mảng ALL_ENTITIES (Công ty + Trạm)
const ALL_ENTITIES = [
    // 1. CÔNG TY
    ...COMPANY_NAMES.map((label) => ({
        id: label,
        label,
        // Cần thay thế LOGO_DUYTAN_GROUP bằng logo cụ thể nếu có
        logo: LOGO_DUYTAN_GROUP,
        to: `/${label.replace(/ & /g, "").replace(/\s+/g, "")}`,
        type: "COMPANY",
        children: COMMON_SUB_ITEMS.map((sub) => ({
            label: sub.label,
            to: `/${label.replace(/ & /g, "").replace(/\s+/g, "")}/${sub.suffix}`,
            icon: sub.icon
        })),
    })),

    // 2. TRẠM (Mỗi trạm là một Entity)
    ...STATION_ITEMS.map((station) => ({
        id: station.suffix,
        label: `Trạm ${station.label}`,
        logo: LOGO_STATION_GENERIC,
        to: station.to,
        type: "STATION",
        children: [
            // Các mục con cho Trạm (có thể là Báo cáo, Giám sát,...)
            { label: "Báo cáo Trạm", to: `${station.to}`, icon: BarChart3 },
        ]
    }))
];


// Cấu trúc MENU_ITEMS MỚI chỉ còn 1 item chính là Mega Menu
const MENU_ITEMS = [
    {
        label: "Truy Cập Hệ Thống",
        to: "#",
        type: 'mega',
        children: ALL_ENTITIES // Dùng mảng kết hợp
    },
];

const NewsListInMegaMenu = () => {
    const featuredNews = newsData.slice(0, 3); 

    return (
        <div className="bg-base-200/50 p-4 rounded-lg shadow-inner">
            <h4 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2 border-b border-base-300 pb-2">
                <Newspaper className="w-5 h-5 text-primary" /> Tin Tức & Sự Kiện Mới
            </h4>
            
            <ul className="space-y-4">
                {featuredNews.map((item, index) => (
                    <li key={index}>
                        <a 
                            href="#" 
                            className="flex items-start gap-3 group transition-opacity duration-200"
                        >
                            <img 
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-12 object-cover object-center rounded-md flex-shrink-0 border border-base-300 group-hover:opacity-80 transition-opacity"
                            />
                            <div>
                                <h5 className="text-sm font-semibold text-base-content group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                    {item.title}
                                </h5>
                                <div className="flex items-center gap-2 text-xs text-base-content/70 mt-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
            
            <div className="mt-4 pt-3 border-t border-base-300">
                 <a 
                    href="/news" 
                    className="text-sm font-medium text-primary hover:underline flex items-center justify-center gap-1"
                >
                    Xem tất cả Tin tức <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};

// ------------------------------
// 🧩 COMPONENT MEGA MENU CONTENT (PHÂN VÙNG CÔNG TY & TRẠM)
// ------------------------------
const MegaMenuContent = React.memo(({ setOpenDropdown, isCompanyActive }) => { 
    const location = useLocation();
    
    // Phân loại dữ liệu
    const companies = ALL_ENTITIES.filter(e => e.type === "COMPANY");
    const stations = ALL_ENTITIES.filter(e => e.type === "STATION");

    // Hàm render chung cho cả Công ty và Trạm
    const renderEntityGrid = (entities) => (
        <div className="grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-4"> 
            {entities.map((entity) => {
                const isURLActive = location.pathname.startsWith(entity.to) && entity.to !== "/tram";
                
                return (
                    <div 
                        key={entity.id} 
                        className={clsx(
                            "flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 group relative cursor-pointer",
                            "hover:shadow-xl hover:border-primary/80",
                            isURLActive ? "border-primary shadow-lg scale-[1.03]" : "border-base-200"
                        )}
                    >
                        {/* Nội dung Logo và Overlay Menu con (Giữ nguyên) */}
                        <Link 
                            to={entity.to}
                            onClick={() => setOpenDropdown(null)}
                            className="w-full h-full flex flex-col items-center justify-center p-1"
                        >
                            <img src={entity.logo} alt={`${entity.label} Logo`} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 transition-transform duration-300 group-hover:scale-105" />
                            <span className={clsx("text-xs font-semibold mt-1 text-center truncate w-full", isURLActive ? "text-primary font-bold" : "text-base-content")}>
                                {entity.label}
                            </span>
                        </Link>
                        {/* Overlay */}
                        <div className={clsx("absolute inset-0 bg-base-100/95 backdrop-blur-sm flex flex-col justify-center items-start p-3 rounded-lg opacity-0 invisible transition-all duration-200 shadow-xl", "group-hover:opacity-100 group-hover:visible z-10")}>
                            <h4 className="text-primary font-bold text-xs mb-2">Truy Cập</h4>
                            {entity.children.map((sub, subIndex) => {
                                const Icon = sub.icon;
                                return (
                                    <Link key={subIndex} to={sub.to} onClick={() => setOpenDropdown(null)} className="flex items-center gap-1 text-xs py-1 text-base-content hover:text-primary transition-colors duration-200 w-full">
                                        {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
                                        <span className="truncate">{sub.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );


    return (
      <div 
        className={clsx(
            "absolute left-0 right-0 top-full bg-base-100 shadow-2xl py-6 transition-all duration-300 ease-out z-40 border-t border-primary/10",
            isCompanyActive ? "opacity-100 visible translate-y-0" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Container MỚI: Full width và padding lớn hơn ở giữa để lấp đầy */}
        <div className="w-full max-w-[1920px] mx-auto min-h-[450px] px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-32"> 
            {/* Chia layout 9/3 vẫn giữ nguyên, nhưng chiếm toàn bộ không gian ngang */}
            <div className="flex gap-6">
                
                {/* Cột 1: NỘI DUNG ĐIỀU HƯỚNG CHÍNH (9/12) */}
                <div className="w-full lg:w-9/12">
                    {/* PHÂN VÙNG: CÔNG TY */}
                    {companies.length > 0 && (
                        <div className="mb-8 p-4 bg-base-200/50 rounded-lg">
                            <h4 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                                <Factory className="w-5 h-5 text-primary" /> Công Ty
                            </h4>
                            {renderEntityGrid(companies)}
                        </div>
                    )}
                    
                    {/* PHÂN VÙNG: TRẠM */}
                    {stations.length > 0 && (
                        <div className="p-4 bg-base-200/50 rounded-lg">
                            <h4 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-secondary" /> Trạm
                            </h4>
                            {renderEntityGrid(stations)}
                        </div>
                    )}
                </div>

                {/* Cột 2: KHU VỰC TIN TỨC VÀ HỖ TRỢ (3/12) */}
                <div className="hidden lg:block lg:w-3/12 space-y-4 pt-4">
                    <NewsListInMegaMenu /> 
                    
                    {/* Khu vực Hỗ Trợ/Thông Báo Nhanh */}
                    <div className="p-4 bg-base-300 rounded-lg shadow-md">
                        <h5 className="text-md font-bold text-primary flex items-center gap-2 mb-2">
                            Liên Hệ Nhanh
                        </h5>
                        <p className="text-sm text-base-content/80">
                            Hỗ trợ kỹ thuật 24/7.
                        </p>
                        <a href="tel:19001234" className="text-sm font-medium text-primary hover:underline mt-2 block">
                            Gọi ngay: 1900 1234
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
});

// ------------------------------
// 🧩 COMPONENT SUBMENU ITEM (Đã lược bỏ logic dropdown thường)
// ------------------------------
const MenuItemWithDropdown = React.memo(
    ({ item, isActive, isOpen }) => {
        const isMegaMenuTrigger = item.type === 'mega';
        const hasChildren = Boolean(item.children);

        // Không cần handleMouse vì hover được quản lý bởi HeaderWrapper

        return (
            <li
                className={clsx("relative group", isMegaMenuTrigger && "static")}
            >
                <Link
                    to={hasChildren ? "#" : item.to}
                    className={clsx(
                        "flex items-center gap-1 relative transition-colors duration-200 hover:text-primary text-[clamp(12px,1vw,15px)]",
                        isActive ? "text-primary after:w-full" : "text-base-content",
                        "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-primary after:w-0 hover:after:w-full after:transition-all after:duration-300 after:rounded-full"
                    )}
                >
                    {item.label}
                    {hasChildren && (
                        <ChevronDown
                            className={clsx(
                                "w-4 h-4 ml-1 transform-gpu transition-transform duration-200 ease-out will-change-transform",
                                isOpen ? "rotate-180" : "group-hover:rotate-180"
                            )}
                            style={{ transformOrigin: "center" }}
                        />
                    )}
                </Link>
            </li>
        );
    }
);


// ------------------------------
// 🏠 HEADER CHÍNH (Giữ nguyên logic Wrapper để chống lỗi mất menu)
// ------------------------------
const Header = ({ onToggleSwap }) => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Lấy index của item Mega Menu (chỉ có 1 item trong MENU_ITEMS)
    const megaMenuIndex = useMemo(() => MENU_ITEMS.findIndex(item => item.type === 'mega'), []);

    // Xác định xem Mega Menu có đang mở hay không
    const isMegaMenuOpen = openDropdown === megaMenuIndex;

    const activeIndex = useMemo(() => {
        const path = location.pathname;
        return MENU_ITEMS.findIndex((item) => {
            if (!item.to || item.to === "#") return false;
            if (path === item.to || path.startsWith(item.to + "/")) return true;
            // Kiểm tra cả các entity con trong ALL_ENTITIES (Công ty và Trạm)
            if (item.children) return item.children.some((entity) => path.startsWith(entity.to));
            return false;
        });
    }, [location.pathname]);


    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Logic xử lý hover/leave cho Mega Menu trên Wrapper
    const handleMegaMenu = useCallback((state) => {
        // Chỉ mở nếu có item Mega Menu
        if (megaMenuIndex > -1) {
            setOpenDropdown(state ? megaMenuIndex : null);
        }
    }, [megaMenuIndex]);

    return (
    // Wrapper để bắt sự kiện Hover
    <div 
        className="fixed top-0 left-0 w-full z-50 overflow-visible" 
        onMouseEnter={() => handleMegaMenu(true)} 
        onMouseLeave={() => handleMegaMenu(false)} 
    >
        <header
            className={clsx(
                "w-full transition-all duration-500",
                isScrolled
                    ? "bg-base-100 shadow-xl" // Tăng Shadow khi cuộn
                    : "bg-base-100/70 backdrop-blur-md border-b border-base-300"
            )}
        >
            <div
                className={clsx(
                    "flex items-center justify-between w-full max-w-[1600px] mx-auto transition-all duration-500 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16",
                    isScrolled ? "py-3" : "py-5" // Giảm padding khi cuộn
                )}
            >
                
                {/* 1. LOGO & MENU CÙNG KHU VỰC BÊN TRÁI */}
                <div className="flex items-center gap-8 lg:gap-12 xl:gap-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={LOGO_DUYTAN_GROUP}
                            alt="Logo Duy Tân Group"
                            // Tăng kích thước logo khi KHÔNG cuộn
                            className={clsx(
                                "object-contain transition-all duration-500",
                                isScrolled ? "max-h-[30px]" : "max-h-[42px]" 
                            )}
                        />
                    </Link>

                    {/* Menu (Dời về bên trái) */}
                    <ul className={clsx(
                        "hidden md:flex items-center font-medium text-nowrap transition-all duration-300",
                        "gap-8 lg:gap-10",
                        "text-[15px]" // Kích thước menu thống nhất
                    )}>
                        {MENU_ITEMS.map((item, index) => (
                            <MenuItemWithDropdown
                                key={index}
                                item={item}
                                index={index}
                                isActive={index === activeIndex}
                                isOpen={isMegaMenuOpen}
                                setOpenDropdown={setOpenDropdown}
                            />
                        ))}
                    </ul>
                </div>


                {/* 2. ACTIONS & CTA (KHU VỰC BÊN PHẢI) */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    
                    {/* Icons (News & Theme Toggle) */}
                    <Link to="/news" className="text-[clamp(12px,1vw,15px)] text-base-content hover:text-primary transition-colors duration-200">
                        <Newspaper className="w-6 h-6" />
                    </Link>
                    <ThemeToggle />

                    {/* CTA BUTTON MỚI */}
                    <Link 
                        onClick={onToggleSwap}
                        className={clsx(
                            "btn btn-sm text-white transition-all duration-300",
                            isScrolled 
                                ? "btn-primary hover:bg-primary-focus" // Màu sắc rõ ràng khi cuộn
                                : "bg-primary hover:bg-primary/90 border-primary" // Màu sắc rõ ràng khi KHÔNG cuộn
                        )}
                    >
                        Đổi Header
                    </Link>
                </div>
            </div>
        </header>

        {/* MEGA MENU: Hiển thị phân vùng Công ty và Trạm */}
        <MegaMenuContent 
            setOpenDropdown={setOpenDropdown} 
            isCompanyActive={isMegaMenuOpen}
        />
    </div>
  );
};

export default Header;