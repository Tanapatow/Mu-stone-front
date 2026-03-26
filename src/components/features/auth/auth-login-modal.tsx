"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import LoginForm from "./login-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

function SocialBtn({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
        text-sm font-['Sarabun'] text-white/60 bg-white/5 border border-white/10
        transition-all duration-200 hover:bg-white/10 hover:text-white/80 active:scale-[0.98]"
    >
      {icon}
      {label}
    </button>
  );
}

export default function AuthModal({
  isOpen,
  onClose,
  onGoogleLogin,
  onAppleLogin,
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(6,8,26,0.8)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden flex"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.97) 0%, rgba(11,8,42,0.97) 100%)",
          border: "1px solid rgba(201,162,39,0.2)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,162,39,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left: Tarot card ── */}
        <div
          className="hidden md:flex relative w-60 shrink-0 items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, rgba(15,10,50,0.9) 0%, rgba(6,4,26,0.95) 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,162,39,0.08) 0%, transparent 70%)",
            }}
          />
          <Image
            src="/tarot-card.png"
            alt="Tarot card"
            width={200}
            height={300}
            className="relative z-10 w-full h-auto object-contain"
            style={{ filter: "drop-shadow(0 0 24px rgba(201,162,39,0.3))" }}
          />
        </div>

        {/* ── Right: Form ── */}
        <div className="flex-1 p-8 flex flex-col gap-5">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
              text-white/40 hover:text-white/80 hover:bg-white/8 transition-all duration-200"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div>
            <h2
              className="font-['Cinzel_Decorative'] text-xl text-gold-light mb-1"
              style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
            >
              {tab === "login" ? "ลงชื่อเข้าใช้" : "สร้างบัญชีใหม่"}
            </h2>
            <p className="text-xs text-white/35 font-['Sarabun']">
              {tab === "login"
                ? "ยินดีต้อนรับกลับสู่จักรวาล ✦"
                : "เริ่มต้นการเดินทางของคุณ ✦"}
            </p>
          </div>

          {/* Tab */}
          <div className="flex p-1 rounded-xl bg-white/5">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2 rounded-lg text-sm font-['Sarabun'] transition-all duration-200 active:scale-[0.98]"
                style={{
                  background:
                    tab === t
                      ? "linear-gradient(135deg, #c9a227, #7a5c0a)"
                      : "transparent",
                  color: tab === t ? "#0b0e2a" : "rgba(245,240,232,0.45)",
                  fontWeight: tab === t ? 700 : 400,
                  boxShadow:
                    tab === t ? "0 2px 12px rgba(201,162,39,0.25)" : "none",
                }}
              >
                {t === "login" ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
              </button>
            ))}
          </div>

          <LoginForm onSuccess={onClose} />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[rgba(201,162,39,0.12)]" />
            <span className="text-[11px] text-white/25 font-['Sarabun']">
              หรือ
            </span>
            <div className="flex-1 h-px bg-[rgba(201,162,39,0.12)]" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <SocialBtn
              label="Google"
              icon={<span className="font-bold">G</span>}
              onClick={onGoogleLogin}
            />
            <SocialBtn
              label="Apple"
              icon={<span></span>}
              onClick={onAppleLogin}
            />
          </div>

          {/* Switch tab */}
          <p className="text-center text-xs text-white/30 font-['Sarabun']">
            {tab === "login" ? "ยังไม่มีบัญชี? " : "มีบัญชีแล้ว? "}
            <button
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {tab === "login" ? "ลงทะเบียนฟรี" : "เข้าสู่ระบบ"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
