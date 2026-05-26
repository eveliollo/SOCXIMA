const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

const socketHandler = require("./socket");

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});
socketHandler(io);

app.get("/", (req, res) => {
  res.json({ status: "✅ SOCXIMA ONLINE", version: "1.0.0" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
