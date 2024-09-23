import express from "express";
import { routes } from "./routes/route.js";
// import http from "http";
// import { Server as SocketServer } from "socket.io";

const app = express();
const PORT = 3030;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});
