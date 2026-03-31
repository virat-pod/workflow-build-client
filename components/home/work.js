import Link from "next/link";

const STEPS = [
  {
    num: "01",
    colorClass: {
      wrap: "bg-[#eeedfe] border-[#afa9ec] text-[#3c3489]",
    },
    title: "Add your tasks",
    desc: "Type what you need to get done. Each task is worth 10 XP when completed — no exceptions.",
    visual: "add",
  },
  {
    num: "02",
    colorClass: {
      wrap: "bg-[#faeeda] border-[#ef9f27] text-[#633806]",
    },
    title: "Complete & earn XP",
    desc: "Mark a task done and instantly earn 10 XP. Watch your progress bar fill up in real time.",
    visual: "complete",
  },
  {
    num: "03",
    colorClass: {
      wrap: "bg-[#eaf3de] border-[#97c459] text-[#27500a]",
    },
    title: "Unlock badges",
    desc: "Hit 100 XP and earn your first badge. Keep grinding for Builder, Pro, and the Elite diamond.",
    visual: "badges",
  },
];

const BADGES = [
  { icon: "🥉", label: "Starter", active: true },
  { icon: "🥈", label: "Builder", active: false },
  { icon: "🥇", label: "Pro", active: false },
  { icon: "💎", label: "Elite", active: false },
];

function VisualAdd() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Input row */}
      <div className="bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2.5 flex items-center gap-2">
        <span className="flex-1 text-[13px] text-[#b5b0a7]">
          Design the dashboard UI
        </span>
        <span className="text-[11.5px] font-semibold bg-[#eeedfe] border border-[#afa9ec] text-[#3c3489] px-2 py-0.5 rounded-full">
          +10 xp
        </span>
        <div className="w-6 h-6 rounded-[6px] bg-[#1a1916] flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 2v6M2 5h6"
              stroke="#f7f6f3"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {/* Task rows */}
      {["Fix the nav scroll bug", "Write unit tests"].map((t) => (
        <div
          key={t}
          className="bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2 flex items-center gap-2"
        >
          <div className="w-[15px] h-[15px] rounded-[3px] border-[1.5px] border-[#d1cfc8] flex-shrink-0" />
          <span className="flex-1 text-[12.5px] text-[#1a1916]">{t}</span>
          <span className="text-[11.5px] font-medium text-[#9e9890]">
            +10 xp
          </span>
        </div>
      ))}
    </div>
  );
}

function VisualComplete() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Done row */}
      <div className="bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2 flex items-center gap-2">
        <div className="w-[15px] h-[15px] rounded-[3px] bg-[#1a1916] border-[1.5px] border-[#1a1916] flex items-center justify-center flex-shrink-0">
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
        <span className="flex-1 text-[12.5px] text-[#b5b0a7] line-through">
          Fix the nav scroll bug
        </span>
        <span className="text-[11px] font-bold bg-[#eeedfe] border border-[#afa9ec] text-[#7c3aed] px-2 py-0.5 rounded-full">
          +10 XP
        </span>
      </div>
      {/* Pending row */}
      <div className="bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2 flex items-center gap-2">
        <div className="w-[15px] h-[15px] rounded-[3px] border-[1.5px] border-[#d1cfc8] flex-shrink-0" />
        <span className="flex-1 text-[12.5px] text-[#1a1916]">
          Write unit tests
        </span>
        <span className="text-[11.5px] font-medium text-[#9e9890]">+10 xp</span>
      </div>
      {/* Progress bar */}
      <div className="pt-1">
        <div className="flex justify-between mb-1.5">
          <span className="text-[11.5px] text-[#9e9890]">Progress</span>
          <span className="text-[11.5px] font-semibold text-violet-600">
            40 / 100 XP
          </span>
        </div>
        <div className="h-[5px] bg-[#f0ede6] rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-600 rounded-full"
            style={{ width: "40%" }}
          />
        </div>
      </div>
    </div>
  );
}

function VisualBadges() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Badge grid */}
      <div className="grid grid-cols-4 gap-2">
        {BADGES.map((b) => (
          <div
            key={b.label}
            className={`rounded-[10px] p-2.5 flex flex-col items-center gap-1 border ${
              b.active
                ? "bg-amber-50 border-amber-200"
                : "bg-[#f7f6f3] border-[#e8e5de]"
            }`}
          >
            <span className="text-[22px] leading-none">{b.icon}</span>
            <span
              className={`text-[10.5px] font-medium ${b.active ? "text-amber-800" : "text-[#9e9890]"}`}
            >
              {b.label}
            </span>
            {b.active && (
              <span className="text-[10px] font-semibold bg-[#eaf3de] text-[#27500a] border border-[#97c459] px-1.5 py-0.5 rounded-full">
                unlocked
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Unlock notification */}
      <div className="bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[8px] bg-amber-50 border border-amber-200 flex items-center justify-center text-[16px] flex-shrink-0">
          🥉
        </div>
        <div>
          <p className="text-[12.5px] font-semibold text-[#1a1916]">
            Starter badge unlocked!
          </p>
          <p className="text-[11.5px] text-[#9e9890]">
            You hit 100 XP. Keep going.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f7f6f3] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8e5de] px-3.5 py-1.5 rounded-full text-[12px] font-medium text-[#6b6760] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 flex-shrink-0" />
            how it works
          </div>
          <h2
            className="text-[42px] leading-[1.1] tracking-[-1px] font-normal text-[#1a1916] mb-3"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Three steps to
            <br />
            <em className="italic text-violet-600">
              actually get things done.
            </em>
          </h2>
          <p className="text-[16px] text-[#6b6760] max-w-[380px] mx-auto leading-relaxed">
            No complicated setup. Just tasks, XP, and the satisfaction of
            watching your rank grow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`relative ${i !== 2 ? "md:pr-8" : ""} ${i !== 0 ? "md:pl-8 md:border-l border-[#e8e5de]" : ""}`}
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[13px] font-semibold border flex-shrink-0 ${step.colorClass.wrap}`}
                >
                  {step.num}
                </div>
              </div>

              {/* Visual card */}
              <div className="bg-white border border-[#e8e5de] rounded-[14px] p-4 mb-5 min-h-[180px]">
                {step.visual === "add" && <VisualAdd />}
                {step.visual === "complete" && <VisualComplete />}
                {step.visual === "badges" && <VisualBadges />}
              </div>

              {/* Text */}
              <h3 className="text-[17px] font-semibold text-[#1a1916] tracking-[-0.3px] mb-2">
                {step.title}
              </h3>
              <p className="text-[13.5px] text-[#6b6760] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#1a1916] text-[#f7f6f3] text-[14px] font-medium px-6 py-3 rounded-[8px] hover:bg-[#2d2b27] transition-colors"
          >
            Start earning XP now →
          </Link>
          <p className="text-[12.5px] text-[#b5b0a7] mt-3">
            Free forever · open source · no credit card
          </p>
        </div>
      </div>
    </section>
  );
}
