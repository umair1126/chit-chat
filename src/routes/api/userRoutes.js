const express = require("express");
const Router = express.Router();
const userController = require("../../controllers/User/userController");
// const { multerUploadS3 } = require("../../utils/s3Helper");

Router.post("/group-conversation", userController.newConversation);
Router.get(
  "/get-conversation/:senderId/:receiverId",
  userController.getConversation
);
Router.get("/get-conversations/:_id", userController.getConversations);
Router.get("/get-group-conversation/:id", userController.getGroupConversation);
Router.get("/get-users/:_id", userController.getUsers);
Router.post("/add-message", userController.addMessage);

module.exports = Router;
