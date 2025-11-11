import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LOGO_DUYTAN_GROUP from "../assets/images/LOGO_DUYTAN.png";
import clsx from "clsx";

// ------------------------------
// 🧱 DỮ LIỆU CẤU HÌNH
// ------------------------------
const COMMON_SUB_ITEMS = [
  { label: "Báo cáo", suffix: "RPT" },
  { label: "Master Data", suffix: "MASTER" },
];

const COMPANY_DATA = [
  "DTH",
  "DTR",
  "MIDA",
  "PLASCENE",
  "PLENMA",
  "DUFO & NATEC",
  "CATVAN",
  "CTY KHAC",
];

const MENU_ITEMS = [
  { label: "TẬP ĐOÀN", to: "/" },
  ...COMPANY_DATA.map((label) => ({
    label,
    to: `/${label.replace(/ & /g, "").replace(/\s+/g, "")}`,
    children: COMMON_SUB_ITEMS.map((sub) => ({
      label: sub.label,
      to: `/${label.replace(/ & /g, "").replace(/\s+/g, "")}/DUYTAN-${sub.suffix}`,
    })),
  })),
  { label: "Tin tức", to: "/news" },
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
                <Link
                  to={sub.to}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 text-base-content hover:text-primary transition-all duration-200 relative hover:pl-3 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                >
                  {sub.label}
                </Link>
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
const Header = () => {
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
          "flex items-center justify-between w-full max-w-[1600px] mx-auto transition-all duration-500 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16",
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
        <ul className="hidden md:flex flex-1 justify-evenly items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-nowrap font-medium">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
