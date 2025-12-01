/**
 * Клас-заглушка для дотримання структури проекту.
 * У мінімальному проекті ми використовуємо прості об'єкти (JSON)
 * та функції-утиліти (`MessageUtils.js`) для створення повідомлень.
 * * Якщо в майбутньому знадобиться складна валідація або методи,
 * цей клас буде їх містити.
 */
export class Message {
  constructor(type, text, username = null, message = null) {
    this.type = type;
    this.timestamp = new Date().toISOString();

    if (type === "message") {
      this.username = username;
      this.text = text;
    } else if (type === "system") {
      this.text = text;
    } else if (type === "error") {
      this.message = message || text;
    }
  }

  toJson() {
    return JSON.stringify(this);
  }
}
