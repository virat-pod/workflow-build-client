"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const XP_TIERS = [
  { xp: "100 xp", badge: "🥉" },
  { xp: "200 xp", badge: "🥈" },
  { xp: "500 xp", badge: "🥇" },
  { xp: "1000 xp", badge: "💎" },
];

const NAV_ITEMS = [
  { icon: "home", label: "home", href: "/home" },
  { icon: "dashboard", label: "dashboard", href: "/dashboard" },
  { icon: "settings", label: "settings", href: "/settings" },
];

const Footer = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = () => {
    if (pathname === "/home") return "home";
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/settings") return "settings";
    return "home";
  };


  if (session) {
    return (
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#e8e5de] h-14 z-20">
        <ul className="flex justify-around items-center h-full px-4 list-none m-0 p-0">
          {NAV_ITEMS.map(({ icon, label, href }) => (
            <li key={label}>
              <button
                onClick={() => router.push(href)}
                className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${
                  getActiveTab() === label
                    ? "text-violet-600"
                    : "text-[#9e9890] hover:text-[#1a1916]"
                }`}
              >
                <span className="material-symbols-outlined !text-[22px]">
                  {icon}
                </span>
                <span className="text-[10px] font-medium capitalize">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </footer>
    );
  }

  return (
    <div className="bg-[#f7f6f3] border-t border-[#e8e5de] px-6 pt-6 pb-5">
      <footer className="max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-1.5">
              <div className="w-[24px] h-[24px] rounded-[5px] bg-[#1a1916] flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10M3 8h7M3 12h5" stroke="#f7f6f3" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="13" cy="12" r="2.5" fill="#f59e0b" />
                </svg>
              </div>
              <span className="text-[13.5px] font-semibold tracking-[-0.3px] text-[#1a1916]">
                workflow<span className="text-violet-600">.</span>build
              </span>
            </Link>
            <p className="text-[12.5px] text-[#9e9890]">
              Complete tasks, earn XP, unlock badges. Open source.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {XP_TIERS.map((t) => (
              <div key={t.xp} className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#f0ede6] border border-[#e8e5de]">
                <span className="text-[11px]">{t.badge}</span>
                <span className="text-[10.5px] font-medium text-[#9e9890]">{t.xp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#e8e5de] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11.5px] text-[#b5b0a7]">© 2026 workflow.build · MIT license</p>
          <div className="flex items-center gap-4">
            {["About", "Privacy", "Terms"].map((l) => (
              <Link key={l} href="#" className="text-[12.5px] text-[#9e9890] hover:text-[#1a1916] transition-colors">
                {l}
              </Link>
            ))}
          </div>
          <a
            href="https://github.com/virat-pod/workflow-build-client"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-[#6b6760] hover:text-[#1a1916] px-2.5 py-1 rounded-[6px] border border-[#e8e5de] bg-white hover:border-[#c4bfb6] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Star on GitHub
            <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[10.5px] px-2 py-0.5 rounded-full font-medium">
              ★ open source
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;