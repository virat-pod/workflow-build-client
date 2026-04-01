"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useContext } from "react";
import Image from "next/image";
import { NotificationContext } from "@/lib/contexts/serviceContext";

const BADGES = [
  { icon: "🥉", name: "Starter", key: "starter", need: 100 },
  { icon: "🥈", name: "Builder", key: "builder", need: 200 },
  { icon: "🥇", name: "Pro", key: "pro", need: 500 },
  { icon: "💎", name: "Elite", key: "elite", need: 1000 },
];

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const { showNotification } = useContext(NotificationContext);
  const fileRef = useRef(null);

  const [name, setName] = useState(session?.user?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const userEmail = session?.user?.email ?? "";
  const xp = session?.user?.xp ?? 0;
  const badges = session?.user?.badges ?? [];
  const email = session?.user?.email ?? "";
  const uid = session?.user?.uid ?? "";
  const image = session?.user?.image ?? null;

  const handleSave = async (profile) => {

    if (!name.trim() && !profile) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/update`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userEmail,
            name: name.trim(),
            profile
          }),
        },
      );
      console.log("res", res)
      const data = await res.json();
      console.log("data", data)
      if (data.success) {
        await update({
          ...session,
          user: { ...session.user, name: name.trim(), image: profile },
        });
      }

    } catch (e) {
      showNotification(`something went wrong ${e}`, "error");
      console.log(e)
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${uid}/delete`, { method: "DELETE" });
      await signOut({ callbackUrl: "/" });
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSaving(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Workflow builder");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dt4qdszmp/image/upload`,
      { method: "POST", body: formData },
    );
    const data = await res.json();

    const squareUrl = data.secure_url.replace(
      "/upload/",
      "/upload/c_pad,w_500,h_500,b_auto/",
    );
    await handleSave(squareUrl);
  };

  return (
    <div className="bg-[#f7f6f3] min-h-[calc(100vh-58px)] px-5 md:px-8 sm:py-21.5 py-24 pb-22 sm:pb-18">
      <div className="max-w-[600px] mx-auto flex flex-col gap-2">
    
        <div className="mb-4">
          <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] mb-2">
            Account
          </p>
          <h1
            className="text-[28px] md:text-[32px] font-normal leading-tight tracking-[-0.8px] text-[#1a1916]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your <em className="italic text-violet-600">settings.</em>
          </h1>
        </div>

   
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-0.5">
            Profile
          </p>
          <div className="bg-white border border-[#e8e5de] rounded-[14px] overflow-hidden">
        
            <div className="flex items-center gap-4 px-5 py-4 border-b border-[#f0ede6]">
              <span className="text-[13px] font-semibold text-[#9e9890] w-20 flex-shrink-0">
                Photo
              </span>
              <div className="relative">
                {image ? (
                  <Image
                    src={image}
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white text-[18px] font-semibold">
                    {name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 w-[18px] h-[18px] bg-[#1a1916] rounded-full border-2 border-white flex items-center justify-center"
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M7 1l2 2-5 5H2V6l5-5z"
                      stroke="#f7f6f3"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <input
                  ref={fileRef}
                  onChange={handleProfile}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="ml-auto text-[12.5px] text-violet-600 font-medium"
              >
                Change photo
              </button>
            </div>

            
            <div className="px-5 py-4 border-b border-[#f0ede6]">
              <p className="text-[11.5px] font-semibold text-[#9e9890] mb-1.5">
                Display name
              </p>
              <input
                value={name}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 14) {
                    setName(val);
                  } else {
                    showNotification("Can't be greater than 14 digits");
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Your name"
                className="w-full bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2.5 text-[13.5px] text-[#1a1916] outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all font-[inherit]"
              />
            </div>

   
            <div className="px-5 py-4 border-b border-[#f0ede6]">
              <p className="text-[11.5px] font-semibold text-[#9e9890] mb-1.5">
                Email
                <span className="text-[10px] text-[#b5b0a7] font-normal ml-1.5">
                  · cannot be changed
                </span>
              </p>
              <input
                value={email}
                disabled
                className="w-full bg-[#f7f6f3] border border-[#e8e5de] rounded-[8px] px-3 py-2.5 text-[13.5px] text-[#9e9890] outline-none cursor-not-allowed font-[inherit]"
              />
            </div>

            <div className="px-5 py-4">
              <button
                onClick={()=> {handleSave()}}
                disabled={
                  saving || !name.trim() || name === session?.user?.name
                }
                className="bg-[#1a1916] text-[#f7f6f3] text-[13px] font-semibold px-5 py-2.5 rounded-[8px] hover:bg-[#2d2b27] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>

   
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-0.5">
            Badge wallet
          </p>
          <div className="bg-white border border-[#e8e5de] rounded-[14px] overflow-hidden">
            <div className="grid grid-cols-4 gap-2 p-4">
              {BADGES.map((b) => {
                const unlocked = badges.includes(b.key);
                return (
                  <div
                    key={b.key}
                    className={`rounded-xl p-3 py-1.5 sm:py-3 flex flex-col items-center gap-1.5 border ${
                      unlocked
                        ? "bg-amber-50 border-amber-200"
                        : "bg-[#f7f6f3] border-[#e8e5de] opacity-45"
                    }`}
                  >
                    <span className="text-[26px] leading-none">{b.icon}</span>
                    <span
                      className={`text-[11px] font-semibold ${unlocked ? "text-amber-800" : "text-[#9e9890]"}`}
                    >
                      {b.name}
                    </span>
                    {unlocked ? (
                      <span className="text-[9px] font-semibold bg-[#eaf3de] text-[#27500a] border border-[#97c459] px-1.5 py-0.5 rounded-full">
                        ✓ <span className="hidden sm:inline">earned</span>
                      </span>
                    ) : (
                      <span className="text-[8px] text-[#c4bfb6] bg-[#f0ede6] px-1.5 py-0.5 rounded-full">
                        {b.need} xp
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-4 pb-4 flex items-center justify-between">
              <p className="text-[12px] text-[#9e9890]">
                {badges.length} of 4 badges earned
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-[#9e9890]">Current XP:</span>
                <span className="text-[12.5px] font-semibold text-violet-600">
                  {xp} xp
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#c4bfb6] px-0.5">
            Danger zone
          </p>
          <div className="bg-white border border-red-200 rounded-[14px] overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[13.5px] font-semibold text-[#1a1916] mb-1">
                  Delete account
                </p>
                <p className="text-[12px] text-[#9e9890] leading-relaxed">
                  Permanently delete your account, XP, and all tasks. This
                  cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-50 border border-red-200 text-red-600 text-[12.5px] font-semibold px-3.5 py-2 rounded-[8px] hover:bg-red-100 transition-colors flex-shrink-0"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>


      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm z-10 border border-[#e8e5de]">
            <h3 className="text-[16px] font-semibold text-[#1a1916] mb-2">
              Delete account?
            </h3>
            <p className="text-[13px] text-[#6b6760] leading-relaxed mb-5">
              This will permanently delete your account, all your tasks, XP, and
              badges. There is no going back.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-[#f7f6f3] border border-[#e8e5de] text-[#1a1916] text-[13px] font-medium py-2.5 rounded-[8px] hover:bg-[#f0ede6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white text-[13px] font-semibold py-2.5 rounded-[8px] hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
