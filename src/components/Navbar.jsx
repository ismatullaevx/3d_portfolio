import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants/nav.js";
import { prefetchSectionByHashId } from "../utils/sectionPrefetch.js";
import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-3 sm:py-5 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-primary/95 shadow-lg shadow-black/20 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="h-9 w-9 shrink-0 object-contain"
            fetchpriority="high"
          />
          <p className="flex min-w-0 cursor-pointer truncate text-[15px] font-bold text-white xs:text-[17px] sm:text-[18px]">
            Khojiakbar &nbsp;
            <span className="hidden sm:block"> | Portfolio</span>
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-6 lg:flex lg:gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } cursor-pointer text-[16px] font-medium transition-colors hover:text-white xl:text-[18px]`}
              onClick={() => setActive(nav.title)}
            >
              <a
                href={`#${nav.id}`}
                onMouseEnter={() => prefetchSectionByHashId(nav.id)}
                onFocus={() => prefetchSectionByHashId(nav.id)}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end lg:hidden">
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black-100/60"
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="h-7 w-7 object-contain"
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute right-4 top-16 z-10 my-2 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-black-100/95 p-4 shadow-2xl shadow-black/40 backdrop-blur sm:right-8 sm:top-20`}
          >
            <ul className="flex flex-1 list-none flex-col items-stretch justify-end gap-1">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer rounded-xl px-3 py-3 text-[16px] font-medium transition-colors ${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:bg-white/5 hover:text-white`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a
                    href={`#${nav.id}`}
                    onMouseEnter={() => prefetchSectionByHashId(nav.id)}
                    onFocus={() => prefetchSectionByHashId(nav.id)}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

const MemoizedNavbar = memo(Navbar);
MemoizedNavbar.displayName = "Navbar";

export default MemoizedNavbar;
