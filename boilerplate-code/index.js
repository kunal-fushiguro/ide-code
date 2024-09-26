import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import { routes } from "./routes/route.js";
import pty from "node-pty";
import chokidar from "chokidar";

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new SocketServer({ cors: "*" });

io.attach(server);

app.use(cors({ origin: "*" }));
app.use("/", routes);

app.get("/", (_, res) => {
  res.json({
    message: "ok",
  });
});

const ptyProcess = pty.spawn("bash", [], {
  name: "xterm-color",
  cols: 10000,
  rows: 10000,
  cwd: process.env.INIT_CWD + "/user",
  env: process.env,
});

io.on("connection", (socket) => {
  console.log("Connection build ", socket.id);

  socket.on("terminal:input", (data) => {
    ptyProcess.write(data);
  });

  ptyProcess.onData((data) => {
    socket.emit("terminal:output", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

chokidar.watch("./user").on("all", () => {
  io.emit("file:changes", true);
});

server.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});
