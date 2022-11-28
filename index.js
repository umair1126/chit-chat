require("dotenv").config();
const express = require("express");
// const serverless = require("serverless-http");
const cors = require("cors");
// const fileUpload = require("express-fileupload");

require("dotenv").config({ path: "src/.env" });

const app = express();
require("./src/db/connection");
// const db = require("./models/index");
const routes = require("./src/routes");

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.use(express.urlencoded({ limit: "25mb", extended: true }));
// app.use(fileUpload());

app.use(express.static("build"));
app.use("/public", express.static("public"));
app.use("/api/v1", routes);
app.get("/api", (req, res) => {
  res?.json({ message: "hosting on vercel!" });
});
// app.use("/.netlify/function/api", routes);

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const { Server } = require("socket.io");

const io = new Server(4003, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user?.userId == userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, c_id }) => {
    const user = getUser(receiverId);
    console.log(user, "user", users, "users", senderId, receiverId, text);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      receiverId,
      text,
      c_id,
    });
  });

  socket.on("sendGroupMessage", ({ senderId, c_id, text }) => {
    // const user = getUser(receiverId);
    // console.log(user, "user", users, "users", senderId, receiverId, text);
    socket.broadcast.emit("getGroupMessage", {
      senderId,
      text,
      c_id,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.get("/", (req, res) => {
  res.send("hi there");
  res.end();
});

// db.sequelize.sync();

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
