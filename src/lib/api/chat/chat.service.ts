import { api } from "../client";
import type { ChatMessage, ChatRoom } from "./chat.type";

const getAdminRooms = () => api.get<ChatRoom[]>("chat/admin/rooms");
const getChatHistory = (roomId: string) =>
  api.get<ChatMessage[]>(`chat/admin/rooms/${roomId}/history`);

export const chatService = { getAdminRooms, getChatHistory };
