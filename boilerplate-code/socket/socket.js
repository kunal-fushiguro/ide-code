import { io } from "../index.js";

io.on("connection", (socket) => {
  console.log("Connection build ", socket.id);

  socket.on("listen", (data) => {
    console.log("Connection stablished : ", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});
