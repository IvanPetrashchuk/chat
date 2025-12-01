import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { WebSocketService } from "./services/WebSocketService.js";
import { healthCheck } from "./controllers/HealthController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
  })
);
app.use(express.json());

app.get("/health", healthCheck);

const server = http.createServer(app);

new WebSocketService(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.log("\nClosing server...");
  server.close(() => {
    console.log("Server closed. Exiting process.");
    process.exit(0);
  });
});
