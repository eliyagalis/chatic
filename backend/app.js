import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import roomRouter from "./routers/roomRouter.js";
import messageRouter from "./routers/messageRouter.js";
import { Server } from "socket.io";
import { dbConnect } from "./utils/mongoConnect.js";

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

io.on("connection", (socket) => {
  socket.on("JoinRoom", (room) => {
    socket.join(room);
  });

  socket.on("JoinRooms", (rooms) => {
    rooms.forEach((room) => {
      socket.join(room);
    });
  });

  socket.on("SendMessage", (room, messageObject) => {
    io.to(room).emit("ReceiveMessage", { room, messageObject });
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/rooms", messageRouter);

dbConnect(server);