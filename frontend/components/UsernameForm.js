import { useState } from "react";

export default function UsernameForm({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="username-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введіть ваше ім'я"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">Приєднатися до чату</button>
      </form>
      <style jsx>{`
        .username-form-container {
          padding: 20px;
          text-align: center;
        }
        form {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        input,
        button {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
