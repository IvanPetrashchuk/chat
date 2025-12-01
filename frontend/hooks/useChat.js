import { useState, useEffect, useRef, useCallback } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

export function useChat() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const send = useCallback((type, payload = {}) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type, ...payload });
      ws.current.send(message);
    } else {
      console.error("WebSocket not connected.");
    }
  }, []);

  const connect = useCallback(
    (user) => {
      setUsername(user);
      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        setIsConnected(true);
        console.log("WS Connected");
        send("join", { username: user });
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        console.log("WS Disconnected");
      };

      ws.current.onerror = (error) => {
        console.error("WS Error:", error);
        setIsConnected(false);
      };
    },
    [send]
  );

  const sendMessage = useCallback(
    (text) => {
      if (text.trim() && username) {
        send("message", { text });
      }
    },
    [username, send]
  );

  return {
    username,
    messages,
    isConnected,
    connect,
    sendMessage,
  };
}
