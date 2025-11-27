import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Newspaper } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LOGO_DUYTAN_GROUP from "../assets/images/LOGO_DUYTAN.png";
import clsx from "clsx";
import { MASTER_DATA_EXTERNAL_LINK, TRAM_MASTER_DATA_EXTERNAL_LINK } from "../data/constant";

// ------------------------------
// 🧱 DỮ LIỆU CẤU HÌNH
// ------------------------------
const COMMON_SUB_ITEMS = [
  { label: "Báo cáo", suffix: "bao-cao" },
  { label: "Master Data", suffix: "master-data" },
];

const COMPANY_DATA = [
  "DTH",
  "DTR",
  "MIDA",
  "PLASCENE",
  "DUFO",
  "NATEC",
  "PLENMA",
  "CTY KHAC",
];

const TRAM_DATA = [
  { label: "Đại Lộc", key: "DAI_LOC", slug: "dai-loc" },
  { label: "Đồng Lâm", key: "DONG_LAM", slug: "dong-lam" },
  { label: "Khánh Nga", key: "KHANH_NGA", slug: "khanh-nga" },
];


const MENU_ITEMS = [
  // ===== CÔNG TY (GIỮ NGUYÊN) =====
  ...COMPANY_DATA.map((label) => {
    const path = label.replace(/ & /g, "").replace(/\s+/g, "");

    return {
      label,
      to: `/${path}`,
      children: [
        {
          label: "Báo cáo",
          to: `/${path}/bao-cao`,
        },
        {
          label: "Master Data",
          externalLink: MASTER_DATA_EXTERNAL_LINK[label],
        },
      ],
    };
  }),

  // ===== TRẠM (MỖI TRẠM CÓ SUBITEMS) ✅ =====
  {
    label: "TRẠM",
    children: TRAM_DATA.map((tram) => ({
      label: tram.label,
      to: `/tram/${tram.slug}`,
      children: [
        {
          label: "Báo cáo",
          to: `/tram/${tram.slug}/bao-cao`,
        },
        {
          label: "Master Data",
          externalLink: TRAM_MASTER_DATA_EXTERNAL_LINK[tram.key],
        },
      ],
    })),
  },
];




// ------------------------------
// 🧩 COMPONENT SUBMENU ITEM
// ------------------------------
const MenuItemWithDropdown = React.memo(
  ({ item, index, isActive, isOpen, setOpenDropdown }) => {
    const hasChildren = Boolean(item.children);

    const handleMouse = useCallback(
      (state) => {
        if (hasChildren) setOpenDropdown(state ? index : null);
      },
      [index, hasChildren, setOpenDropdown]
    );

    return (
      <li
        className="relative group"
        onMouseEnter={() => handleMouse(true)}
        onMouseLeave={() => handleMouse(false)}
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
                "group-hover:rotate-180"
              )}
              style={{ transformOrigin: "center" }}
            />
          )}
        </Link>

        {hasChildren && (
          <ul
            className={clsx(
              "absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-base-100 shadow-lg rounded-lg py-2 w-48 md:w-52 transition-all duration-300 ease-out z-50 text-[clamp(12px,0.9vw,14px)]",
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            )}
          >
            {item.children.map((sub, subIndex) => (
              <li key={subIndex}>
                {sub.externalLink ? (
                  <a
                    href={sub.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2 text-base-content hover:text-primary transition-all duration-200"
                  >
                    {sub.label}
                  </a>
                ) : (
                  <Link
                    to={sub.to}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2 text-base-content hover:text-primary transition-all duration-200"
                  >
                    {sub.label}
                  </Link>
                )}
              </li>
            ))}

          </ul>
        )}
      </li>
    );
  }
);

// ------------------------------
// 🏠 HEADER CHÍNH
// ------------------------------
const Header = ({ onToggleSwap }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const activeIndex = useMemo(() => {
    const path = location.pathname;
    return MENU_ITEMS.findIndex((item) => {
      if (!item.to || item.to === "#") return false;
      if (path === item.to || path.startsWith(item.to + "/")) return true;
      if (item.children) return item.children.some((sub) => path.startsWith(sub.to));
      return false;
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-visible",
        isScrolled
          ? "bg-base-100 shadow-md"
          : "bg-base-100/70 backdrop-blur-md border-b border-base-300"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between w-full  mx-auto transition-all duration-500 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={LOGO_DUYTAN_GROUP}
            alt="Logo Duy Tân Group"
            className="object-contain transition-all duration-500 max-h-[42px] md:max-h-[38px] lg:max-h-[34px] xl:max-h-[30px] 2xl:max-h-[28px]"
          />
        </Link>

        {/* Menu */}
        <ul className={clsx(
          "hidden md:flex flex-1 justify-evenly items-center font-medium text-nowrap transition-all duration-300",
          "gap-2 md:gap-4 lg:gap-6 xl:gap-8",
          "text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px]"
        )}>
          {MENU_ITEMS.map((item, index) => (
            <MenuItemWithDropdown
              key={index}
              item={item}
              index={index}
              isActive={index === activeIndex}
              isOpen={openDropdown === index}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </ul>

        {/* Theme toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to="/news" className="text-[clamp(12px,1vw,15px)] hover:text-primary transition-colors duration-200">
            <Newspaper />
          </Link>
          <ThemeToggle />
          {/* <Link
            onClick={onToggleSwap}
            className={clsx(
              "btn btn-sm text-white transition-all duration-300",
              isScrolled
                ? "btn-primary hover:bg-primary-focus" // Màu sắc rõ ràng khi cuộn
                : "bg-primary hover:bg-primary/90 border-primary" // Màu sắc rõ ràng khi KHÔNG cuộn
            )}
          >
            Đổi Header
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
