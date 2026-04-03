export type ChatMessage = {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
  };
};

export type ChatRoom = {
  id: string;
  userId: string;
  status: "OPEN" | "CLOSED";
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  messages: ChatMessage[];
  _count: {
    messages: number;
  };
};
