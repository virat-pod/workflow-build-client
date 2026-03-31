"use client";

import { useSession } from "next-auth/react";
import dayjs from "@/lib/dayjs";

const XP_MILESTONES = [
  { icon: "🏁", label: "0", reached: true },
  { icon: "🥉", label: "100", reached: false },
  { icon: "🥈", label: "200", reached: false },
  { icon: "🥇", label: "500", reached: false },
  { icon: "💎", label: "1000", reached: false },
];

const BADGES = [
  { icon: "🥉", name: "Starter", key: "starter", need: 100 },
  { icon: "🥈", name: "Builder", key: "builder", need: 200 },
  { icon: "🥇", name: "Pro", key: "pro", need: 500 },
  { icon: "💎", name: "Elite", key: "elite", need: 1000 },
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function getNextBadge(badges) {
  const tiers = [
    { icon: "🥉", key: "starter", need: 100 },
    { icon: "🥈", key: "builder", need: 200 },
    { icon: "🥇", key: "pro", need: 500 },
    { icon: "💎", key: "elite", need: 1000 },
  ];
  const next = tiers.find((t) => !badges.includes(t.key));
  if (!next) return;
  return next;
}

function getXPBarWidth(xp) {
  if (xp >= 1000) return 100;
  const tiers = [0, 100, 200, 500, 1000];
  for (let i = 0; i < tiers.length - 1; i++) {
    if (xp < tiers[i + 1]) {
      return Math.round(((xp - tiers[i]) / (tiers[i + 1] - tiers[i])) * 100);
    }
  }
  return 100;
}


function getStreakDays(streak) {
  const today = new Date().getDay(); // 0=Sun
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const ordered = [...days.slice(1), days[0]];
  const todayIdx = today === 0 ? 6 : today - 1;

  return ordered.map((d, i) => {
    if (i === todayIdx) return { label: d, status: "today" };
    if (i < todayIdx && todayIdx - i <= streak)
      return { label: d, status: "done" };
    return { label: d, status: "miss" };
  });
}

export default function Structure({ recentTasks = [], todayCount = 0 }) {
  const { data: session } = useSession();
  const xp = session?.user?.xp ?? 0;
  const streak = session?.user?.streak ?? 0;
  const tasksCompleted = session?.user?.tasksCompleted ?? 0;
  const badges = session?.user?.badges ?? [];
  const nextBadge = getNextBadge(badges);
  const barWidth = getXPBarWidth(xp);
  const streakDays = getStreakDays(streak);
  const unlockedCount = badges.length;

  return (
    <div className="bg-[#f7f6f3] min-h-screen px-5 sm:py-21.5 py-24 pb-22 sm:pb-18">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="text-[#c4bfb6]">
          <p className="text-[11px] font-semibold tracking-[1.5px] uppercase mb-2">
            Overview
          </p>
          <h1
            className="text-[28px] md:text-[32px] font-normal leading-tight text-zinc-700"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your <em className="italic text-violet-600">progress,</em>
            <br />
            at a glance.
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Total XP",
              value: xp,
              sub: nextBadge
                ? `${nextBadge.need - xp} away from ${nextBadge.icon}`
                : "Max rank!",
            },
            { label: "Tasks done", value: tasksCompleted, sub: "All time" },
            { label: "Streak", value: streak, sub: "days in a row 🔥" },
            { label: "Today", value: todayCount, sub: "tasks completed" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-[#e8e5de] rounded-xl px-4 py-3.5"
            >
              <p className="text-[10.5px] font-semibold tracking-[1.2px] uppercase text-[#c4bfb6] mb-2">
                {s.label}
              </p>
              <p className="text-[26px] font-semibold text-[#1a1916] tracking-[-0.5px] leading-none">
                {s.value}
              </p>
              <p className="text-[11.5px] text-[#9e9890] mt-1.5">{s.sub}</p>
            </div>
          ))}
        </div>

   
        <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#1a1916]">
              XP progress
            </span>
            <span className="text-[13px] text-[#9e9890]">
              <strong className="text-violet-600 font-semibold">{xp}</strong> /{" "}
              {nextBadge?.need ?? 1000} XP
            </span>
          </div>
          <div className="h-[6px] bg-[#f0ede6] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-violet-600 rounded-full transition-all duration-700"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <div className="flex justify-between">
            {XP_MILESTONES.map((m) => (
              <div key={m.label} className="flex flex-col items-center gap-1">
                <span className="text-[13px] leading-none">{m.icon}</span>
                <span
                  className={`text-[10px] ${m.reached ? "text-violet-600 font-semibold" : "text-[#b5b0a7]"}`}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      
          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-[#1a1916]">
                Badges
              </span>
              <span className="text-[11.5px] text-[#9e9890]">
                {unlockedCount} / 4 unlocked
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {BADGES.map((b) => {
                const unlocked = badges.includes(b.key);
                return (
                  <div
                    key={b.key}
                    className={`rounded-[10px] p-2.5 flex flex-col items-center gap-1 border ${
                      unlocked
                        ? "bg-amber-50 border-amber-200"
                        : "bg-[#f7f6f3] border-[#e8e5de] opacity-40"
                    }`}
                  >
                    <span className="text-[22px] leading-none">{b.icon}</span>
                    <span
                      className={`text-[10.5px] font-medium text-center ${unlocked ? "text-amber-800" : "text-[#9e9890]"}`}
                    >
                      {b.name}
                    </span>
                    {unlocked ? (
                      <span className="text-[9.5px] font-semibold bg-[#eaf3de] text-[#27500a] border border-[#97c459] px-1.5 py-0.5 rounded-full">
                        unlocked
                      </span>
                    ) : (
                      <span className="text-[9.5px] text-[#c4bfb6]">
                        {b.need} xp
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>


          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-[#1a1916]">
                Streak
              </span>
              <span className="text-[11.5px] text-[#9e9890]">Last 7 days</span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-[28px] font-semibold text-[#1a1916] tracking-[-0.5px] leading-none">
                {streak}
              </span>
              <span className="text-[13px] text-[#9e9890]">day streak 🔥</span>
            </div>
            <div className="flex gap-1.5">
              {streakDays.map((d, i) => (
                <div
                  key={i}
                  className={`flex-1 h-7 rounded-[5px] flex items-center justify-center text-[9.5px] font-semibold ${
                    d.status === "today"
                      ? "bg-violet-600 text-white"
                      : d.status === "done"
                        ? "bg-[#eeedfe] text-[#7c3aed]"
                        : "bg-[#f0ede6] text-[#c4bfb6]"
                  }`}
                >
                  {d.label}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#9e9890] mt-2.5">
              {streak > 0
                ? "Keep it up — complete a task today!"
                : "Complete a task to start your streak!"}
            </p>
          </div>
        </div>

        {recentTasks.length > 0 && (
          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-[#1a1916]">
                Recent activity
              </span>
              <span className="text-[11.5px] text-[#9e9890]">
                Last {recentTasks.length} tasks
              </span>
            </div>
            <div className="flex flex-col divide-y divide-[#f0ede6]">
              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="w-4 h-4 rounded-[4px] bg-[#1a1916] flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="#f7f6f3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="flex-1 text-[13px] text-[#6b6760] truncate">
                    {task.content}
                  </span>
                  <span className="text-[11px] text-[#c4bfb6] flex-shrink-0">
                    {dayjs(task.updatedAt).fromNow()}
                  </span>
                  <span className="text-[11px] font-bold bg-[#eeedfe] border border-[#afa9ec] text-[#7c3aed] px-2 py-0.5 rounded-full flex-shrink-0">
                    +10 XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
