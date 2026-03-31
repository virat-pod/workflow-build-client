"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useContext } from "react";
import Link from "next/link";
import { NotificationContext } from "@/lib/contexts/serviceContext";

export default function Auth({ auth }) {
  const [loadings, setloadings] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmail, setshowEmail] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const handleLogin = async () => {
    setloadings(true);
    const result = await signIn("email", {
      email,
      redirect: false,
    });
    setloadings(false);
    if (result?.ok) {
      setEmail("");
      setshowEmail(true);
      showNotification("We have sent you an email, please verify that is you!");
    } else {
      setshowEmail(false);
      showNotification("Something went wrong", "error");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[400px]">
        <div className="bg-white border border-[#e8e5de] rounded-[16px] p-6 pt-2">
          <div className="title py-3.5 text-center">
            {auth.title ? (
              <h1 className="text-3xl flex flex-col gap-1.5 py-1 font-medium font-serif">
                {auth.title}
                <span className="text-[14px] text-[#6b6760] tracking-wide">
                  {auth.whatis}
                </span>{" "}
              </h1>
            ) : (
              <p className="text-[14px] text-[#6b6760]">{auth.whatis}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 pb-2">
            <button
              type="button"
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/home",
                });
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#f7f6f3] border border-[#e8e5de] rounded-[10px] px-4 py-3 text-[14px] font-medium text-[#1a1916] hover:border-[#d1cfc8] hover:bg-[#f0ede6] transition-all"
            >
              <object data="/svg-icons/google.svg" className="w-6 h-6"></object>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => {
                signIn("github", {
                  callbackUrl: "/home",
                });
              }}
              className="w-full flex items-center justify-center gap-3 bg-[#1a1916] border border-[#1a1916] rounded-[10px] px-4 py-3 text-[14px] font-medium text-[#f7f6f3] hover:bg-[#2d2b27] transition-all"
            >
              <object
                data="/svg-icons/github.svg"
                className="w-6 h-6 invert"
              ></object>
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-[#e8e5de]" />
            <span className="text-[12px] text-[#9e9890] font-medium">or</span>
            <div className="flex-1 h-px bg-[#e8e5de]" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              email.trim() && handleLogin();
            }}
          >
            <div>
              <label className="block text-[12px] font-medium text-[#6b6760] mb-1.5">
                Email
              </label>{" "}
              <input
                disabled={loadings}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#f7f6f3] border border-[#e8e5de] rounded-[10px] px-4 py-3 text-[14px] text-[#1a1916] placeholder:text-[#b5b0a7] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                required
              />
            </div>
            <div></div>
            {showEmail ? (
              <div className="flex mt-2.5 items-center gap-3 bg-[#eaf3de] border border-[#97c459] px-4 py-3 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#c0dd97] flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"
                      stroke="#27500a"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 4l6 5 6-5"
                      stroke="#27500a"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#27500a]">
                    Check your email
                  </p>
                  <p className="text-[12px] text-[#3b6d11]">
                    Login link sent — check your inbox
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={loadings}
                className="w-full cursor-pointer bg-violet-600 text-white rounded-[10px] px-4 py-3 text-[14px] font-semibold hover:bg-violet-700 transition-colors mt-2"
              >
                {auth.button}
              </button>
            )}
          </form>
        </div>

        <p className="text-center text-[13px] text-[#9e9890] mt-6">
          {auth.value}{" "}
          <Link
            href={auth.action === "login" ? "/login" : "/signup"}
            className="text-violet-600 font-medium hover:underline"
          >
            {auth.action}
          </Link>
        </p>
      </div>
      {loadings && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
          <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </main>
  );
}
