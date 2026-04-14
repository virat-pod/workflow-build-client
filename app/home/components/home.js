"use client";

import { useSession } from "next-auth/react";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { NotificationContext } from "@/lib/contexts/serviceContext";

const XP_MILESTONES = [
  { icon: "🏁", label: "0", reached: true },
  { icon: "🥉", label: "100", reached: false },
  { icon: "🥈", label: "200", reached: false },
  { icon: "🥇", label: "500", reached: false },
  { icon: "💎", label: "1000", reached: false },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getNextBadge(badges = []) {
  const tiers = [
    { icon: "🥉", key: "starter", need: 100 },
    { icon: "🥈", key: "builder", need: 200 },
    { icon: "🥇", key: "pro", need: 500 },
    { icon: "💎", key: "elite", need: 1000 },
  ];


  const next = tiers.find((t) => !badges.includes(t.key));
  if (!next) return null; 

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

export default function HomePage({ Alltasks = [], completedTodayTask = [] }) {
  const { data: session, update } = useSession();
  const [tasks, setTasks] = useState(Alltasks);
  const [completedToday, setcompletedToday] = useState(completedTodayTask);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [mobileTasksOpen, setMobileTasksOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [completingId, setCompletingId] = useState(false);
  const [editTasks, seteditTasks] = useState(null);

  const xp = session?.user?.xp ?? 0;
  const name = session?.user?.name ?? "there";
  const badges = session?.user?.badges ?? [];
  const nextBadge = getNextBadge(badges);
  const barWidth = getXPBarWidth(xp);
  const tasksCompletedCount = session?.user?.tasksCompleted ?? 0;
  const { showNotification } = useContext(NotificationContext);

  const pending = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  const handleAddTask = async (editId) => {
    if (!input.trim() || adding) {
      adding && showNotification("Don't spam pls!");
      return;
    }
    setAdding(true);
    if (editId) {
      editTask(editId);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: input.trim(),
          user: session?.user?.email,
        }),
      });
      const data = await res.json();
      setInput("");
      setTasks((prev) => [...prev, data.result]);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setAdding(false);
      }, 700);
    }
  };

  const handleComplete = async (taskId) => {
    if (completingId) return;

    setCompletingId(true);

    try {
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, completed: true } : t)),
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/todo/${taskId}/complete`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: session?.user?.email }),
        },
      );
      const data = await res.json();

      await update({
        ...session,
        user: {
          ...session.user,
          xp: (session.user.xp ?? 0) + data.xp,
          tasksCompleted:
            (session.user.tasksCompleted ?? 0) + (data.xp > 0 ? 1 : -1),
          streak: data.streak ? data.streak : (session.user.streak ?? 0),
        },
      });

      setTasks((prev) =>
        prev.map((item) =>
          item._id === data?.data?._id
            ? { ...item, completed: data.data.completed }
            : item,
        ),
      );

      if (data.data.completed) {
        setcompletedToday((prev) => {
          const exists = prev.some((t) => t._id === data.data._id);
          if (exists) return prev;
          return [...prev, data.data];
        });
      } else {
        setcompletedToday((prev) =>
          prev.filter((t) => t._id !== data.data._id),
        );
      }
    } catch (e) {
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, completed: false } : t)),
      );
    } finally {
      setCompletingId(false);
    }
  };

  const editTask = async (taskId) => {
    if (!input.trim()) return;
    let oldValue;
    try {
      oldValue = tasks.find((t) => t._id === taskId);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, content: input } : t)),
      );
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/${taskId}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });
      setInput("");
      setAdding(false);
      seteditTasks(false);
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, content: oldValue.content } : t,
        ),
      );
      showNotification(`An error occurred: ${err}`, "error");
      seteditTasks(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      showNotification("an error occured", err);
    }
  };

  return (
    <div className="flex sm:justify-center min-h-[calc(100vh-58px)] pt-16 bg-[#f7f6f3]">
    
      <aside className="hidden md:flex flex-col md:w-[18rem] lg:w-[24rem] flex-shrink-0 bg-white border border-[#e8e5de] p-4 gap-4 sticky top-[58px] h-[calc(100vh-68px)] rounded-xl overflow-y-auto custom-scroll">
        <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-2">
          Today's tasks
        </p>


        <div className="flex items-center gap-2 bg-[#f7f6f3] border border-[#e8e5de] rounded-[10px] px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (editTasks ? handleAddTask(editTasks) : handleAddTask())
            }
            placeholder="Add a new task..."
            className="flex-1 bg-transparent text-[13.5px] text-[#1a1916] placeholder:text-[#b5b0a7] outline-none font-[inherit]"
          />
          <button
            onClick={() => {
              editTasks ? handleAddTask(editTasks) : handleAddTask();
            }}
            disabled={adding || !input.trim()}
            className="w-7 h-7 bg-[#1a1916] rounded-[7px] flex items-center justify-center flex-shrink-0 hover:bg-[#2d2b27] transition-colors disabled:opacity-40"
          >
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 2v6M2 5h6"
                stroke="#f7f6f3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {pending.map((task) => (
            <div key={task._id} className="relative group/item">
              <button
                onClick={() => handleComplete(task._id)}
                disabled={completingId}
                className="flex items-center gap-2 px-2 py-2 rounded-[8px] hover:bg-[#f7f6f3] transition-colors w-full text-left group disabled:opacity-50"
              >
                <div className="w-4 h-4 rounded-[4px] border-[1.5px] border-[#d1cfc8] flex-shrink-0 group-hover:border-violet-400 transition-colors" />
                <span className="flex-1 text-[13px] text-[#1a1916] break-words">
                  {task.content}
                </span>
                {/* +10 — hover pe hide */}
                <span className="text-[11px] font-semibold text-[#c4bfb6] group-hover/item:opacity-0 transition-opacity flex-shrink-0">
                  +10
                </span>
              </button>

    
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === task._id ? null : task._id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover/item:opacity-100 hover:bg-[#e8e5de] transition-all"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="1.2" fill="#9e9890" />
                  <circle cx="8" cy="8" r="1.2" fill="#9e9890" />
                  <circle cx="8" cy="13" r="1.2" fill="#9e9890" />
                </svg>
              </button>

              {/* dropdown */}
              {openMenuId === task._id && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenMenuId(null)}
                  />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-[#e8e5de] rounded-[10px] shadow-sm overflow-hidden w-40">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInput(task.content + " ");
                        seteditTasks(task._id);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-[13px] text-[#1a1916] hover:bg-[#f7f6f3] transition-colors"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M11 2l3 3-8 8H3v-3l8-8z"
                          stroke="#6b6760"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Edit task
                    </button>

                    <div className="h-[0.5px] bg-[#f0ede6]" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(task.content);
                        showNotification("Copied");
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-[13px] text-[#1a1916] hover:bg-[#f7f6f3] transition-colors"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <rect
                          x="5"
                          y="5"
                          width="8"
                          height="8"
                          rx="1.5"
                          stroke="#6b6760"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M3 11V3h8"
                          stroke="#6b6760"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Copy content
                    </button>

                    <div className="h-[0.5px] bg-[#f0ede6]" />

      
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(task._id);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 4h10M6 4V2h4v2M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4"
                          stroke="#ef4444"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Delete task
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {done.length > 0 && (
          <div className="flex flex-col gap-0.5 pt-1">
            <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-1 mb-0.5">
              Done · {done.length}
            </p>
            {done.map((task) => (
              <div
                key={task._id}
                className="flex items-center gap-2.5 px-2 py-2.5 opacity-50"
              >
                <div className="w-4 h-4 rounded-[4px] bg-[#1a1916] border-[1.5px] border-[#1a1916] flex items-center justify-center flex-shrink-0">
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
                <span className="flex-1 w-fit text-[13px] text-[#b5b0a7] line-through break-all">
                  {task.content}
                </span>
                <span className="text-[11px] font-semibold text-[#c4bfb6]">
                  +10
                </span>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="flex-1 pb-18 lg:pb-0 px-6 md:px-8 py-7 flex flex-col gap-5 max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] md:text-2xl lg:text-3xl font-semibold text-[#1a1916] tracking-[-0.4px]">
              {getGreeting()}, {name} 👋
            </h1>
            <p className="text-[13.5px] text-lg text-[#9e9890] mt-1">
              {pending.length > 0
                ? `You have ${pending.length} task${pending.length > 1 ? "s" : ""} pending. Let's get them done.`
                : "All tasks done for today. Amazing work!"}
            </p>
          </div>
        </div>

   
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total XP",
              value: xp,
              sub: nextBadge
                ? `${nextBadge.need - xp} away from ${nextBadge.icon}`
                : "Max rank reached!",
            },
            {
              label: "Tasks done",
              value: tasksCompletedCount,
              sub: `${done.length} completed today`,
            },
            {
              label: "Streak",
              value: session?.user?.streak ?? 0,
              sub: "days in a row 🔥",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-[#e8e5de] rounded-xl p-2.5 md:pr-8 py-3.5"
            >
              <p className="text-[9px] md:text-[11px] font-semibold tracking-[1.2px] uppercase text-[#c4bfb6] mb-1.5">
                {s.label}
              </p>
              <p className="text-[24px] font-semibold text-[#1a1916] tracking-[-0.5px] leading-none">
                {s.value}
              </p>
              <p className="text-[8px] md:text-[12px] text-[#9e9890] mt-1.5">
                {s.sub}
              </p>
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
          <div className="h-[6px] bg-[#f0ede6] rounded-full overflow-hidden mb-2.5">
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

     
        {completedToday.length > 0 && (
          <div className="bg-white border border-[#e8e5de] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-[#1a1916]">
                Completed today
              </span>
              <span className="bg-[#eaf3de] border border-[#97c459] text-[#27500a] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                +{completedToday.length * 10} XP earned
              </span>
            </div>
            <div className="flex flex-col">
              {completedToday.map((task, i) => (
                <div
                  key={task._id}
                  className={`flex items-center gap-2.5 py-2 ${i !== completedToday.length - 1 ? "border-b border-[#f0ede6]" : ""}`}
                >
                  <button
                    onClick={() => {
                      handleComplete(task._id);
                    }}
                    disabled={completingId}
                    className="w-[15px] h-[15px] disabled:opacity-50 rounded-[3px] bg-[#1a1916] hover:bg-[#3b3937] border-[1.5px] border-[#1a1916] flex items-center justify-center flex-shrink-0"
                  >
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="#f7f6f3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="flex-1 w-fit text-[13px] text-[#b5b0a7] line-through break-all">
                    {task.content}
                  </span>
                  <span className="text-[11px] font-bold bg-[#eeedfe] border border-[#afa9ec] text-[#7c3aed] px-2 py-0.5 rounded-full">
                    +10 XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

    
      <button
        onClick={() => setMobileTasksOpen(true)}
        className="md:hidden fixed bottom-20 right-5 z-30 w-12 h-12 bg-[#1a1916] rounded-full flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 10 10" fill="none">
          <path
            d="M5 2v6M2 5h6"
            stroke="#f7f6f3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {mobileTasksOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileTasksOpen(false)}
          />
          <div className="relative bg-white rounded-t-2xl px-4 pt-4 pb-8 flex flex-col gap-3 max-h-[75vh] overflow-y-auto z-50">
            <div className="w-10 h-1 bg-[#e8e5de] rounded-full mx-auto mb-1" />
            <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-1">
              Today's tasks
            </p>

    
            <div className="flex items-center gap-2 bg-[#f7f6f3] border border-[#e8e5de] rounded-[10px] px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (editTasks ? handleAddTask(editTasks) : handleAddTask())
                }
                placeholder="Add a new task..."
                className="flex-1 bg-transparent text-[13.5px] text-[#1a1916] placeholder:text-[#b5b0a7] outline-none font-[inherit]"
              />
              <button
                onClick={() => {
                  editTasks ? handleAddTask(editTasks) : handleAddTask();
                }}
                disabled={adding || !input.trim()}
                className="w-7 h-7 bg-[#1a1916] rounded-[7px] flex items-center justify-center flex-shrink-0 hover:bg-[#2d2b27] transition-colors disabled:opacity-40"
              >
                <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 2v6M2 5h6"
                    stroke="#f7f6f3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

        
            {pending.length === 0 ? (
              <p className="text-center py-6 text-[13px] text-[#b5b0a7]">
                No pending tasks 🎉
              </p>
            ) : (
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-1 mb-0.5">
                  Pending · {pending.length}
                </p>
                {pending.map((task) => (
                  <div key={task._id} className="relative group/item">
                    <button
                      onClick={() => handleComplete(task._id)}
                      disabled={completingId}
                      className="flex items-center gap-2 px-2 pr-8 py-2 rounded-[8px] hover:bg-[#f7f6f3] transition-colors w-full text-left group disabled:opacity-50"
                    >
                      <div className="w-4 h-4 rounded-[4px] border-[1.5px] border-[#d1cfc8] flex-shrink-0 group-hover:border-violet-400 transition-colors " />{" "}
                      <span className="flex-1 text-[13px] text-[#1a1916] break-all">
                        {task.content}
                      </span>
                    </button>

                  
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(
                          openMenuId === task._id ? null : task._id,
                        );
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center hover:bg-[#e8e5de] transition-all"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="3" r="1.2" fill="#9e9890" />
                        <circle cx="8" cy="8" r="1.2" fill="#9e9890" />
                        <circle cx="8" cy="13" r="1.2" fill="#9e9890" />
                      </svg>
                    </button>

               
                    {openMenuId === task._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-8 -top-14 mt-1 z-20 bg-white border border-[#e8e5de] rounded-[10px] shadow-sm overflow-hidden w-40">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInput(task.content + " ");
                              seteditTasks(task._id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-[13px] text-[#1a1916] hover:bg-[#f7f6f3] transition-colors"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M11 2l3 3-8 8H3v-3l8-8z"
                                stroke="#6b6760"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Edit task
                          </button>

                          <div className="h-[0.5px] bg-[#f0ede6]" />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(task.content);
                              showNotification("Copied");
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-[13px] text-[#1a1916] hover:bg-[#f7f6f3] transition-colors"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <rect
                                x="5"
                                y="5"
                                width="8"
                                height="8"
                                rx="1.5"
                                stroke="#6b6760"
                                strokeWidth="1.4"
                              />
                              <path
                                d="M3 11V3h8"
                                stroke="#6b6760"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Copy content
                          </button>

                          <div className="h-[0.5px] bg-[#f0ede6]" />

                          {/* delete */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(task._id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M3 4h10M6 4V2h4v2M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4"
                                stroke="#ef4444"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Delete task
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

         
            {done.length > 0 && (
              <div className="flex flex-col gap-0.5 pt-1">
                <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-1 mb-0.5">
                  Done · {done.length}
                </p>
                {done.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center gap-2.5 px-2 py-1 opacity-50"
                  >
                    <div className="w-4 h-4 rounded-[4px] bg-[#1a1916] border-[1.5px] border-[#1a1916] flex items-center justify-center flex-shrink-0">
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
                    <span className="flex-1 w-fit text-[13px] text-[#b5b0a7] line-through break-all">
                      {task.content}
                    </span>
                    <span className="text-[11px] font-semibold text-[#c4bfb6]">
                      +10
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
