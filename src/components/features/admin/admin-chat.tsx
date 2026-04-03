"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import type { ChatRoom, ChatMessage } from "@/lib/api/chat/chat.type";
import { getChatHistory } from "@/lib/actions/chat.action";
import { getChatSocket, disconnectChatSocket } from "@/lib/socket/chat-socket";
import type { Socket } from "socket.io-client";

type AdminChatProps = {
  rooms: ChatRoom[];
  token: string;
  adminId: string;
};

export default function AdminChat({ rooms, token, adminId }: AdminChatProps) {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = getChatSocket(token);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("receive_message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => disconnectChatSocket();
  }, [token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectRoom = async (room: ChatRoom) => {
    setSelectedRoom(room);
    const history = await getChatHistory(room.id);
    setMessages(history);

    // join room via socket
    if (socketRef.current) {
      socketRef.current.emit("join_chat", { userId: room.userId });
    }
  };

  const handleSend = () => {
    if (!input.trim() || !selectedRoom || !socketRef.current) return;
    socketRef.current.emit("send_message", {
      roomId: selectedRoom.id,
      content: input.trim(),
    });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-4 h-[600px]">
      {/* Room list */}
      <div
        className="w-64 shrink-0 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
          border: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-xs text-white/40 font-['Sarabun']">
            ห้องแชททั้งหมด
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {rooms.length === 0 && (
            <p className="text-xs text-white/20 font-['Sarabun'] text-center py-6">
              ยังไม่มีห้องแชท
            </p>
          )}
          {rooms.map((room) => {
            const isSelected = selectedRoom?.id === room.id;
            const unread = room._count.messages;
            return (
              <button
                key={room.id}
                onClick={() => handleSelectRoom(room)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 border-b border-white/5"
                style={{
                  background: isSelected
                    ? "rgba(201,162,39,0.1)"
                    : "transparent",
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-semibold shrink-0">
                  {room.user.firstName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream font-['Sarabun'] truncate">
                    {room.user.firstName} {room.user.lastName}
                  </p>
                  <p className="text-xs text-white/30 font-['Sarabun'] truncate">
                    {room.messages[0]?.content ?? "ยังไม่มีข้อความ"}
                  </p>
                </div>
                {unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center text-[10px] text-navy font-bold shrink-0">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
          border: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        {!selectedRoom ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/20 font-['Sarabun'] text-sm">
              เลือกห้องแชทเพื่อเริ่มสนทนา
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black/20">
              <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-sm font-semibold text-gold">
                {selectedRoom.user.firstName[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-cream font-['Sarabun']">
                  {selectedRoom.user.firstName} {selectedRoom.user.lastName}
                </p>
                <p className="text-xs text-white/40 font-['Sarabun']">
                  {selectedRoom.user.email}
                </p>
              </div>
              <div
                className={`ml-auto w-2 h-2 rounded-full ${connected ? "bg-green-400" : "bg-white/20"}`}
              />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              {messages.map((msg) => {
                const isAdmin = msg.senderId === adminId;
                const time = new Date(msg.createdAt).toLocaleTimeString(
                  "th-TH",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                );
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${isAdmin ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`flex flex-col gap-1 max-w-[70%] ${isAdmin ? "items-end" : "items-start"}`}
                    >
                      <div
                        className="px-4 py-2.5 rounded-2xl text-sm font-['Sarabun'] leading-relaxed"
                        style={
                          isAdmin
                            ? {
                                background:
                                  "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                                color: "#0b0e2a",
                                borderRadius: "16px 16px 4px 16px",
                              }
                            : {
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                color: "#f5f0e8",
                                borderRadius: "16px 16px 16px 4px",
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
            <div className="px-4 py-3 border-t border-white/10 bg-black/20 flex gap-2">
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
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
                }}
              >
                <Send size={15} className="text-navy" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
