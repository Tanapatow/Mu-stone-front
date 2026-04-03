"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader } from "lucide-react";
import type { ChatMessage } from "@/lib/api/chat/chat.type";
import { getChatSocket, disconnectChatSocket } from "@/lib/socket/chat-socket";
import type { Socket } from "socket.io-client";

type ChatBoxProps = {
  token: string;
  userId: string;
  firstName: string;
};

export default function ChatBox({ token, userId, firstName }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = getChatSocket(token);
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_chat", {});
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("joined_room", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
    });

    socket.on("chat_history", (history: ChatMessage[]) => {
      setMessages(history);
    });

    socket.on("receive_message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      disconnectChatSocket();
    };
  }, [token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !roomId || !socketRef.current) return;
    socketRef.current.emit("send_message", { roomId, content: input.trim() });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-2xl overflow-hidden border border-gold/15 bg-gradient-to-br from-[#1a144a]/70 to-[#0b082a]/80">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black/20">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-sm font-semibold text-gold font-['Sarabun']">
            {firstName[0]}
          </div>
          <div
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0b082a] ${connected ? "bg-green-400" : "bg-white/20"}`}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-cream font-['Sarabun']">
            แชทกับ Admin
          </p>
          <p className="text-xs text-white/40 font-['Sarabun']">
            {connected ? "ออนไลน์" : "กำลังเชื่อมต่อ..."}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 py-10">
            <p className="text-white/20 font-['Sarabun'] text-sm">
              ยังไม่มีข้อความ
            </p>
            <p className="text-white/15 font-['Sarabun'] text-xs">
              ส่งข้อความเพื่อเริ่มการสนทนา
            </p>
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.senderId === userId;
          const time = new Date(msg.createdAt).toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              {!isMe && (
                <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-semibold shrink-0 mt-1">
                  A
                </div>
              )}

              {/* Bubble */}
              <div
                className={`flex flex-col gap-1 max-w-[70%] ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm font-['Sarabun'] leading-relaxed ${
                    isMe
                      ? "rounded-tr-sm text-navy"
                      : "rounded-tl-sm text-cream bg-white/8"
                  }`}
                  style={
                    isMe
                      ? {
                          background:
                            "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }
                  }
                >
                  {msg.content}
                </div>
                <p className="text-[10px] text-white/25 font-['Sarabun']">
                  {time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 bg-black/20 flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="พิมพ์ข้อความ..."
          rows={1}
          className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-cream font-['Sarabun'] placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || !roomId}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
          }}
        >
          <Send size={15} className="text-navy" />
        </button>
      </div>
    </div>
  );
}
