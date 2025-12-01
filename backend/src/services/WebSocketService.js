import { WebSocketServer } from "ws";
import { createMessage, parseClientMessage } from "../utils/MessageUtils.js";

const clients = new Map();

export class WebSocketService {
  constructor(server) {
    this.wss = new WebSocketServer({ server });
    this.wss.on("connection", this.handleConnection.bind(this));
    console.log("WebSocket Server initialized.");
  }

  handleConnection(ws) {
    clients.set(ws, { username: null });

    ws.on("message", (data) => this.handleMessage(ws, data));
    ws.on("close", () => this.handleClose(ws));
    ws.on("error", (err) => console.error("WebSocket Error:", err));
  }

  handleMessage(ws, rawData) {
    const message = parseClientMessage(rawData.toString());
    const clientState = clients.get(ws);

    if (!message) return;

    if (message.type === "join") {
      this.handleJoin(ws, message, clientState);
    } else if (message.type === "message") {
      this.handleChatMessage(ws, message, clientState);
    } else {
      console.warn("Unknown message type:", message.type);
    }
  }

  handleJoin(ws, message, clientState) {
    if (!message.username) {
      this.sendToClient(ws, createMessage("error", "Username is required to join."));
      return;
    }

    const username = message.username.trim();
    if (clientState.username) {
      console.warn(`User ${clientState.username} tried to join again.`);
      return;
    }

    clientState.username = username;
    clients.set(ws, clientState);

    const systemMessage = createMessage("system", `${username} joined the chat`);
    this.broadcast(systemMessage);
    console.log(`User joined: ${username}`);
  }

  handleChatMessage(ws, message, clientState) {
    const username = clientState.username;

    if (!username) {
      this.sendToClient(ws, createMessage("error", "You must join with a username first."));
      return;
    }

    if (!message.text || message.text.trim() === "") return;

    const chatMessage = createMessage("message", message.text, username);
    this.broadcast(chatMessage);
    console.log(`[${username}]: ${message.text}`);
  }

  handleClose(ws) {
    const clientState = clients.get(ws);

    if (clientState && clientState.username) {
      const username = clientState.username;
      clients.delete(ws);
      const systemMessage = createMessage("system", `${username} left the chat`);
      this.broadcast(systemMessage);
      console.log(`User left: ${username}. Total users: ${clients.size}`);
    } else {
      clients.delete(ws);
    }
  }

  sendToClient(ws, message) {
    try {
      ws.send(JSON.stringify(message));
    } catch (e) {
      console.error("Error sending message to client:", e.message);
    }
  }

  broadcast(message) {
    const data = JSON.stringify(message);
    this.wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        this.sendToClient(client, message);
      }
    });
  }
}
