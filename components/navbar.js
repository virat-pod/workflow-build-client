"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // dropdown bahar click pe band karo
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 theme transition-all duration-200 ${
          scrolled ? "border-b border-[#e8e5de]" : "border-b border-transparent"
        }`}
      ></nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 theme transition-all duration-200 ${
        scrolled ? "border-b border-[#e8e5de]" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-[58px] flex items-center justify-between">
        <Link
          href={session ? "/home" : "/"}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-[30px] h-[30px] rounded-[7px] bg-[#1a1916] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 4h10M3 8h7M3 12h5"
                stroke="#f7f6f3"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="13" cy="12" r="2.5" fill="#f59e0b" />
            </svg>
          </div>
          <span className="text-[14.5px] font-semibold tracking-[-0.4px] text-[#1a1916]">
            workflow<span className="text-violet-600">.</span>build
          </span>
        </Link>

        {!session && (
          <div className="hidden md:flex items-center gap-0.5">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "GitHub", href: "https://github.com", external: true },
            ].map(({ label, href, external }) => (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  setMenuOpen(false);
                }}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="text-[13.5px] text-[#6b6760] hover:text-[#1a1916] hover:bg-black/5 px-3 py-1.5 rounded-[7px] transition-all duration-100"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {!session && (
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-[13.5px] text-[#6b6760] hover:text-[#1a1916] hover:bg-black/5 px-3.5 py-2.5 rounded-[7px] transition-all"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-[13.5px] group font-medium bg-[#1a1916] text-[#f7f6f3] hover:bg-[#2d2b27] px-4 py-2.5 rounded-full transition-all"
            >
              Get started{" "}
              <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}

        {session && (
          <div className="hidden md:flex items-center gap-3">
            {[
              { label: "Tasks", href: "/home" },
              { label: "Dashboard", href: "/dashboard" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[13.5px] text-[#6b6760] hover:text-[#1a1916] hover:bg-black/5 px-3 py-1.5 rounded-[7px] transition-all"
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center gap-1.5 bg-[#f0ede6] border border-[#e8e5de] px-2.5 py-1 rounded-full">
              <span className="text-[12px]">⚡</span>
              <span className="text-[12px] font-semibold text-[#854f0b]">
                {session.user?.xp ?? 0} XP
              </span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-black/5 pl-1 pr-2.5 py-1 rounded-full transition-all"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image || "/image/catPic.jpg"}
                    alt="avatar"
                    className="rounded-full"
                    width={28}
                    height={28}
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-[11px] font-semibold">
                    {session.user?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <span className="text-[13px] font-medium text-[#1a1916]">
                  {session.user?.name}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`text-[#9e9890] transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-42 sm:w-48 bg-white border border-[#e8e5de] rounded-xl shadow-sm overflow-hidden z-50">
                  <div className="px-3.5 py-2.5 border-b border-[#f0ede6]">
                    <p className="text-[12px] font-semibold text-[#1a1916] truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-[8.5px] sm:text-[11px] text-[#9e9890] truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  {[
                    { label: "Home", href: "/home", icon: "home" },
                    {
                      label: "Dashboard",
                      href: "/dashboard",
                      icon: "dashboard",
                    },
                    { label: "Settings", href: "/settings", icon: "settings" },
                  ].map(({ label, href, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDropdownOpen(false)}
                      className="hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[#6b6760] hover:text-[#1a1916] hover:bg-[#f7f6f3] transition-colors"
                    >
                      <span className="material-symbols-outlined !text-[16px]">
                        {icon}
                      </span>
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-[#f0ede6]">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined !text-[16px]">
                        logout
                      </span>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {session && (
          <div className="flex md:hidden items-center gap-2">
            <div className="flex sm:hidden items-center justify-center gap-1.5 bg-[#f0ede6] border border-[#e8e5de] w-18 h-8 rounded-full">
              <span className="text-[12px]">⚡</span>
              <span className="text-[12px] font-semibold text-[#854f0b]">
                {session.user?.xp ?? 0} XP
              </span>
            </div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-black/5 p-1.5 rounded-full transition-all"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-[12px] font-semibold">
                  {session.user?.name?.[0]?.toUpperCase() ?? "?"}
                </div>
              )}
            </button>
          </div>
        )}

        {!session && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-black/5 transition-colors"
          >
            <span
              className={`block h-[1.5px] w-5 bg-[#1a1916] transition-all duration-150 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block h-[1.5px] bg-[#1a1916] transition-all duration-150 ${menuOpen ? "w-5 opacity-0" : "w-3.5"}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#1a1916] transition-all duration-150 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        )}
      </div>

      {!session && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen ? "max-h-60 border-t border-[#e8e5de]" : "max-h-0"} bg-[#f7f6f3]`}
        >
          <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-0.5">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              {
                label: "GitHub",
                href: "https://github.com/virat-pod",
                external: true,
              },
            ].map(({ label, href, external }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="text-[14px] text-[#6b6760] hover:text-[#1a1916] px-3 py-2.5 rounded-[7px] hover:bg-black/5 transition-all"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[#e8e5de] flex flex-col gap-1.5">
              <Link
                href="/login"
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="text-[14px] text-[#6b6760] hover:text-[#1a1916] px-3 py-2.5 rounded-[7px] hover:bg-black/5 transition-all"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="text-[14px] font-medium text-center bg-[#1a1916] text-[#f7f6f3] px-3 py-2.5 rounded-[7px] hover:bg-[#2d2b27] transition-all"
              >
                Get started →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
