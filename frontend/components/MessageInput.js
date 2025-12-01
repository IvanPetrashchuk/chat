import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        placeholder="Напишіть повідомлення..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Надіслати</button>
      <style jsx>{`
        .message-input-form {
          display: flex;
          padding: 10px;
          border-top: 1px solid #eee;
        }
        input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px 0 0 5px;
          outline: none;
        }
        button {
          padding: 10px 15px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 0 5px 5px 0;
          cursor: pointer;
        }
      `}</style>
    </form>
  );
}
