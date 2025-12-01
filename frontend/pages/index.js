import Head from "next/head";
import { useChat } from "../hooks/useChat";
import UsernameForm from "../components/UsernameForm";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

export default function ChatPage() {
  const { username, messages, isConnected, connect, sendMessage } = useChat();

  const handleJoin = (user) => {
    connect(user);
  };

  return (
    <div>
      <Head>
        <title>Real-Time Chat</title>
      </Head>

      <main>
        <h1>Real-Time Global Chat</h1>

        <div className="status">
          Статус:
          <span className={isConnected ? "connected" : "disconnected"}>
            {isConnected ? " Підключено" : " Відключено"}
          </span>
        </div>

        {!username ? (
          <UsernameForm onSubmit={handleJoin} />
        ) : (
          <div className="chat-interface">
            <p className="current-user">Ви увійшли як: **{username}**</p>
            <ChatWindow messages={messages} />
            <MessageInput onSend={sendMessage} />
          </div>
        )}
      </main>

      <style jsx>{`
        main {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #333;
        }
        .status {
          text-align: center;
          margin-bottom: 20px;
        }
        .connected {
          color: green;
          font-weight: bold;
        }
        .disconnected {
          color: red;
          font-weight: bold;
        }
        .current-user {
          text-align: center;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
