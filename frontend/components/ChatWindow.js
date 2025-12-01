import { useRef, useEffect } from "react";

const ChatMessage = ({ msg }) => {
  const date = new Date(msg.timestamp).toLocaleTimeString();

  if (msg.type === "system") {
    return (
      <div className="system-message">
        *** {msg.text} ({date}) ***
        <style jsx>{`
          .system-message {
            text-align: center;
            font-style: italic;
            color: #666;
            margin: 5px 0;
            font-size: 0.9em;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="chat-message">
      <span className="username">{msg.username}:</span>
      <span className="text">{msg.text}</span>
      <span className="timestamp">{date}</span>
      <style jsx>{`
        .chat-message {
          padding: 5px 10px;
          border-bottom: 1px dotted #eee;
        }
        .username {
          font-weight: bold;
          margin-right: 8px;
          color: #0070f3;
        }
        .timestamp {
          float: right;
          color: #999;
          font-size: 0.8em;
        }
        .text {
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default function ChatWindow({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <style jsx>{`
        .chat-window-container {
          border: 1px solid #ccc;
          height: 50vh;
          margin: 10px;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        }
        .messages-list {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px 0;
        }
      `}</style>
    </div>
  );
}
