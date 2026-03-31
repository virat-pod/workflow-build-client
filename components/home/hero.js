"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TASKS = [
  { name: "Write API documentation", xp: 10, done: true },
  { name: "Fix auth bug on login", xp: 10, done: true },
  { name: "Ship the feature", xp: 10, done: false },
  { name: "Review open PRs", xp: 10, done: false },
  { name: "Update README", xp: 10, done: false },
];

const XP_MILESTONES = [
  { icon: "🏁", label: "0 xp", reached: true },
  { icon: "🥉", label: "100 xp", reached: false },
  { icon: "🥈", label: "200 xp", reached: false },
  { icon: "🥇", label: "500 xp", reached: false },
  { icon: "💎", label: "1000 xp", reached: false },
];

const Hero = () => {
  const [barWidth, setBarWidth] = useState(0);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBarWidth(73), 400);
    const t2 = setTimeout(() => setShowNotif(true), 1800);
    const t3 = setTimeout(() => setShowNotif(false), 4500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <section className="px-6 pt-18 pb-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* ── LEFT ── */}
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8e5de] px-3.5 py-1.5 rounded-full text-[12px] font-medium text-[#6b6760] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 flex-shrink-0" />
            open source · gamified productivity
          </div>

          {/* Headline */}
          <h1
            className="flex flex-col text-[52px] leading-[1.08] tracking-[-1.5px] text-[#1a1916] mb-5 font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Do the work,
            <em className="text-violet-600 italic">earn your rank.</em>
          </h1>

          {/* Subtext */}
          <p className="text-[16px] text-[#6b6760] leading-relaxed max-w-[400px] mb-8">
            Add your tasks, complete them to earn XP, and unlock badges as you
            level up. Simple as that — but addictive as hell.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mb-10">
            <Link
              href="/signup"
              className="bg-[#1a1916] text-[#f7f6f3] text-[14px] font-medium px-5 py-2.5 rounded-[8px] hover:bg-[#2d2b27] transition-colors"
            >
              Start building →
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center gap-1.5 text-[14px] text-[#6b6760] hover:text-[#1a1916] transition-colors group px-2 py-2.5"
            >
              See how it works
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {[
                { initial: "V", color: "#7c3aed" },
                { initial: "A", color: "#0f6e56" },
                { initial: "R", color: "#854f0b" },
                { initial: "M", color: "#185fa5" },
              ].map((av, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#f7f6f3] flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0"
                  style={{
                    background: av.color,
                    marginLeft: i === 0 ? 0 : -8,
                  }}
                >
                  {av.initial}
                </div>
              ))}
            </div>
            <p className="text-[12.5px] text-[#9e9890]">
              <span className="text-[#6b6760] font-medium">240+ builders</span>{" "}
              already grinding XP
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="relative flex flex-col gap-3">
          {/* Toast notification */}
          <div
            className={`absolute -top-5 -right-2 z-10 flex items-center gap-2.5 bg-[#1a1916] text-[#f7f6f3] text-[12.5px] px-3.5 py-2.5 rounded-[10px] whitespace-nowrap transition-all duration-300 ${
              showNotif
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            +10 XP earned — "Ship the feature"
          </div>

          {/* Task card */}
          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6]">
                Today's tasks
              </span>
              <span className="bg-[#f0ede6] border border-[#e8e5de] rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold text-[#854f0b]">
                +50 XP available
              </span>
            </div>
            <div className="flex flex-col">
              {TASKS.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 py-2 border-b border-[#f0ede6] last:border-0 last:pb-0"
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center border-[1.5px] ${
                      task.done
                        ? "bg-[#1a1916] border-[#1a1916]"
                        : "border-[#d1cfc8]"
                    }`}
                  >
                    {task.done && (
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="#f7f6f3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`flex-1 text-[13.5px] ${
                      task.done
                        ? "line-through text-[#b5b0a7]"
                        : "text-[#1a1916]"
                    }`}
                  >
                    {task.name}
                  </span>
                  <span className="text-[12px] font-medium text-[#9e9890]">
                    +{task.xp} xp
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* XP progress card */}
          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-[#c4bfb6] mb-1">
                  Your progress
                </p>
                <p className="text-[22px] font-semibold tracking-[-0.5px] text-[#1a1916] leading-none">
                  73{" "}
                  <span className="text-[13px] font-normal text-[#9e9890]">
                    / 100 XP
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#9e9890] mb-1">next badge</p>
                <p className="text-[20px] leading-none">🥉</p>
              </div>
            </div>

            {/* Bar */}
            <div className="h-[7px] bg-[#f0ede6] rounded-full overflow-hidden mb-2.5">
              <div
                className="h-full bg-violet-600 rounded-full transition-all duration-[1400ms] ease-out"
                style={{ width: `${barWidth}%` }}
              />
            </div>

            {/* Milestones */}
            <div className="flex justify-between">
              {XP_MILESTONES.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[13px] leading-none">{m.icon}</span>
                  <span
                    className={`text-[10.5px] ${
                      m.reached
                        ? "text-violet-600 font-medium"
                        : "text-[#b5b0a7]"
                    }`}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Badge unlock card */}
          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-3.5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[10px] bg-amber-50 border border-amber-200 flex items-center justify-center text-[20px] flex-shrink-0">
              🥉
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold text-[#1a1916]">
                Starter badge
              </p>
              <p className="text-[12px] text-[#9e9890]">
                Reach 100 XP to unlock
              </p>
            </div>
            <span className="bg-[#eeedfe] border border-[#afa9ec] text-[#3c3489] text-[10.5px] font-semibold px-2.5 py-1 rounded-full">
              27 XP away
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
