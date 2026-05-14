import React, { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

import { styles } from "../styles";
import { navLinks } from "../constants/nav.js";
import { prefetchSectionByHashId } from "../utils/sectionPrefetch.js";
import logo from "../assets/logo.svg";

function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

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

  useEffect(() => {
    if (!toggle) return undefined;

    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setToggle(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <nav
      ref={navRef}
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-3 transition duration-300 sm:py-5 ${
        scrolled ? "bg-primary/90 shadow-lg shadow-black/20 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="group flex min-w-0 max-w-[calc(100%-3.5rem)] items-center gap-3 rounded-full pr-2 outline-none transition focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 shrink-0 rounded-full object-contain ring-1 ring-white/10 transition group-hover:ring-white/25 sm:h-11 sm:w-11"
            fetchPriority="high"
          />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] font-bold leading-tight text-white xs:text-[17px] sm:text-[18px]">
              Khojiakbar
            </span>
            <span className="hidden text-[11px] font-medium leading-tight text-secondary sm:block">
              Portfolio
            </span>
          </span>
        </Link>

        <ul className="hidden list-none flex-row items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-lg shadow-black/10 backdrop-blur lg:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="font-poppins"
            >
              <a
                href={`#${nav.id}`}
                className={`block rounded-full px-4 py-2 text-[15px] font-medium transition ${
                  active === nav.title
                    ? "bg-white/10 text-white shadow-sm shadow-black/20"
                    : "text-secondary hover:bg-white/[0.06] hover:text-white"
                } xl:px-5 xl:text-[16px]`}
                onClick={() => setActive(nav.title)}
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
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-lg shadow-black/20 outline-none transition focus-visible:ring-2 focus-visible:ring-white/70 ${
              toggle
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/10 bg-black-100/70 text-white hover:bg-black-100"
            }`}
            onClick={() => setToggle((current) => !current)}
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            aria-controls="mobile-navigation"
          >
            {toggle ? (
              <FiX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FiMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <div
            id="mobile-navigation"
            className={`${
              !toggle
                ? "pointer-events-none invisible translate-y-2 opacity-0"
                : "pointer-events-auto visible translate-y-0 opacity-100"
            } absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0d0d20]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-200 sm:left-auto sm:w-72`}
          >
            <ul className="flex list-none flex-col gap-1">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className="font-poppins"
                >
                  <a
                    href={`#${nav.id}`}
                    className={`group flex min-h-12 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition ${
                      active === nav.title
                        ? "bg-white/10 text-white shadow-sm shadow-black/20"
                        : "text-secondary hover:bg-white/[0.06] hover:text-white"
                    }`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                    onMouseEnter={() => prefetchSectionByHashId(nav.id)}
                    onFocus={() => prefetchSectionByHashId(nav.id)}
                  >
                    <span>{nav.title}</span>
                    <FiArrowRight
                      className={`h-4 w-4 shrink-0 transition ${
                        active === nav.title
                          ? "translate-x-0 text-white"
                          : "text-secondary/70 group-hover:translate-x-0.5 group-hover:text-white"
                      }`}
                      aria-hidden="true"
                    />
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
