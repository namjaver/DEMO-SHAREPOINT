import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LOGO_DUYTAN_GROUP from "../assets/images/LOGO_DUYTAN.png";

// --- DỮ LIỆU ĐÃ TỐI ƯU (Nên đặt file riêng) ---
// Tách các sub-items lặp lại thành một hằng số
const commonSubItems = [
  { label: "Báo cáo & Dự án", suffix: "RPT" },
  { label: "Master Data", suffix: "MASTER" },
];

const companyData = [
  { label: "DTH", path: "/DTH" },
  { label: "DTR", path: "/DTR" },
  { label: "MIDA", path: "/MIDA" },
  { label: "PLASCENE", path: "/PLASCENE" },
  { label: "PLENMA", path: "/PLENMA" },
  { label: "DUFO & NATEC", path: "/DUYPHONG" },
  { label: "CATVAN", path: "/CATVAN" },
  { label: "CTY KHAC", path: "/KHAC" },
];

// Tạo menuItems tự động (Tối ưu hóa dữ liệu)
const generateMenuItems = () => {
  // 1. Tạo menu công ty
  const companyMenus = companyData.map(company => ({
    to: company.path,
    label: company.label,
    children: commonSubItems.map(sub => ({
      // Tạo route động: /DTH/DUYTAN-RPT
      to: `${company.path}/DUYTAN-${sub.suffix}`,
      label: sub.label,
    })),
  }));

  // 2. Thêm mục Tin tức
  companyMenus.push({
    to: "/news",
    label: "Tin tức",
  });

  return companyMenus;
};

// Khởi tạo menuItems một lần duy nhất
const menuItems = generateMenuItems();


// Tách riêng component cho Sub-item
const MenuItemWithDropdown = React.memo(({ item, index, activeIndex, openDropdown, setOpenDropdown }) => {
  const isActive = activeIndex === index;
  const isDropdownOpen = openDropdown === index;
  const hasChildren = !!item.children;

  return (
    <li
      key={index}
      className="relative group"
      // GIỮ NGUYÊN LOGIC HOVER CỦA BẠN
      onMouseEnter={() => hasChildren && setOpenDropdown(index)}
      onMouseLeave={() => hasChildren && setOpenDropdown(null)}
    >
      <Link
        to={hasChildren ? "#" : item.to}
        // GIỮ NGUYÊN HIỆU ỨNG VÀ CLASS CỦA BẠN
        className={`flex items-center gap-1 relative transition-all duration-300 hover:text-primary
                ${isActive ? "text-primary" : "text-base-content"}
                after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                after:h-[2px] after:bg-primary after:w-0 hover:after:w-full
                after:transition-all after:duration-300 after:rounded-full
                ${isActive ? "after:w-full" : ""}`}
      >
        {item.label}
        {hasChildren && (
          <ChevronDown
            className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
          />
        )}
      </Link>

      {/* --- Submenu --- */}
      {hasChildren && (
        <ul
          className={`absolute left-0 top-full mt-3 bg-base-100 shadow-lg rounded-lg py-2 w-48 transition-all duration-300 ${isDropdownOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
            }`}
        >
          {/* KHÔNG CẦN MAP VÀ LẶP LẠI (Vì dữ liệu đã được tự động tạo) */}
          {item.children.map((sub, subIndex) => (
            <li
              key={subIndex}
              // GIỮ NGUYÊN HIỆU ỨNG VÀ CLASS CỦA BẠN
              className="relative transition-all duration-300 
                            hover:pl-3 hover:text-primary 
                            before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] 
                            before:bg-primary before:opacity-0 before:transition-opacity before:duration-300 
                            hover:before:opacity-100"
            >
              <Link
                to={sub.to}
                className="block px-4 py-2 text-base-content hover:text-primary transition-colors"
                // Đảm bảo đóng dropdown sau khi click
                onClick={() => setOpenDropdown(null)}
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  // ✅ Tối ưu hóa: Dùng useMemo để tính toán Active Index
  const activeIndex = useMemo(() => {
    const currentPath = location.pathname;
    return menuItems.findIndex((item) =>
      currentPath.startsWith(item.to)
    );
  }, [location.pathname]); // Chỉ tính toán lại khi path thay đổi

  // ✅ Tối ưu hóa: Chỉ lắng nghe sự kiện cuộn một lần
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY > 20;
      if (currentScroll !== isScrolled) { // Tránh cập nhật state không cần thiết
        setIsScrolled(currentScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]); // Phụ thuộc vào isScrolled để tối ưu hóa việc so sánh

  return (
    <header
      // GIỮ NGUYÊN CLASS VÀ HIỆU ỨNG CUỘN CỦA BẠN
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? "bg-base-100 shadow-md"
          : "bg-base-100/70 backdrop-blur-md border-b border-base-300"
        }`}
    >
      <div
        // GIỮ NGUYÊN CLASS VÀ HIỆU ỨNG RESIZE CỦA BẠN
        className={`flex items-center justify-between max-w-7xl mx-auto transition-all duration-500 ${isScrolled ? "py-3 px-8" : "py-5 px-10"
          }`}
      >
        {/* --- Logo --- */}
        <Link to="/">
          <img
            src={LOGO_DUYTAN_GROUP}
            alt="Logo"
            // GIỮ NGUYÊN HIỆU ỨNG LOGO CỦA BẠN
            className={`transition-all duration-500 ${isScrolled ? "h-7" : "h-9"
              }`}
          />
        </Link>

        {/* --- Menu (Sử dụng component đã tách) --- */}
        <ul className="hidden md:flex items-center gap-4 text-nowrap font-medium">
          {menuItems.map((item, index) => (
            <MenuItemWithDropdown
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </ul>

        {/* --- Theme Toggle --- */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;