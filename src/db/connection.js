const mongoose = require("mongoose");

// const DB = "mongodb://127.0.0.1:27017/chat-app";
// mongodb+srv://chit-chat:nTCXzetlr4is9rTK@cluster0.d6ksaox.mongodb.net/test

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });
