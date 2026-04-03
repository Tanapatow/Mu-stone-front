"use server";

import { chatService } from "../api/chat/chat.service";
import type { ChatRoom, ChatMessage } from "../api/chat/chat.type";

export const getAdminRooms = async (): Promise<ChatRoom[]> => {
  try {
    return await chatService.getAdminRooms();
  } catch {
    return [];
  }
};

export const getChatHistory = async (
  roomId: string,
): Promise<ChatMessage[]> => {
  try {
    return await chatService.getChatHistory(roomId);
  } catch {
    return [];
  }
};
