const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    // console.log("userData server ", userData);
    if (userData) {
      const exist = onlineUsers.filter((ou) => ou._id === userData._id);
      if (exist.length === 0) onlineUsers.push(userData);
      io.emit("connected");
    }
  });

  socket.on("someone is connected", () => {
    socket.emit("someone is connected client", onlineUsers);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("get online users", () => {
    io.emit("online users", onlineUsers);
  });

  socket.on("logout", (user) => {
    var index = onlineUsers.findIndex(function (u) {
      return u._id === user._id;
    });
    if (index !== -1) onlineUsers.splice(index, 1);
    io.emit("online users", onlineUsers);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    // check if group chat then just emit to just specific chat
    if (chat.isGroupChat) {
      io.in(chat._id).emit("new message recieved", newMessageRecieved);
    } else {
      io.emit("new message recieved", newMessageRecieved);
    }
  });

  socket.on("readby updated", (updatedChat, whoClicked) => {
    io.in(updatedChat._id).emit("readby updated", updatedChat, whoClicked);
  });

  socket.on("new group chat created", (newGroupChat) => {
    socket.broadcast.emit("new group chat created", newGroupChat);
  });

  socket.on("group chat updated", (updatedGroupChat) => {
    socket.broadcast.emit("group chat updated", updatedGroupChat);
  });

  socket.on("group chat deleted", (chatId) => {
    socket.to(chatId).emit("group chat deleted", chatId);
  });

  socket.on("left the group", (chat) => {
    io.in(chat._id).emit("someone left the group", chat);
  });

  socket.on("changing status", (userId, status) => {
    socket.broadcast.emit("someone changed status", userId, status);
  });

  socket.on("typing", (room, userName, userID) => {
    socket.in(room).emit("typing", userName, userID, room);
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
});
