"use client"
const FEATURES = [
  {
    icon: "⚡",
    title: "Instant XP rewards",
    desc: "Complete a task, get XP immediately. No waiting, no sync delays.",
    color: "bg-[#eeedfe] border-[#afa9ec] text-[#7c3aed]",
  },
  {
    icon: "🏆",
    title: "Badge milestones",
    desc: "Unlock Starter, Builder, Pro, and Elite badges as you level up.",
    color: "bg-[#faeeda] border-[#ef9f27] text-[#854f0b]",
  },
  {
    icon: "📊",
    title: "Analytics insights",
    desc: "Track your growth and performance with simple stats.",
    color: "bg-[#e0f7fa] border-[#4dd0e1] text-[#006064]",
  },
  {
    icon: "📱",
    title: "Works everywhere",
    desc: "Desktop, tablet, phone — your tasks and XP sync across all devices.",
    color: "bg-[#fce4ec] border-[#f48fb1] text-[#880e4f]",
  },
  {
    icon: "🔒",
    title: "Privacy first",
    desc: "Your data stays yours. No tracking, no selling, no nonsense.",
    color: "bg-[#e3f2fd] border-[#64b5f6] text-[#1565c0]",
  },
  {
    icon: "🔄",
    title: "Daily streaks",
    desc: "Build momentum with streak tracking. Don't break the chain.",
    color: "bg-[#fff3e0] border-[#ffb74d] text-[#e65100]",
  },
];


const Features = () => {
  return <section id="features" className="px-6 py-10">
  <div className="max-w-5xl mx-auto">
    
    {/* Header */}
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 bg-[#f7f6f3] border border-[#e8e5de] px-3.5 py-1.5 rounded-full text-[12px] font-medium text-[#6b6760] mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-600 flex-shrink-0" />
        features
      </div>

      <h2
        className="text-[42px] flex flex-col leading-[1.1] tracking-[-1px] font-normal text-[#1a1916] mb-3"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Everything you need,
        <em className="italic text-violet-600">nothing you don't.</em>
      </h2>

      <p className="text-[16px] text-[#6b6760] max-w-[400px] mx-auto leading-relaxed">
        Built for focus. No bloat, no distractions — just the tools to help you ship.
      </p>
    </div>

    {/* Feature grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {FEATURES.map((feature) => {

        return (
          <div
            key={feature.title}
            className="bg-[#f7f6f3] border border-[#e8e5de] rounded-[14px] p-5 hover:border-[#d1cfc8] transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-[10px] border flex items-center justify-center mb-4 ${feature.color}`}
            >
              <span>{feature.icon}</span>
            </div>

            <h3 className="text-[16px] font-semibold text-[#1a1916] tracking-[-0.3px] mb-1.5">
              {feature.title}
            </h3>

            <p className="text-[13.5px] text-[#6b6760] leading-relaxed">
              {feature.desc}
            </p>
          </div>
        );
      })}
    </div>

  </div>
</section>
}

export default Features;
