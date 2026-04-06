"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

type Tab = "login" | "signup";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TAB_CONFIG: Record<
  Tab,
  {
    heading: string;
    subheading: string;
    switchText: string;
    switchLabel: string;
  }
> = {
  login: {
    heading: "ลงชื่อเข้าใช้",
    subheading: "ยินดีต้อนรับกลับสู่จักรวาล ✦",
    switchText: "ยังไม่มีบัญชี? ",
    switchLabel: "ลงทะเบียนฟรี",
  },
  signup: {
    heading: "สร้างบัญชีใหม่",
    subheading: "เริ่มต้นการเดินทางของคุณ ✦",
    switchText: "มีบัญชีแล้ว? ",
    switchLabel: "เข้าสู่ระบบ",
  },
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("login");
  const config = TAB_CONFIG[tab];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(6,8,26,0.8)] backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden flex bg-[linear-gradient(160deg,rgba(26,20,74,0.97)_0%,rgba(11,8,42,0.97)_100%)] border border-[rgba(201,162,39,0.2)] shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left */}
        <div className="hidden md:flex relative w-60 shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(160deg,rgba(15,10,50,0.9)_0%,rgba(6,4,26,0.95)_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)]" />

          <Image
            src="/tarot-card.png"
            alt="Tarot card"
            width={200}
            height={300}
            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_24px_rgba(201,162,39,0.3)]"
            priority
          />
        </div>

        {/* Right */}
        <div className="flex-1 p-8 flex flex-col gap-5 overflow-y-auto max-h-screen">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div>
            <h2 className="font-sarabun text-xl mb-1 text-[--color-gold-light] drop-shadow-[0_0_24px_rgba(201,162,39,0.35)]">
              {config.heading}
            </h2>

            <p className="text-xs text-white/35 font-sarabun">
              {config.subheading}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 rounded-xl bg-white/5">
            {(["login", "signup"] as Tab[]).map((t) => {
              const isActive = tab === t;

              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-lg text-lg font-sarabun transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#c9a227,#7a5c0a)] text-navy font-bold shadow-[0_2px_12px_rgba(201,162,39,0.25)]"
                      : "text-white/50"
                  }`}
                >
                  {t === "login" ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                </button>
              );
            })}
          </div>

          {/* Forms */}
          {tab === "login" ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <RegisterForm onSuccess={onClose} />
          )}

          {/* Switch */}
          <p className="text-center text-xs text-white/30 font-sarabun">
            {config.switchText}
            <button
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-gold hover:text-[--color-gold-light] transition-colors"
            >
              {config.switchLabel}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
