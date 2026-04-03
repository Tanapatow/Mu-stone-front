import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getChatSocket = (token: string): Socket => {
  if (!socket || !socket.connected) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL!;
    console.log("Connecting to:", url);
    socket = io(`${url}/chat`, {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const disconnectChatSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
